import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Arcade Manager
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
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
                </Box>
            </Toolbar>
        </AppBar>
    );
};