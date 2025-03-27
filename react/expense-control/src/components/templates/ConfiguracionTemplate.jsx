import styled from 'styled-components';
import {
  BtnSave,
  Header,
  ListaGenerica,
  ListaPaises,
  Selector,
  TemasData,
  useUsuariosStore,
  v,
} from '../../index';
import {useState} from 'react';

export default function ConfiguracionTemplate() {
  const {dataUsuarios, editarTemaMonedaUser} = useUsuariosStore();

  // ? las opciones del perfil
  const [openLista, setOpenLista] = useState(false);

  const [listaPaises, setListaPaises] = useState(false);
  const [select, setSelect] = useState(false);

  // * pais moneda
  const moneda = select.symbol ? select.symbol : dataUsuarios.moneda;
  const pais = select.countryName ? select.countryName : dataUsuarios.pais;

  const paisSeleccionado = '🐷 ' + moneda + ' ' + pais;

  // * tema
  const [selectTema, setSelectTema] = useState([]);
  const [listaTemas, setListaTemas] = useState(false);

  const iconoBD = dataUsuarios.tema === '0' ? '🌞' : '🌚';
  const temaBD = dataUsuarios.tema === '0' ? 'light' : 'dark';
  const temaInicial = selectTema.tema ? selectTema.tema : temaBD;

  const iconoInicial = selectTema.icono ? selectTema.icono : iconoBD;
  const temaSeleccionado = iconoInicial + ' ' + temaInicial;

  // * funcion de editar el tema, moneda, y pais de usuario
  const editar = async () => {
    const themeElegido = selectTema.descripcion === 'light' ? '0' : '1';
    const p = {
      tema: themeElegido,
      moneda: moneda,
      pais: pais,
      id: dataUsuarios.id,
    };

    console.log(pais, moneda, themeElegido);

    await editarTemaMonedaUser(p);
  };

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{
            state: openLista,
            setState: () => setOpenLista(!openLista),
          }}
        />
      </header>

      <section className="area2">
        <h1>Ajustes</h1>

        <ContentCard>
          <span>Moneda:</span>
          <Selector
            state={listaPaises}
            color={v.colorselector}
            texto1={paisSeleccionado}
            funcion={() => setListaPaises(!listaPaises)}
          />
          {listaPaises && (
            <ListaPaises
              setSelect={(p) => setSelect(p)}
              setState={() => setListaPaises(!listaPaises)}
            />
          )}
        </ContentCard>
        {/* Lista de temas */}
        <ContentCard>
          <span>Tema: </span>
          <Selector
            texto1={temaSeleccionado}
            color={v.colorselector}
            state={listaTemas}
            funcion={() => setListaTemas(!listaTemas)}
          />
          {listaTemas && (
            <ListaGenerica
              data={TemasData}
              setState={() => setListaTemas(!listaTemas)}
              funcion={setSelectTema}
            />
          )}
        </ContentCard>

        <BtnSave
          titulo="Guardar"
          bgColor={v.colorselector}
          icono={<v.iconoguardar />}
          funcion={editar}
        />
      </section>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({theme}) => theme.bgtotal};
  color: ${({theme}) => theme.text};
  display: grid;
  grid-template:
    'header' 100px
    'area2' auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }

  .area2 {
    grid-area: area2;
    /* background-color: rgba(19, 148, 77, 0.14); */
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: start;
    gap: 30px;
    align-self: center;

    h1 {
      font-size: 3rem;
      text-transform: uppercase;
    }
  }
`;

const ContentCard = styled.div`
  display: flex;
  text-align: start;
  align-items: center;
  gap: 20px;
  width: 100%;
  position: relative;
  justify-content: center;
`;

//! tengo un error en actualizar los datos
// * me quede en 6:15:00
