import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/Movies/movie";
import { API } from '../../api/config';
import { ScoreStar } from '../../components/core/ScoreStar';

const useStyles = () => ({
    movieInfoBox: {
        boxShadow: 2,
    },
    scoreStarBox: {
        position: 'absolute',
        width: '100%',
        bottom: '-2rem',
    },
    title: {
        typography: { lg: "h4", sm: "h4" },
        pt: 4,
    },
    overview: {
        maxWidth: '100%', 
        textIndent: '2rem',
        p: 5,
        textAlign: 'justify',
        lineHeight: 1.7,
    }
})

export const Movie = () => {

    const [movie, setMovie] = useState<any>(null);
    const getParam = useParams();

    const styles = useStyles();

    const getMovieInfo = async () => {
        const data = await getMovie(getParam.id!);
        setMovie(data);
    }

    useEffect(() => {
        getMovieInfo();
    }, [])

    return (
        <Box sx={{ width: '100%'}}>
            {movie ?
            <Grid container sx={ styles.movieInfoBox }>
                <Grid item lg={3} sm={4} xs={12} sx={{ position: 'relative' }}>
                    <Avatar
                        variant='square'
                        sx={{
                            width: '100%',
                            height: '100%'
                        }}
                        src={`${API.baseImageURL}300${movie.poster_path}`}
                    >
                    </Avatar>

                    <Box sx={ styles.scoreStarBox }>
                        <ScoreStar 
                            scoreNumber={ movie.vote_average } 
                            size={30}
                        />
                    </Box>
                </Grid>
                <Grid item lg={9} sm={8}>
                    <Typography sx={ styles.title } component="h2">{movie.title}</Typography>
                    <Typography variant="subtitle2" component="h4">Original title: {movie.original_title}</Typography>
                    <Typography variant="body1" component="p" sx={ styles.overview }>{movie.overview}</Typography>
                    <Typography variant="body2" component="h4">
                        {movie.genres.map((genre: any, index: number) => {
                            return genre.name + ', ';
                        })}
                    </Typography>
                    <Typography variant="caption" component="h5">{movie.status}: {movie.release_date}</Typography>
                </Grid>
            </Grid>
            :
            <Box>sem dados do filme</Box> 
            }
        </Box>
    );
}