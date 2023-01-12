import React, { useEffect, useState } from 'react';
import { CardMedia, Box, Typography, IconButton, Tooltip, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { API } from '../../../api/config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, onValue, ref, set, update, remove } from 'firebase/database';
import { UserContext, UserContextType } from '../../../context/UserContext/UserContextProvider';
import { genresFilterIdToText } from '../../../helpers/functions/genresFilterIdToText';
import { useNavigate } from 'react-router-dom';
import { ScoreStar } from '../../../components/core/ScoreStar';

const useStyles = () => ({
    root: {
        p: 2,
        minWidth: 100,
        minHeight: 400,
        maxWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&: hover': {
            boxShadow: 5,
            transition: 'transform 0.15s ease-in-out',
            transform: 'scale3d(1.05, 1.05, 1)',
        },
    },
    movieButton: {
        position: 'absolute',
        inset: 0,
    },
    scoreRoot: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        top: 0,
        left: 0,
    },
    scoreStar: {
        position: 'absolute',
        top: '-2rem',
    },
    favoritesIconButton: {
        zIndex: 1,
        position: 'absolute',
        p: 0,
        bottom: '-0.9rem',
        color: 'yellow',
    },
    favoritesIcon: {
        '&: hover' : {
            fontSize: '2rem',
        }
    },
    movieTitle: {
        width: '100%',
        mt: 3,
        fontWeight: 600,
    },
    genresText: {
        mt: 1,

    },
});

type MovieCardType = {
    movieId: number,
    posterPath: string,
    movieTitle: string,
    genreIdList: Array<Number>,
    voteAverage: number,
    moviesGenres: any,
}


export const MovieCard = (props: MovieCardType) => {
    
    const { name, setName, isLogged, setIsLogged } = React.useContext(UserContext) as UserContextType;
    
    const styles = useStyles();
    const imgWidth = 342;
    const [genresText, setGenresText] = useState<string>('');
    
    const [isInFavorites, setIsInFavorites] = React.useState<boolean>(false);
    
    const db = getDatabase();
    const auth = getAuth();
    const navigate = useNavigate();

    const newFavoritesData = {
        title: props.movieTitle,
        genresList: props.genreIdList,
        posterPath: props.posterPath,
        score: props.voteAverage,
    }

    const signInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
        .then((response) => {
            setIsLogged(true);
            setName(response?.user?.displayName);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const addToFavorites = () => {
        const userId = auth.currentUser?.uid;
    
        update(ref(db, 'favorites/' + userId + '/' + props.movieId), newFavoritesData)
        .then(() => {
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    const removeFromFavorites = () => {
        const userId = auth.currentUser?.uid;

        remove(ref(db, 'favorites/' + userId + '/' + props.movieId))
        .then(() => {
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleFavoritesClick = () => {
        if(isLogged) {
            if(isInFavorites) {
                removeFromFavorites();
                setIsInFavorites(false);
            } 
            else {
                addToFavorites();
                setIsInFavorites(true);
            }                 
        } 
        else
            signInWithGoogle();
    }

    const checkMovieInFavorites =  () => {
        const userId = auth.currentUser?.uid;
        const path = `favorites/${userId}/${props.movieId}`
        const fav = ref(db, path ); 

        onValue(fav, (value) => {
            setIsInFavorites(value.exists());
        })
    }

    const getGenresText = () => {
        const text = genresFilterIdToText(props.moviesGenres, props.genreIdList);
        setGenresText(text);    
    }
    
    useEffect(() => {
        checkMovieInFavorites();
    }, [isLogged]);
    
    useEffect(() => {
        getGenresText();
    }, [props.moviesGenres]);

    return (
        
        <Box sx={styles.root}>
            <Box component='div' sx={ styles.scoreRoot }>
                <Box sx={ styles.scoreStar }>
                    <ScoreStar
                        size={30}
                        scoreNumber={props.voteAverage}
                    />
                </Box>
                <Tooltip title={isInFavorites ? 'Remover dos favoritos' : 'Adicione aos favoritos'}>
                    <IconButton sx={ styles.favoritesIconButton } onClick= { handleFavoritesClick }>
                        {isInFavorites && isLogged ? 
                        <StarIcon sx={ styles.favoritesIcon }></StarIcon>:
                        <StarBorderIcon sx={ styles.favoritesIcon }></StarBorderIcon>}
                    </IconButton>
                </Tooltip>

                <CardMedia 
                    component='img' 
                    image={`${API.baseImageURL}${imgWidth}${props.posterPath}`} 
                    alt='img' 
                    />
            </Box>

            <Typography 
                component='div' 
                variant='subtitle1' 
                sx={ styles.movieTitle } 
                >
                {props.movieTitle}
            </Typography>

            <Typography 
                component='div' 
                variant='subtitle2' 
                sx={ styles.genresText }
                >
                    {genresText}
            </Typography>
            <Button sx={ styles.movieButton } onClick={ () => navigate(`/movie/${props.movieId}`) }> </Button>
        </Box>
    )
}