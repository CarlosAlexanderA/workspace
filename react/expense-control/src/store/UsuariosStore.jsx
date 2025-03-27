import {create} from 'zustand';
import {EditarTemaMonedaUser, MostarUsuarios} from '../index';

export const useUsuariosStore = create((set, get) => ({
  dataUsuarios: [],
  mostrarUsuarios: async () => {
    const response = await MostarUsuarios();
    if (!response) throw new Error('No se recibieron datos'); // Validación extra

    set({dataUsuarios: response});
    return response ? response : [];
  },
  editarTemaMonedaUser: async (p) => {
    await EditarTemaMonedaUser(p);

    // * para actualizar automaticamente la pagina
    const {mostrarUsuarios} = get();
    set(mostrarUsuarios);
  },
}));
