import styled from 'styled-components';
import {
  BtnCircular,
  ListaMenuDesplegable,
  UserAuth,
  v,
  DesplegableUser,
  useAuthStore,
} from '../../index';

export default function DataUser({stateConfig}) {
  const {user} = UserAuth();
  const {signOut} = useAuthStore();

  const funcionXTipo = async (tipo) => {
    if (tipo === 'cerrarsesion') {
      await signOut();
    }
  };

  return (
    <Container onClick={stateConfig.setState}>
      <div className="imgContainer">
        <img src={user.picture} />
      </div>
      <BtnCircular
        icono={<v.iconocorona />}
        width="25px"
        height="25px"
        bgColor="#fff"
        textColor="#181818"
        fontSize="11px"
        translateX="-50px"
        translateY="-12px"
      />
      <span className="nombre">{user.name}</span>
      {stateConfig.state && (
        <ListaMenuDesplegable
          data={DesplegableUser}
          top="60px"
          funcion={(p) => funcionXTipo(p)}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50px;
  margin: 15px;
  cursor: pointer;

  .imgContainer {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;

    border-radius: 50%;
    overflow: hidden;
    margin-right: 22px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .nombre {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  &:hover {
    background-color: ${({theme}) => theme.bg3};
  }
`;
