import Swal from 'sweetalert2';
import {supabase} from '../index';

export const InsertarCategorias = async (p) => {
  try {
    const {data, error} = await supabase.from('categorias').insert(p).select();

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya existe un registro con ' + p.descripcion,
        footer: '<a href="">Agregue una nueva descripcion?</a>',
      });
    }

    if (data) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro exitoso',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    return data;
  } catch (error) {
    console.log(error);
    alert(error.error_description || error.message + 'Insertar Categoria');
  }
};

export const MostrarCategorias = async (p) => {
  try {
    const {data} = await supabase
      .from('categorias')
      .select()
      .eq('idUsuario', p.idUsuario)
      .eq('tipo', p.tipo)
      .order('id', {ascending: false});

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const EliminarCategorias = async (p) => {
  try {
    const {error} = await supabase
      .from('categorias')
      .delete()
      .eq('idUsuario', p.idUsuario)
      .eq('id', p.id);

    if (error) {
      alert('Error al eliminar ', error);
    }
  } catch (error) {
    console.log(error);
    alert(error.error_description || error.message + 'Eliminar Categoria');
  }
};

export const EditarCategorias = async (p) => {
  try {
    const {error} = await supabase
      .from('categorias')
      .update(p)
      .eq('idUsuario', p.idUsuario)
      .eq('id', p.id);

    if (error) {
      alert('Error al editar categoria ', error);
    }
  } catch (error) {
    console.log(error);
    alert(error.error_description || error.message + 'Editar Categoria');
  }
};
