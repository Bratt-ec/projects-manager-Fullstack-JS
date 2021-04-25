import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/autentintacion/authContext';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTareas from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';

const Proyectos = () => {
    // Extraer la información de sesion
    const { usuario,usuarioAutenticado, cerrarSesion } = useContext(AuthContext);

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return ( 
    <div className='contenedor-app'>        
        <Sidebar />
        <div className='seccion-principal'>
            <Barra Nombre={usuario ? usuario.nombre : '...'}  CerrarSesion={cerrarSesion} />
            <main>
                <FormTareas />
                <div className='contenedor-tareas'>
                    <ListadoTareas />
                </div>
            </main>
        </div>
    </div>
        );
}
 
export default Proyectos;