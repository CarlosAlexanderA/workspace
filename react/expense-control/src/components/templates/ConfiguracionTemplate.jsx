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
  const {dataUsuarios} = useUsuariosStore();

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
      <section className="area1">
        <h1>Ajustes</h1>
      </section>
      <section className="area2">
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
        />
      </section>
      <section className="main"></section>
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
    'area1' 100px
    'area2' 50px
    'main' auto;

  .header {
    grid-area: header;
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    background-color: rgba(123, 122, 141, 0.473);
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    background-color: rgba(19, 148, 77, 0.14);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: start;
    gap: 30px;
  }
  .main {
    grid-area: main;
    background-color: rgba(179, 46, 241, 0.14);
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
