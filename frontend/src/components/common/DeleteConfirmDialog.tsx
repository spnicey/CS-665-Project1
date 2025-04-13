import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteConfirmDialogProps {
    open: boolean;
    title: string;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteConfirmDialog = ({ open, title, onClose, onConfirm }: DeleteConfirmDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>{title}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};