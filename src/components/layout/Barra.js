import React from 'react';

const Barra = ({Nombre,CerrarSesion}) => {
    return ( 
        <header className='app-header'> 
            <p className='nombre-usuario'>Hola <span>{Nombre}</span></p>
            <nav className='nav-principal'>
                <button className=' cerrar-sesion' onClick={()=> CerrarSesion()}>Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;