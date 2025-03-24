import styled from 'styled-components';
import {ConfiguracionTemplate} from '../index';
export default function Configuracion() {
  return (
    <Container>
      <ConfiguracionTemplate />
    </Container>
  );
}
const Container = styled.main`
  height: 100vh;
`;
