import React, { useEffect, useState } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    CircularProgress,
    Alert
} from '@mui/material';
import { Player } from '../types/api';
import { playerService } from '../services/api';

export const PlayerList: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        playerService.getAll()
            .then(data => {
                setPlayers(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load players');
                setLoading(false);
            });
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
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
    );
};