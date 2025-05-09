import styled from 'styled-components';
import {ColorContent, Icono} from '../../index';

export default function ItemDesplegable({item, funcion}) {
  return (
    <Container onClick={funcion}>
      <Icono>{item.icono}</Icono>
      <ColorContent $ancho="12px" $alto="12px" $color={item.color} />
      <span>{item.text}</span>
    </Container>
  );
}
const Container = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({theme}) => theme.bg4};
  }

  svg {
    font-size: 28px;
    display: block;
  }
`;
