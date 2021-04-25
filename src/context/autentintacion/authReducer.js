import { REGISTRO_EXITOSO } from "../../types";


export default (state,action) =>{
    switch(action.type){
        case REGISTRO_EXITOSO:
            return{

            }
        
        default:
            return state;
    }
}