import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { Navbar } from './components/layout/Navbar';
import { PlayerList } from './components/players/PlayerList';
import { GameList } from './components/games/GameList';
import { EmployeeList } from './components/employees/EmployeeList';
import { PlayList } from './components/plays/PlayList';

function App() {
    return (
        <Router>
            <Navbar />
            <Container sx={{ mt: 3 }}>
                <Routes>
                    <Route path="/" element={<PlayerList />} />
                    <Route path="/players" element={<PlayerList />} />
                    <Route path="/games" element={<GameList />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/plays" element={<PlayList />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
