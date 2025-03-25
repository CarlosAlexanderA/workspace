import styled, {ThemeProvider} from 'styled-components';
import {
  AuthContextProvider,
  Dark,
  Device,
  Light,
  MenuHambur,
  MyRoutes,
  SideBar,
  useUsuariosStore,
} from './index';
import {createContext, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {useQuery} from '@tanstack/react-query';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('dark');
  const themeStyle = theme === 'light' ? Light : Dark;

  const {pathname} = useLocation();

  // * sidebar menu estados
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // * tanstack query
  const {mostrarUsuarios} = useUsuariosStore();
  const {isLoading, error} = useQuery({
    queryKey: ['mostrar_usuarios'],
    queryFn: () => mostrarUsuarios(),
  });

  if (isLoading) {
    return <h1>Cargando ...</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <ThemeContext.Provider value={{setTheme, theme}}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            {pathname != '/login' ? (
              <Container className={sidebarOpen ? 'active' : ''}>
                <div className="contentSidebar">
                  <SideBar state={sidebarOpen} setState={setSidebarOpen} />
                </div>
                <div className="contentMenuHambur">
                  <MenuHambur />
                </div>
                <ContainerBody>
                  <MyRoutes />
                </ContainerBody>
              </Container>
            ) : (
              <MyRoutes />
            )}
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({theme}) => theme.bgtotal};
  transition: 0.3s ease-in-out;

  .contentSidebar {
    display: none;
  }
  .contentMenuHambur {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;

    &.active {
      grid-template-columns: 220px 1fr;
    }

    .contentSidebar {
      display: initial;
    }
    .contentMenuHambur {
      display: none;
    }
  }
`;
const ContainerBody = styled.div`
  width: 100%;

  @media ${Device.tablet} {
    grid-column: 2;
  }
`;

export default App;
