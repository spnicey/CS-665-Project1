import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { Navbar } from './components/layout/Navbar';
import { PlayerList } from './components/players/PlayerList';

function App() {
    return (
        <Router>
            <Navbar />
            <Container sx={{ mt: 3 }}>
                <Routes>
                    <Route path="/" element={<PlayerList />} />
                    <Route path="/players" element={<PlayerList />} />
                    {/* Add other routes as needed */}
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
