import { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, CircularProgress, Alert, Typography 
} from '@mui/material';
import { Player } from '../../types/api';
import { playerService } from '../../services/api';
import { PlayerForm } from './PlayerForm';

export const PlayerList = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>Players</Typography>
            <PlayerForm onSubmit={handleAddPlayer} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Membership</TableCell>
                            <TableCell>Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map(player => (
                            <TableRow key={player.playerID}>
                                <TableCell>{player.playerID}</TableCell>
                                <TableCell>{player.name}</TableCell>
                                <TableCell>{player.membership}</TableCell>
                                <TableCell>${player.balance.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};