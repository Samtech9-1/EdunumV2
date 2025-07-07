import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URL } from '../utils/constants';

// Fonction pour obtenir l'adresse IP
const fetchUserIP = async (): Promise<string | null> => {
    try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'adresse IP :", error);
        return null;
    }
};

// Création de l'instance Axios
const Axios: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
});

// Ajout d'un intercepteur pour inclure l'adresse IP
Axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const userIP = await fetchUserIP();
    if (userIP && config.headers) {
        config.headers['X-Forwarded-For'] = userIP;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default Axios;