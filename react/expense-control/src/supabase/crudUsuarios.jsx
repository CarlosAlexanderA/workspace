import {ObtenerIdAuthSupabase, supabase} from '../index';

export const InsertarUsuarios = async (p) => {
  try {
    const {data} = await supabase.from('usuarios').insert(p).select();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const MostarUsuarios = async () => {
  try {
    const idAuthSupbase = await ObtenerIdAuthSupabase();
    const {error, data} = await supabase
      .from('usuarios')
      .select()
      .eq('idAuth_supabase', idAuthSupbase);
    if (error) {
      alert('mostar usuarios', error.idAuthSupbase);
    }
    if (data) {
      return data[0];
    }
  } catch (error) {
    console.log(error);
    alert(error.error_description || error.message + 'Mostar usuarios');
  }
};
