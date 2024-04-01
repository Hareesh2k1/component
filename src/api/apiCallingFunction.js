import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products',error);
        return [];
        
    }
}