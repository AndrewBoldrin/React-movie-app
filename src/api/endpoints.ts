import { API } from './config';

export const keyURL = `?api_key=${API.apiKey}`;

export const endpoints = Object.freeze({
    section: {
        popular: `/movie/popular`,
        top_rated: `/movie/top_rated`,
        upcoming: `/movie/upcoming`,
    },
    genre: {   
        genres: `/genre/movie/list`,
    },
    movies: {
        movie: '/movie/',
    }
})