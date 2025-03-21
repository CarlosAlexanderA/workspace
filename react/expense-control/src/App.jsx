import {ThemeProvider} from 'styled-components';
import {Dark, Light, MyRoutes} from './index';
import {createContext, useState} from 'react';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');
  const themeStyle = theme === 'light' ? Light : Dark;

  return (
    <>
      <ThemeContext.Provider value={{setTheme, theme}}>
        <ThemeProvider theme={themeStyle}>
          <MyRoutes />
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
