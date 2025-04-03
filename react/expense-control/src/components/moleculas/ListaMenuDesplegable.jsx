import styled from 'styled-components';
import {ItemDesplegable, v} from '../../index';

export default function ListaMenuDesplegable({data, top, funcion}) {
  return (
    <Container top={top}>
      {data.map((item, index) => (
        <ItemDesplegable
          key={index}
          item={item}
          funcion={() => funcion(item)}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${({theme}) => theme.bg3};
  border-radius: 22px;
  top: ${({top}) => top};
  box-shadow: ${() => v.boxshadowGray};
`;
