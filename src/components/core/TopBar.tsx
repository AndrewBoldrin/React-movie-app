import React from 'react';
import { AppBar, Box, IconButton, Typography, Menu, Avatar, Container, Button, Tooltip, MenuItem, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../../helpers/config';
import { LocalMovies } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from 'firebase/auth';
import { firebase } from '../../config/firebase';
import { initializeApp } from 'firebase/app';
import { UserContext, UserContextType } from '../../context/UserContext/UserContextProvider';

const useStyles = () => ({
    logoButton: {
        mr: 2, 
        display: { xs: 'none', md: 'flex' }, 
        color: 'black', 
        fontWeight: 600,
    },
});

export const TopBar = () => {
    const styles = useStyles();
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { name, setName, isLogged, setIsLogged, perfilPhoto, setPerfilPhoto } = React.useContext(UserContext) as UserContextType;

    initializeApp(firebase.firebaseConfig);
    const auth = getAuth();

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

    const Logout = () => {
        signOut(auth);
        setIsLogged(false);
        setName(null);
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setIsLogged(true);
                setPerfilPhoto(user.photoURL);
                setName(user.displayName);
            }
            else setIsLogged(false);
        })
    }, [])

    return (
        <AppBar position="static" style={{ backgroundColor: 'red' }}>
            <Container sx={{ width: '100vw' }} maxWidth="xl">
                <Toolbar disableGutters>
                    <Button onClick={ () => navigate('/') } sx={ styles.logoButton } >
                        <LocalMovies 
                            sx={{ color: 'black', fontSize: '52px' }}
                        />
                    </Button>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={ handleOpenNavMenu }
                            color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={ handleCloseNavMenu }
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {config.pages.map((page) => (
                                <MenuItem key={page.name} onClick={ handleCloseNavMenu }>
                                    <Button onClick={ () => navigate(page.path) } sx={{ color: 'black' }}>
                                        { page.name }
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Button>
                            <LocalMovies 
                                sx={{ color: 'black', fontSize: '52px' }}
                            />
                        </Button>
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {config.pages.map((page) => (
                            <Button
                                key={ page.name }
                                onClick={ () => navigate(page.path) }
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                { page.name }
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {
                            <Box>
                                {
                                    isLogged ?
                                    <Tooltip title={`${name}`}>
                                        <IconButton onClick={ handleOpenUserMenu } sx={{ p: 0 }}>
                                            <Avatar alt={`${name}`} src={`${perfilPhoto}`} />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                        <Button sx={{ color: 'white' }} onClick={ signInWithGoogle }>ENTRAR</Button>
                                }
                            </Box>
                        }
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        {config.userSettings.map((setting) => (
                            <MenuItem key={setting} onClick={ handleCloseUserMenu }>
                                <Button sx={{ color: 'black' }} onClick={ Logout }>
                                    { setting }
                                </Button>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};