import axios from 'axios';

export const  CancelToken = axios.CancelToken;
export const  source = CancelToken.source();

export const OMDB_instance = axios.create({
    baseURL: 'http://www.omdbapi.com/',
    params: {
        apikey: "4ae0febc",
        type: "movie"        
    }
});