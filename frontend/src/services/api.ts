import axios from 'axios';
import { Player, Game, Play, Employee } from '../types/api';

const api = axios.create({
    baseURL: 'http://localhost:5275/api'
});

export const playerService = {
    getAll: () => api.get<Player[]>('/players').then(res => res.data),
    getById: (id: number) => api.get<Player>(`/players/${id}`).then(res => res.data),
    create: (player: Omit<Player, 'playerID'>) => 
        api.post<Player>('/players', player).then(res => res.data),
    update: (id: number, player: Player) => 
        api.put<void>(`/players/${id}`, player),
    delete: (id: number) => api.delete<void>(`/players/${id}`)
};