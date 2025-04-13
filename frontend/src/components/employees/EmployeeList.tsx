import { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, CircularProgress, Alert, Typography,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Employee } from '../../types/api';
import { employeeService } from '../../services/api';
import { EmployeeForm } from './EmployeeForm';
import { EmployeeEditDialog } from './EmployeeEditDialog';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

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

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>Employees</Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
                <EmployeeForm onSubmit={handleAddEmployee} />
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
                        {employees.map(employee => (
                            <TableRow key={employee.employeeID}>
                                <TableCell>{employee.employeeID}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.role}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setEditingEmployee(employee)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
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
        </div>
    );
};