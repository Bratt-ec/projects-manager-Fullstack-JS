import React, {Fragment, useContext, useState} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {
    // Obtener el state del formuario
    const { formulario, errorformulario ,mostrarFormulario,agregarProyecto, mostrarError } = useContext(ProyectoContext);

    // State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: '',
    });
    // Extraer nombre de proyecto
    const {nombre} = proyecto;
    // Lee el contenido del input
    const onChangeProyecto = (e)=>{
        guardarProyecto({
            ...proyecto,
            [e.target.name] :  e.target.value
        })
    }
    // Cuando el usuario envia un proyecto
    const onSubmitProyecto = (e) =>{
        e.preventDefault();

        // Validar Proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }
        // Agregar al state
        agregarProyecto(proyecto);

        // Reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    return ( 
        <Fragment>
        <button
            type='button'
            className='btn btn-block btn-primario'
            onClick={()=> mostrarFormulario()}
        >
            Nuevo Proyecto
        </button>
        {
            formulario 
            ? (
                <form
                className='formulario-nuevo-proyecto'
                onSubmit={onSubmitProyecto}
                >   
                <input 
                    type='text'
                    className='input-text'
                    placeholder='Nombre Proyecto'
                    name='nombre'
                    value={nombre}
                    onChange={onChangeProyecto}
                />
                <input 
                    type='submit'
                    className='btn btn-primario btn-block'
                    value='Agregar Proyecto'
                />
            </form>
            )
            : null
        }

        {errorformulario ? <p className='mensaje error'>El nombre del proyecto es obligatorio</p>  : null}
        
        </Fragment>

     );
}
 
export default NuevoProyecto;