import { useEffect, useState } from 'react';
import { getGenres } from '../api/Genres/genres';

export const useGenres = () => {
    const [genres, setGenres] = useState([]);

    const getMovieGenres = async () => {
        const data = await getGenres();        
        setGenres(data);
    }

    useEffect(() => {
        getMovieGenres();
    }, []);

    return genres;
}