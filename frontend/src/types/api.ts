export interface Player {
    playerID: number;
    name: string;
    membership: number;
    balance: number;
    plays?: Play[];
}

export interface Game {
    gameID: number;
    name: string;
    type: string;
    cost: number;
    plays?: Play[];
}

export interface Play {
    playID: number;
    playerID: number;
    gameID: number;
    score: number;
    player?: Player;
    game?: Game;
}

export interface Employee {
    employeeID: number;
    name: string | null;
    role: string | null;
    email: string | null;
}