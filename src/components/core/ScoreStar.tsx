import { Box, Tooltip, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { calculateScoreColor } from '../../helpers/functions/calculateScoreColor';

const useStyles = () => ({
    root: {
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: '2.5em',
    },
    score: {
        position: 'absolute',
        lineHeight: 1,
        color: 'black',
        fontSize: '0.5em',
    }
});

type scoreStarType = {
    size: number
    scoreNumber: number
}

export const ScoreStar = (props: scoreStarType) => {

    const styles = useStyles();

    return (
        <Box sx={ styles.root } style={{ fontSize: props.size}}>
            <Tooltip title="pontuação do filme">
                <StarIcon sx={ styles.icon } style={{ color: calculateScoreColor(props.scoreNumber) }}/>
            </Tooltip>
            <Typography component='span' sx={ styles.score }>{ props.scoreNumber.toFixed(1) }</Typography>
        </Box>
    )
}