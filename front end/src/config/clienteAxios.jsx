import axios from 'axios'

//resumir la peticion con axios 
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACK}/api`
});

export default clienteAxios;