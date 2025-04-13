import { useEffect, useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, CircularProgress, Alert, Typography,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Play } from '../../types/api';
import { playService } from '../../services/api';
import { PlayForm } from './PlayForm';
import { PlayEditDialog } from './PlayEditDialog';
import { DeleteConfirmDialog } from '../common/DeleteConfirmDialog';

export const PlayList = () => {
    const [plays, setPlays] = useState<Play[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingPlay, setEditingPlay] = useState<Play | null>(null);
    const [deletingPlay, setDeletingPlay] = useState<Play | null>(null);

    const loadPlays = () => {
        setLoading(true);
        playService.getAll()
            .then(data => {
                setPlays(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load plays');
                setLoading(false);
            });
    };

    useEffect(() => {
        loadPlays();
    }, []);

    const handleAddPlay = async (play: Omit<Play, 'playID'>) => {
        try {
            await playService.create(play);
            loadPlays();
        } catch (err: any) {
            console.error('Error creating play:', err);
            // Show the error message from the API if available
            setError(err.response?.data?.error || 'Failed to create play');
        }
    };

    const handleUpdatePlay = async (play: Play) => {
        try {
            await playService.update(play.playID, play);
            loadPlays();
        } catch (err) {
            setError('Failed to update play');
        }
    };

    const handleDelete = async (play: Play) => {
        try {
            await playService.delete(play.playID);
            loadPlays();
        } catch (err) {
            setError('Failed to delete play');
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4" sx={{ my: 2 }}>Plays</Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
                <PlayForm onSubmit={handleAddPlay} />
            </Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Play ID</TableCell>
                            <TableCell>Player Name</TableCell>
                            <TableCell>Game Name</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plays.map(play => (
                            <TableRow key={play.playID}>
                                <TableCell>{play.playID}</TableCell>
                                <TableCell>{play.player?.name}</TableCell>
                                <TableCell>{play.game?.name}</TableCell>
                                <TableCell>{play.score}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setEditingPlay(play)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => setDeletingPlay(play)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {editingPlay && (
                <PlayEditDialog
                    open={true}
                    play={editingPlay}
                    onClose={() => setEditingPlay(null)}
                    onSave={handleUpdatePlay}
                />
            )}

            <DeleteConfirmDialog
                open={!!deletingPlay}
                title={`Are you sure you want to delete this play record?`}
                onClose={() => setDeletingPlay(null)}
                onConfirm={() => {
                    if (deletingPlay) {
                        handleDelete(deletingPlay);
                        setDeletingPlay(null);
                    }
                }}
            />
        </div>
    );
};