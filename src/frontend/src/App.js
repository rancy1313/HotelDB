import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ViewHotel from './pages/ViewHotel';

import SearchResults from './pages/SearchResults';
// {/* This is a public route, but should only be accessible after a user searches a hotel */}
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

                    <Route path='/search-results' element={<SearchResults />} />
                    <Route path='/search-results/view-hotel/:HOTEL_ID' element={<ViewHotel />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
