import { useState, useEffect } from 'react';
import { MovieObject } from '../../../api/interfaces';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import { MovieCard } from '../MovieCard/MovieCard';
import { getSection } from '../../../api/Sections/section';

const useStyles = () => ({
    title: {
        display: 'block',
        fontSize: {
            xs: 35,
            md: 40,
            lg: 45,
        },
        pb: 3,
    },
});

type MovieSectionType = {
    name: string,
    endpoint: string,
    moviesGenres: any,
}

export const MovieSection = (props: MovieSectionType) => {

    const styles = useStyles();

    type MovieType = Array<MovieObject>;

    const [movies, setMovies] = useState<MovieType>([]);
    const [page, setPage] = useState<number>(1);

    const updateMovies = (data: any) => {
        setMovies(data);
    }

    const getMovies = async () => {
        const movies = await getSection(page, props.endpoint);
        updateMovies(movies);
    }

    useEffect(() => {
        getMovies();
    }, [page]);

    return (
        <Box sx={{ mt: 6 }}>
            <Typography component='h2' variant='h2' sx={ styles.title } >
                {props.name}
            </Typography>

            <Box>
                <Grid container spacing={1}>
                    {movies?.map((movie, index) => {
                        return (
                            <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
                                <MovieCard
                                    movieId= {movie.id}
                                    posterPath = {movie.poster_path}
                                    movieTitle={movie.original_title}
                                    genreIdList={movie.genre_ids}
                                    voteAverage={movie.vote_average}
                                    moviesGenres={props.moviesGenres}
                                    />
                            </Grid>
                            )
                        })}
                </Grid>
            </Box>
        </Box>
    )
}