import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'urql';

import { spacexClient } from './spacex/api-client'
import MissionDetail from './spacex/MissionDetail';
import MissionList from './spacex/MissionList';
import './App.css';

function App() {
    return (
        <div className="App">
            <Provider value={spacexClient}>
                <Routes>
                    <Route path="/" element={<MissionList/>}/>
                    <Route path="/launch/:id" element={<MissionDetail/>}/>
                </Routes>
            </Provider>
        </div>
    );
}

export default App;
