import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Game } from '../../types/api';
import { GameForm } from './GameForm';

interface GameEditDialogProps {
    open: boolean;
    game: Game;
    onClose: () => void;
    onSave: (game: Game) => void;
}

export const GameEditDialog = ({ open, game, onClose, onSave }: GameEditDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Game</DialogTitle>
            <DialogContent>
                <GameForm
                    initialValues={game}
                    onSubmit={(updatedGame) => {
                        onSave({ ...updatedGame, gameID: game.gameID });
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