import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Arcade Manager
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/players">
                        Players
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/games">
                        Games
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/plays">
                        Plays
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/employees">
                        Employees
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/highscores">
                        High Scores
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};