import styled from 'styled-components';

export const ColorContent = styled.div`
  display: block;
  min-height: ${({$alto}) => $alto};
  width: ${({$ancho}) => $ancho};
  background-color: ${({$color}) => $color};
  justify-content: center;
  border-radius: 50%;
  text-align: center;
`;
