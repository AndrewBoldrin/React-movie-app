import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { MovieCard } from '../home/MovieCard/MovieCard';
import { Box, Typography, Button, Grid } from '@mui/material';
import { UserContext, UserContextType } from '../../context/UserContext/UserContextProvider';
import { theme } from '../../themes/theme';
import { API } from '../../api/config';
import { useGenres } from '../../hooks/useGenres';

const useStyles = () => ({
    header: {
        mt: 6,
        mb: 3,
    },
    pageTitle: {
        fontSize: {
            xs: 35,
            md: 40,
            lg: 45,
        }
    },
    favoritesBox: {
        [theme.breakpoints.down('xs')]: {
            minWidth: '100%'
        },
    },
})

type favoritesMoviesType = {
    [key: string]: favoritesMoviesObjectType;
}

type favoritesMoviesObjectType = {
    title: string,
    genresList: Array<string>,
    posterPath: string,
    score: number,
}

export const Favorites = () => {

    const classes = useStyles();
    const genres = useGenres();
    const [favoritesMovies, setFavoritesMovies] = React.useState<favoritesMoviesType>({}); 
    const [moviesIds, setMoviesIds] = React.useState<Array<string>>([]);
    const db = getDatabase();
    const auth = getAuth();

    const { name, setName, isLogged, setIsLogged } = React.useContext(UserContext) as UserContextType;

    const checkMovieInFavorites = () => {
        auth.onAuthStateChanged((user) => {
            const fav = ref(db, `favorites/${user?.uid}`); 
            let data = null;
            onValue(fav, (value) => {
                data = value.val();
                setFavoritesMovies(data);
                if(data) {
                    const ids = Object.keys(data);
                    setMoviesIds(ids);
                }
            })
        })
    }

    const signInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
        .then((response) => {
            setIsLogged(true);
            setName(response?.user?.displayName);
            checkMovieInFavorites()
        })
        .catch((error) => {
            console.log(error);
        })
    }

    React.useEffect(() => {
        checkMovieInFavorites();
    }, [])

    return (
        <Box>
            <Box sx={ classes.header }>
                <Typography sx={ classes.pageTitle } component='h3' variant='h3'>
                    Seus filmes favoritos
                </Typography>
            </Box>

            {
                isLogged ?
                <Box sx={ classes.favoritesBox }>
                    <Grid container spacing={1}>

                    {
                        moviesIds?.map((value) => {
                            return (
                                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={value}>
                                        <MovieCard
                                            movieId= {Number(value)}
                                            posterPath = {favoritesMovies[value]?.posterPath}
                                            movieTitle={favoritesMovies[value]?.title}
                                            genreIdList={favoritesMovies[value]?.genresList.map(str => { return Number(str) })}
                                            moviesGenres={genres}
                                            voteAverage={favoritesMovies[value]?.score}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box> :

                <Box sx={{ mt: 4 }}>
                    <Typography component='h6' variant='h6'>
                        você precisa estar logado para ver e adicionar os seus filmes favoritos.
                    </Typography>
                    <Button onClick={ () => signInWithGoogle() }>Entre agora</Button>
                </Box>
            }
        </Box>
    )
}