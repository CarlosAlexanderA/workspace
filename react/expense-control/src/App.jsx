import styled, {ThemeProvider} from 'styled-components';
import {
  AuthContextProvider,
  Dark,
  Device,
  Light,
  MenuHambur,
  MyRoutes,
  SideBar,
} from './index';
import {createContext, useState} from 'react';
import {useLocation} from 'react-router-dom';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('dark');
  const themeStyle = theme === 'light' ? Light : Dark;

  const {pathname} = useLocation();

  // * sidebar menu estados
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
