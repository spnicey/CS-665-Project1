import { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, CircularProgress, Alert, Typography,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Player } from '../../types/api';
import { playerService } from '../../services/api';
import { PlayerForm } from './PlayerForm';
import { PlayerEditDialog } from './PlayerEditDialog';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';

export const PlayerList = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
    const [deletingPlayer, setDeletingPlayer] = useState<Player | null>(null);

    const loadPlayers = () => {
        setLoading(true);
        playerService.getAll()
            .then(data => {
                setPlayers(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load players');
                setLoading(false);
            });
    };

    useEffect(() => {
        loadPlayers();
    }, []);

    const handleAddPlayer = async (player: Omit<Player, 'playerID'>) => {
        try {
            await playerService.create(player);
            loadPlayers();
        } catch (err) {
            setError('Failed to create player');
        }
    };

    const handleUpdatePlayer = async (player: Player) => {
        try {
            await playerService.update(player.playerID, player);
            loadPlayers();
        } catch (err) {
            setError('Failed to update player');
        }
    };

    const handleDelete = async (player: Player) => {
        try {
            await playerService.delete(player.playerID);
            loadPlayers();
        } catch (err) {
            setError('Failed to delete player');
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>Players</Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
                <PlayerForm onSubmit={handleAddPlayer} />
            </Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Membership</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map(player => (
                            <TableRow key={player.playerID}>
                                <TableCell>{player.playerID}</TableCell>
                                <TableCell>{player.name}</TableCell>
                                <TableCell>{player.membership}</TableCell>
                                <TableCell>${player.balance.toFixed(2)}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setEditingPlayer(player)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => setDeletingPlayer(player)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {editingPlayer && (
                <PlayerEditDialog
                    open={true}
                    player={editingPlayer}
                    onClose={() => setEditingPlayer(null)}
                    onSave={handleUpdatePlayer}
                />
            )}

            <DeleteConfirmDialog
                open={!!deletingPlayer}
                title={`Are you sure you want to delete ${deletingPlayer?.name}?`}
                onClose={() => setDeletingPlayer(null)}
                onConfirm={() => {
                    if (deletingPlayer) {
                        handleDelete(deletingPlayer);
                        setDeletingPlayer(null);
                    }
                }}
            />
        </div>
    );
};