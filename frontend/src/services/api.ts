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

export const gameService = {
    getAll: () => api.get<Game[]>('/games').then(res => res.data),
    getById: (id: number) => api.get<Game>(`/games/${id}`).then(res => res.data),
    create: (game: Omit<Game, 'gameID'>) => 
        api.post<Game>('/games', game).then(res => res.data),
    update: (id: number, game: Game) => 
        api.put<void>(`/games/${id}`, game),
    delete: (id: number) => api.delete<void>(`/games/${id}`)
};

export const employeeService = {
    getAll: () => api.get<Employee[]>('/employees').then(res => res.data),
    getById: (id: number) => api.get<Employee>(`/employees/${id}`).then(res => res.data),
    create: (employee: Omit<Employee, 'employeeID'>) => 
        api.post<Employee>('/employees', employee).then(res => res.data),
    update: (id: number, employee: Employee) => 
        api.put<void>(`/employees/${id}`, employee),
    delete: (id: number) => api.delete<void>(`/employees/${id}`)
};