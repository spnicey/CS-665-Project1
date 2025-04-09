import { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { Player } from '../../types/api';

interface PlayerFormProps {
    onSubmit: (player: Omit<Player, 'playerID'>) => void;
}

export const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
    const [name, setName] = useState('');
    const [membership, setMembership] = useState('0');
    const [balance, setBalance] = useState('0');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            membership: parseInt(membership),
            balance: parseFloat(balance)
        });
        setName('');
        setMembership('0');
        setBalance('0');
    };

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Membership"
                    type="number"
                    value={membership}
                    onChange={(e) => setMembership(e.target.value)}
                    required
                />
                <TextField
                    label="Balance"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained">Add Player</Button>
            </Box>
        </Paper>
    );
};