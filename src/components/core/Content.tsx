import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const useStyles = () => ({
    root: {
        maxWidth: '85rem',
        margin: '0 auto',
        minHeight: '100vh'
    }
});

export const Content = () => {

    const styles = useStyles();

    return (
        <Box sx={ styles.root }>
            <Outlet />
        </Box>
    )
}