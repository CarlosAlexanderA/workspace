import styled from 'styled-components';
import {
  BtnDeslegable,
  BtnFiltro,
  ContentFiltros,
  DataDesplegableTipo,
  Header,
  ListaMenuDesplegable,
  useOperaciones,
  v,
} from '../../index';
import {useState} from 'react';

export default function CategoriasTemplate({data}) {
  const [openLista, setOpenLista] = useState(false);

  const {colorCategoria, tituloBtnDes, bgCategoria, setTipo} = useOperaciones();

  const cambiarTipo = (p) => {
    setTipo(p);
    setStateTipo(!stateTipo);
    setOpenLista(false);
  };

  const cerrarDesplegables = () => {
    setStateTipo(false);
    setOpenLista(false);
  };

  //lista desplegable de las categorias
  const [stateTipo, setStateTipo] = useState(false);

  //* cerrar poara los usuarios y del tipo
  const openTipo = () => {
    setStateTipo(!stateTipo);
    setOpenLista(false);
  };
  const openUser = () => {
    setOpenLista(!openLista);
    setStateTipo(false);
  };

  return (
    <Container onClick={cerrarDesplegables}>
      <header className="header">
        <Header
          stateConfig={{
            state: openLista,
            setState: openUser,
          }}
        />
      </header>
      <section className="tipo">
        <ContentFiltros>
          <div onClick={(e) => e.stopPropagation()}>
            <BtnDeslegable
              textColor={colorCategoria}
              bgColor={bgCategoria}
              text={tituloBtnDes}
              funcion={openTipo}
            />
            {stateTipo && (
              <ListaMenuDesplegable
                data={DataDesplegableTipo}
                top="112%"
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>
      </section>
      <section className="area2">
        <ContentFiltro>
          <BtnFiltro
            bgColor={bgCategoria}
            textColor={colorCategoria}
            icono={<v.agregar />}
          />
        </ContentFiltro>
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
    'tipo' 100px
    'area2' 50px
    'main' auto;

  .header {
    grid-area: header;
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }
  .tipo {
    grid-area: tipo;
    background-color: rgba(123, 122, 141, 0.473);
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    background-color: rgba(55, 50, 128, 0.14);
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
