import styled from 'styled-components';
import {
  CategoriasTemplate,
  useCategoriasStore,
  useUsuariosStore,
} from '../index';
import {useQuery} from '@tanstack/react-query';

export default function Categorias() {
  const {dataUsuarios} = useUsuariosStore();

  const {dataCategoria, mostrarCategorias} = useCategoriasStore();

  const {isLoading, error} = useQuery({
    queryKey: ['mostrar categorias', dataUsuarios.id],
    queryFn: () => mostrarCategorias({idUsuario: dataUsuarios.id, tipo: 'i'}),
  });

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <Container>
      <CategoriasTemplate data={dataCategoria} />
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
`;
