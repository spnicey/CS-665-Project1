import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Player } from '../../types/api';
import { PlayerForm } from './PlayerForm';

interface PlayerEditDialogProps {
    open: boolean;
    player: Player;
    onClose: () => void;
    onSave: (player: Player) => void;
}

export const PlayerEditDialog = ({ open, player, onClose, onSave }: PlayerEditDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Player</DialogTitle>
            <DialogContent>
                <PlayerForm
                    initialValues={player}
                    onSubmit={(updatedPlayer) => {
                        onSave({ ...updatedPlayer, playerID: player.playerID });
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