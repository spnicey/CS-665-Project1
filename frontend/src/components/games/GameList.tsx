import { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, CircularProgress, Alert, Typography,
    IconButton, TextField, FormControl, InputLabel, Select, 
    MenuItem, Box, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Game } from '../../types/api';
import { gameService } from '../../services/api';
import { GameForm } from './GameForm';
import { GameEditDialog } from './GameEditDialog';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';

export const GameList = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [deletingGame, setDeletingGame] = useState<Game | null>(null);
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const loadGames = () => {
        setLoading(true);
        gameService.getAll()
            .then(data => {
                setGames(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load games');
                setLoading(false);
            });
    };

    useEffect(() => {
        loadGames();
    }, []);

    const handleAddGame = async (game: Omit<Game, 'gameID'>) => {
        try {
            await gameService.create(game);
            loadGames();
        } catch (err) {
            setError('Failed to create game');
        }
    };

    const handleUpdateGame = async (game: Game) => {
        try {
            await gameService.update(game.gameID, game);
            loadGames();
        } catch (err) {
            setError('Failed to update game');
        }
    };

    const handleDelete = async (game: Game) => {
        try {
            await gameService.delete(game.gameID);
            loadGames();
        } catch (err) {
            setError('Failed to delete game');
        }
    };

    const filteredGames = games.filter(game => {
        const matchesName = game.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesId = idFilter === '' || game.gameID.toString() === idFilter;
        const matchesType = typeFilter === '' || game.type.toLowerCase().includes(typeFilter.toLowerCase());
        return matchesName && matchesId && matchesType;
    });

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>Games</Typography>
            
            <Paper sx={{ p: 2, mb: 2 }}>
                <GameForm onSubmit={handleAddGame} />
            </Paper>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack spacing={2}>
                    <Typography variant="h6">Filters</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Search by Name"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Search by ID"
                            value={idFilter}
                            onChange={(e) => setIdFilter(e.target.value)}
                            size="small"
                            type="number"
                        />
                        <TextField
                            label="Search by Type"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            size="small"
                        />
                    </Box>
                </Stack>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredGames.map(game => (
                            <TableRow key={game.gameID}>
                                <TableCell>{game.gameID}</TableCell>
                                <TableCell>{game.name}</TableCell>
                                <TableCell>{game.type}</TableCell>
                                <TableCell>${game.cost.toFixed(2)}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setEditingGame(game)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => setDeletingGame(game)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredGames.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No games match the current filters
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {editingGame && (
                <GameEditDialog
                    open={true}
                    game={editingGame}
                    onClose={() => setEditingGame(null)}
                    onSave={handleUpdateGame}
                />
            )}

            <DeleteConfirmDialog
                open={!!deletingGame}
                title={`Are you sure you want to delete ${deletingGame?.name}?`}
                onClose={() => setDeletingGame(null)}
                onConfirm={() => {
                    if (deletingGame) {
                        handleDelete(deletingGame);
                        setDeletingGame(null);
                    }
                }}
            />
        </div>
    );
};