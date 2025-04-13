import { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, CircularProgress, Alert, Typography,
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Play, Game } from '../../types/api';
import { playService, gameService } from '../../services/api';

export const HighScoreList = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGameId, setSelectedGameId] = useState<number>(0);
    const [highScores, setHighScores] = useState<Play[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Load available games
        gameService.getAll()
            .then(data => {
                setGames(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load games');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedGameId) {
            setLoading(true);
            playService.getAll()
                .then(plays => {
                    // Filter plays for selected game and sort by score
                    const gameScores = plays
                        .filter(play => play.gameID === selectedGameId)
                        .sort((a, b) => b.score - a.score) // Sort descending
                        .slice(0, 10); // Top 10 scores
                    setHighScores(gameScores);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to load high scores');
                    setLoading(false);
                });
        } else {
            setHighScores([]);
        }
    }, [selectedGameId]);

    if (loading && !selectedGameId) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>High Scores</Typography>
            
            <Paper sx={{ p: 2, mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel>Select Game</InputLabel>
                    <Select
                        value={selectedGameId}
                        label="Select Game"
                        onChange={(e) => setSelectedGameId(Number(e.target.value))}
                    >
                        <MenuItem value={0}>Select a game...</MenuItem>
                        {games.map(game => (
                            <MenuItem key={game.gameID} value={game.gameID}>
                                {game.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Paper>

            {selectedGameId > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Player</TableCell>
                                <TableCell>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {highScores.map((play, index) => (
                                <TableRow key={play.playID}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{play.player?.name}</TableCell>
                                    <TableCell>{play.score}</TableCell>
                                </TableRow>
                            ))}
                            {highScores.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No scores recorded for this game
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};