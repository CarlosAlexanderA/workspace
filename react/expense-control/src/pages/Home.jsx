import React from 'react';
import styled from 'styled-components';
import {useAuthStore, UserAuth} from '../index';
function Home() {
  const {signOut} = useAuthStore();
  const {user} = UserAuth();
  return (
    <Container>
      <h1>Bienvenido {user.name}</h1>
      <img src={user.avatar_url} />
      <button onClick={signOut}>Cerrar</button>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
`;

export default Home;
