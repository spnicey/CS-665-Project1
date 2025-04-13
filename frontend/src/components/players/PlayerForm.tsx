import { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { Player } from '../../types/api';

interface PlayerFormProps {
    initialValues?: Player;
    onSubmit: (player: Omit<Player, 'playerID'>) => void;
}

export const PlayerForm = ({ initialValues, onSubmit }: PlayerFormProps) => {
    const [name, setName] = useState(initialValues?.name ?? '');
    const [membership, setMembership] = useState(initialValues?.membership?.toString() ?? '0');
    const [balance, setBalance] = useState(initialValues?.balance?.toString() ?? '0');

    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name);
            setMembership(initialValues.membership.toString());
            setBalance(initialValues.balance.toString());
        }
    }, [initialValues]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            membership: parseInt(membership),
            balance: parseFloat(balance)
        });

        if (!initialValues) {
            setName('');
            setMembership('0');
            setBalance('0');
        }
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
                <Button type="submit" variant="contained">
                    {initialValues ? 'Update Player' : 'Add Player'}
                </Button>
            </Box>
        </Paper>
    );
};