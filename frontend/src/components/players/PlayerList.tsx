import { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, CircularProgress, Alert, Typography,
    IconButton, TextField, FormControl, InputLabel, Select, 
    MenuItem, Box, Stack
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
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [membershipFilter, setMembershipFilter] = useState<string>('');

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

    const getMembershipLabel = (membershipLevel: number): string => {
        switch (membershipLevel) {
            case 0:
                return 'Basic';
            case 1:
                return 'Premium';
            case 2:
                return 'VIP';
            default:
                return 'Unknown';
        }
    };

    const filteredPlayers = players.filter(player => {
        const matchesName = player.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesId = idFilter === '' || player.playerID.toString() === idFilter;
        const matchesMembership = membershipFilter === '' || player.membership.toString() === membershipFilter;
        return matchesName && matchesId && matchesMembership;
    });

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>Players</Typography>
            
            <Paper sx={{ p: 2, mb: 2 }}>
                <PlayerForm onSubmit={handleAddPlayer} />
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
                        <FormControl sx={{ minWidth: 200 }} size="small">
                            <InputLabel>Membership Level</InputLabel>
                            <Select
                                value={membershipFilter}
                                label="Membership Level"
                                onChange={(e) => setMembershipFilter(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="0">Basic</MenuItem>
                                <MenuItem value="1">Premium</MenuItem>
                                <MenuItem value="2">VIP</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
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
                        {filteredPlayers.map(player => (
                            <TableRow key={player.playerID}>
                                <TableCell>{player.playerID}</TableCell>
                                <TableCell>{player.name}</TableCell>
                                <TableCell>{getMembershipLabel(player.membership)}</TableCell>
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
                        {filteredPlayers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No players match the current filters
                                </TableCell>
                            </TableRow>
                        )}
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