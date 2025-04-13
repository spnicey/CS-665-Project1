import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Game } from '../../types/api';

interface GameFormProps {
    initialValues?: Game;
    onSubmit: (game: Omit<Game, 'gameID'>) => void;
}

export const GameForm = ({ initialValues, onSubmit }: GameFormProps) => {
    const [name, setName] = useState(initialValues?.name ?? '');
    const [type, setType] = useState(initialValues?.type ?? '');
    const [cost, setCost] = useState(initialValues?.cost?.toString() ?? '0');

    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name);
            setType(initialValues.type);
            setCost(initialValues.cost.toString());
        }
    }, [initialValues]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            type,
            cost: parseFloat(cost)
        });

        if (!initialValues) {
            setName('');
            setType('');
            setCost('0');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
            />
            <TextField
                label="Cost"
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
            />
            <Button type="submit" variant="contained">
                {initialValues ? 'Update Game' : 'Add Game'}
            </Button>
        </Box>
    );
};