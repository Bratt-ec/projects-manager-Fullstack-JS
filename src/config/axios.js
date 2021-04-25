import axios  from "axios";
const { REACT_APP_BACKEND_URL } = process.env;

const cliAxios = axios.create({
    baseURL: REACT_APP_BACKEND_URL,    
})

export default cliAxios;