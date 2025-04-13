import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Employee } from '../../types/api';
import { EmployeeForm } from './EmployeeForm';

interface EmployeeEditDialogProps {
    open: boolean;
    employee: Employee;
    onClose: () => void;
    onSave: (employee: Employee) => void;
}

export const EmployeeEditDialog = ({ open, employee, onClose, onSave }: EmployeeEditDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogContent>
                <EmployeeForm
                    initialValues={employee}
                    onSubmit={(updatedEmployee) => {
                        onSave({ ...updatedEmployee, employeeID: employee.employeeID });
                        onClose();
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};