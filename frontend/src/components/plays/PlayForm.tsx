import { useState, useEffect } from 'react';
import { 
    TextField, 
    Button, 
    Box, 
    MenuItem, 
    FormControl,
    InputLabel,
    Select
} from '@mui/material';
import { Play, Player, Game } from '../../types/api';
import { playerService, gameService } from '../../services/api';

interface PlayFormProps {
    initialValues?: Play;
    onSubmit: (play: Omit<Play, 'playID'>) => void;
}

export const PlayForm = ({ initialValues, onSubmit }: PlayFormProps) => {
    const [playerID, setPlayerID] = useState(initialValues?.playerID ?? 0);
    const [gameID, setGameID] = useState(initialValues?.gameID ?? 0);
    const [score, setScore] = useState(initialValues?.score?.toString() ?? '0');
    const [players, setPlayers] = useState<Player[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        // Load players and games for dropdowns
        playerService.getAll().then(setPlayers);
        gameService.getAll().then(setGames);
    }, []);

    useEffect(() => {
        if (initialValues) {
            setPlayerID(initialValues.playerID);
            setGameID(initialValues.gameID);
            setScore(initialValues.score.toString());
        }
    }, [initialValues]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting play:', {
            playerID,
            gameID,
            score: parseInt(score)
        });
        onSubmit({
            playerID,
            gameID,
            score: parseInt(score)
        });

        if (!initialValues) {
            setPlayerID(0);
            setGameID(0);
            setScore('0');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Player</InputLabel>
                <Select
                    value={playerID}
                    label="Player"
                    onChange={(e) => setPlayerID(Number(e.target.value))}
                    required
                >
                    {players.map(player => (
                        <MenuItem key={player.playerID} value={player.playerID}>
                            {player.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Game</InputLabel>
                <Select
                    value={gameID}
                    label="Game"
                    onChange={(e) => setGameID(Number(e.target.value))}
                    required
                >
                    {games.map(game => (
                        <MenuItem key={game.gameID} value={game.gameID}>
                            {game.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Score"
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                required
            />

            <Button type="submit" variant="contained">
                {initialValues ? 'Update Play' : 'Add Play'}
            </Button>
        </Box>
    );
};