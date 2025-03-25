import {create} from 'zustand';
import {MostarUsuarios} from '../index';

export const useUsuariosStore = create((set, get) => ({
  dataUsuarios: [],
  mostrarUsuarios: async () => {
    const response = await MostarUsuarios();
    if (!response) throw new Error('No se recibieron datos'); // Validación extra

    set({dataUsuarios: response});
    return response;
  },
}));
