import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Employee } from '../../types/api';

interface EmployeeFormProps {
    initialValues?: Employee;
    onSubmit: (employee: Omit<Employee, 'employeeID'>) => void;
}

export const EmployeeForm = ({ initialValues, onSubmit }: EmployeeFormProps) => {
    const [name, setName] = useState(initialValues?.name ?? '');
    const [role, setRole] = useState(initialValues?.role ?? '');
    const [email, setEmail] = useState(initialValues?.email ?? '');

    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name ?? '');
            setRole(initialValues.role ?? '');
            setEmail(initialValues.email ?? '');
        }
    }, [initialValues]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            role,
            email
        });

        if (!initialValues) {
            setName('');
            setRole('');
            setEmail('');
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
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
            />
            <Button type="submit" variant="contained">
                {initialValues ? 'Update Employee' : 'Add Employee'}
            </Button>
        </Box>
    );
};