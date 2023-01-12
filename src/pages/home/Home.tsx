import React from 'react';
import { Box } from '@mui/material';
import { Sections } from '../../api/Sections/section';
import { MovieSection } from '../../pages/home/MovieSection/MovieSection';
import { useGenres } from '../../hooks/useGenres';

export const Home = () => {

    const genres = useGenres();

    return (
        <Box>
            {Sections.map((section, index) => {
                return (
                    <MovieSection
                        key={index}
                        name={section.name}
                        endpoint={section.path}
                        moviesGenres={genres}
                    />
                )
            })}
        </Box>
    )
}