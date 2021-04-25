import cliAxios from "./axios";

 const AuthToken = token =>{
    if(token){
        cliAxios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete cliAxios.defaults.headers.common['x-auth-token'];
    }
}

export default AuthToken; 