import {create} from 'zustand';

import {supabase} from '../index';

export const useAuthStore = create((set) => ({
  isAuth: false,
  dataUserGoogle: [],
  signInWithGoogle: async () => {
    try {
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        throw new Error('A ocurrido un error durante la autentificacion');
      }

      set({isAuth: true});

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  signOut: async () => {
    try {
      const {error} = await supabase.auth.signOut();

      if (error) {
        throw new Error('Ha ocurrido un error durante el cierre de sesión');
      }

      set({isAuth: false}); // Solo se ejecuta si no hay errores
    } catch (error) {
      console.error(error.message);
    }
  },
}));
