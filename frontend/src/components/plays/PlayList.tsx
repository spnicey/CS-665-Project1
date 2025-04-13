import { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, CircularProgress, Alert, Typography,
    IconButton, TextField, FormControl, InputLabel, Select, 
    MenuItem, Box, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Play, Player, Game } from '../../types/api';
import { playService, playerService, gameService } from '../../services/api';
import { PlayForm } from './PlayForm';
import { PlayEditDialog } from './PlayEditDialog';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';

export const PlayList = () => {
    const [plays, setPlays] = useState<Play[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingPlay, setEditingPlay] = useState<Play | null>(null);
    const [deletingPlay, setDeletingPlay] = useState<Play | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [playerFilter, setPlayerFilter] = useState('');
    const [gameFilter, setGameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');

    const loadPlays = () => {
        setLoading(true);
        playService.getAll()
            .then(data => {
                setPlays(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load plays');
                setLoading(false);
            });
    };

    useEffect(() => {
        loadPlays();
    }, []);

    useEffect(() => {
        playerService.getAll().then(setPlayers);
        gameService.getAll().then(setGames);
    }, []);

    const handleAddPlay = async (play: Omit<Play, 'playID'>) => {
        try {
            await playService.create(play);
            loadPlays();
        } catch (err: any) {
            console.error('Error creating play:', err);
            setError(err.response?.data?.error || 'Failed to create play');
        }
    };

    const handleUpdatePlay = async (play: Play) => {
        try {
            await playService.update(play.playID, play);
            loadPlays();
        } catch (err) {
            setError('Failed to update play');
        }
    };

    const handleDelete = async (play: Play) => {
        try {
            await playService.delete(play.playID);
            loadPlays();
        } catch (err) {
            setError('Failed to delete play');
        }
    };

    const filteredPlays = plays.filter(play => {
        const matchesPlayer = !playerFilter || play.playerID.toString() === playerFilter;
        const matchesGame = !gameFilter || play.gameID.toString() === gameFilter;
        const matchesId = !idFilter || play.playID.toString() === idFilter;
        return matchesPlayer && matchesGame && matchesId;
    });

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>Plays</Typography>
            
            <Paper sx={{ p: 2, mb: 2 }}>
                <PlayForm onSubmit={handleAddPlay} />
            </Paper>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack spacing={2}>
                    <Typography variant="h6">Filters</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl sx={{ minWidth: 200 }} size="small">
                            <InputLabel>Filter by Player</InputLabel>
                            <Select
                                value={playerFilter}
                                label="Filter by Player"
                                onChange={(e) => setPlayerFilter(e.target.value)}
                            >
                                <MenuItem value="">All Players</MenuItem>
                                {players.map(player => (
                                    <MenuItem key={player.playerID} value={player.playerID.toString()}>
                                        {player.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 200 }} size="small">
                            <InputLabel>Filter by Game</InputLabel>
                            <Select
                                value={gameFilter}
                                label="Filter by Game"
                                onChange={(e) => setGameFilter(e.target.value)}
                            >
                                <MenuItem value="">All Games</MenuItem>
                                {games.map(game => (
                                    <MenuItem key={game.gameID} value={game.gameID.toString()}>
                                        {game.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Search by ID"
                            value={idFilter}
                            onChange={(e) => setIdFilter(e.target.value)}
                            size="small"
                            type="number"
                        />
                    </Box>
                </Stack>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Play ID</TableCell>
                            <TableCell>Player Name</TableCell>
                            <TableCell>Game Name</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPlays.map(play => (
                            <TableRow key={play.playID}>
                                <TableCell>{play.playID}</TableCell>
                                <TableCell>{play.player?.name}</TableCell>
                                <TableCell>{play.game?.name}</TableCell>
                                <TableCell>{play.score}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setEditingPlay(play)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => setDeletingPlay(play)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredPlays.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No plays match the current filters
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {editingPlay && (
                <PlayEditDialog
                    open={true}
                    play={editingPlay}
                    onClose={() => setEditingPlay(null)}
                    onSave={handleUpdatePlay}
                />
            )}

            <DeleteConfirmDialog
                open={!!deletingPlay}
                title={`Are you sure you want to delete this play record?`}
                onClose={() => setDeletingPlay(null)}
                onConfirm={() => {
                    if (deletingPlay) {
                        handleDelete(deletingPlay);
                        setDeletingPlay(null);
                    }
                }}
            />
        </div>
    );
};