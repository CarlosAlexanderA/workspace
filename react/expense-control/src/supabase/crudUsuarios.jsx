import Swal from 'sweetalert2';
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
    // if (error) {
    //   alert('mostar usuarios', error.idAuthSupbase);
    // }
    if (data) {
      return data[0];
    }
  } catch (error) {
    console.log(error);
    // alert(error.error_description || error.message + 'Mostar usuarios');
  }
};

export const EditarTemaMonedaUser = async (p) => {
  try {
    const {error} = await supabase.from('usuarios').update(p).eq('id', p.id);

    if (error) {
      alert('EditarTema usuarios', error);
    }

    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Datos modificados',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.log(error);
    alert(error.error_description || error.message + 'EditarTema usuarios');
  }
};
