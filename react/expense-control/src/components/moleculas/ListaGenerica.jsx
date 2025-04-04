import styled from 'styled-components';
import {BtnCerrar, Device} from '../../index';

export default function ListaGenerica({data, setState, funcion}) {
  const seleccionar = (p) => {
    funcion(p);
    setState();
  };

  return (
    <Container>
      <section className="contentClose">
        <BtnCerrar funcion={setState} />
      </section>
      <section className="contentItems">
        {data.map((item, index) => (
          <ItemContainer key={index} onClick={() => seleccionar(item)}>
            <span>{item.icono}</span>
            <span>{item.descripcion}</span>
          </ItemContainer>
        ))}
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.body};
  color: ${({theme}) => theme.text};
  position: absolute;
  margin-bottom: 15px;
  bottom: 88%;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  z-index: 90;

  @media ${() => Device.tablet} {
    width: 400px;
  }
`;

const ItemContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #303030;
  }
`;
