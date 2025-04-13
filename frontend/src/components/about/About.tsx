import { Paper, Typography, Box } from '@mui/material';

export const About = () => {
    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>CS 665 Project1</Typography>
            
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Arcade database management app.</Typography>
                    
                    <Typography>
                        This application allows the user to manage information about players, games, and gameplay records.
                        It allows the user to perform CRUD operations on each table, as well as join operations to get high scores.
                    </Typography>

                    <Typography variant="h6">Membership Levels</Typography>
                    <Typography>
                        Users can have different membership levels, which affect the pricing of games:<br/>
                        • Basic (Level 0): Standard pricing for all games<br/>
                        • Premium (Level 1): 50% discount on all games<br/>
                        • VIP (Level 2): 50% discount on all games and free access to classic games
                    </Typography>

                    <Typography variant="h6">Adding a play</Typography>
                    <Typography component="div">
                        The Plays table stores information about a user playing a game, including the
                        player and game IDs and the score. When a play is added, the cost of the game is 
                        subtracted from the player's balance according to their membership level.
                        <br/>
                    </Typography>

                    <Typography variant="h6">How to Use</Typography>
                    <Typography>
                        1. Add players with their initial balance and membership level<br/>
                        2. Add games with their type and cost<br/>
                        3. Record plays when players play the games*<br/>
                        4. Check high scores to see the best performances<br/>
                        5. Manage employee information as needed<br/>
                        6. Use the filters to search for specific players, games, or plays<br/>
                            (*in an actual version of the application, plays would be added automatically when a player plays a game.)
                    </Typography>
                </Box>
            </Paper>
        </div>
    );
};