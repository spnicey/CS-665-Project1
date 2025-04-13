import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Play } from '../../types/api';
import { PlayForm } from './PlayForm';

interface PlayEditDialogProps {
    open: boolean;
    play: Play;
    onClose: () => void;
    onSave: (play: Play) => void;
}

export const PlayEditDialog = ({ open, play, onClose, onSave }: PlayEditDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Play</DialogTitle>
            <DialogContent>
                <PlayForm
                    initialValues={play}
                    onSubmit={(updatedPlay) => {
                        onSave({ ...updatedPlay, playID: play.playID });
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
