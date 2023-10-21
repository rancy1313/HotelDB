import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';

import Header from './components/Header';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                {/* Display the navbar */}
                <Header />
                {/* Declare the routes */}
                <Routes>
                    {/* Public routes available when user is not logged in */}
                    <Route exact path='/' element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
