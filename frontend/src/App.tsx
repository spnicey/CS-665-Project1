import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlayerList } from './components/PlayerList';
import { Container } from '@mui/material';

function App() {
    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<PlayerList />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
