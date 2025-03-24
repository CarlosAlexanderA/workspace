import {supabase} from '../index';

export async function ObtenerIdAuthSupabase() {
  const {
    data: {session},
  } = await supabase.auth.getSession();

  if (session != null) {
    const {user} = session;

    //* id con el que se autentico el usuario
    const idAuthSupabase = user.id;

    return idAuthSupabase;
  }
}
