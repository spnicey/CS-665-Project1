import { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, CircularProgress, Alert, Typography,
    IconButton, TextField, FormControl, InputLabel, Select, 
    MenuItem, Box, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Employee } from '../../types/api';
import { employeeService } from '../../services/api';
import { EmployeeForm } from './EmployeeForm';
import { EmployeeEditDialog } from './EmployeeEditDialog';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');

    const loadEmployees = () => {
        setLoading(true);
        employeeService.getAll()
            .then(data => {
                setEmployees(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load employees');
                setLoading(false);
            });
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleAddEmployee = async (employee: Omit<Employee, 'employeeID'>) => {
        try {
            await employeeService.create(employee);
            loadEmployees();
        } catch (err) {
            setError('Failed to create employee');
        }
    };

    const handleUpdateEmployee = async (employee: Employee) => {
        try {
            await employeeService.update(employee.employeeID, employee);
            loadEmployees();
        } catch (err) {
            setError('Failed to update employee');
        }
    };

    const handleDelete = async (employee: Employee) => {
        try {
            await employeeService.delete(employee.employeeID);
            loadEmployees();
        } catch (err) {
            setError('Failed to delete employee');
        }
    };

    const filteredEmployees = employees.filter(employee => {
        const matchesName = !nameFilter || 
            (employee.name?.toLowerCase() || '').includes(nameFilter.toLowerCase());
        
        const matchesId = !idFilter || 
            employee.employeeID.toString() === idFilter;
        
        const matchesRole = !roleFilter || 
            (employee.role?.toLowerCase() || '').includes(roleFilter.toLowerCase());
        
        const matchesEmail = !emailFilter || 
            (employee.email?.toLowerCase() || '').includes(emailFilter.toLowerCase());
        
        return matchesName && matchesId && matchesRole && matchesEmail;
    });

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>Employees</Typography>
            
            <Paper sx={{ p: 2, mb: 2 }}>
                <EmployeeForm onSubmit={handleAddEmployee} />
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
                            label="Search by Role"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Search by Email"
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
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
                            <TableCell>Role</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEmployees.map(employee => (
                            <TableRow key={employee.employeeID}>
                                <TableCell>{employee.employeeID}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.role}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setEditingEmployee(employee)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => setDeletingEmployee(employee)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredEmployees.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No employees match the current filters
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {editingEmployee && (
                <EmployeeEditDialog
                    open={true}
                    employee={editingEmployee}
                    onClose={() => setEditingEmployee(null)}
                    onSave={handleUpdateEmployee}
                />
            )}

            <DeleteConfirmDialog
                open={!!deletingEmployee}
                title={`Are you sure you want to delete ${deletingEmployee?.name}?`}
                onClose={() => setDeletingEmployee(null)}
                onConfirm={() => {
                    if (deletingEmployee) {
                        handleDelete(deletingEmployee);
                        setDeletingEmployee(null);
                    }
                }}
            />
        </div>
    );
};