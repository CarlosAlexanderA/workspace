import {createContext, useContext, useEffect, useState} from 'react';
import {InsertarUsuarios, supabase} from '../index';
const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session === null) {
          setUser(null);
        } else {
          setUser(session?.user.user_metadata);

          insertarUsuario(session?.user.user_metadata, session?.user.id);

          console.log('event :', event);
          console.log('session :', session?.user.user_metadata);
        }
      }
    );

    return () => {
      authListener.subscription;
    };
  }, []);

  const insertarUsuario = async (dataProvide, idAuthSupabase) => {
    const p = {
      nombres: dataProvide.name,
      foto: dataProvide.picture,
      idAuth_supabase: idAuthSupabase,
    };
    await InsertarUsuarios(p);
  };

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => useContext(AuthContext);
