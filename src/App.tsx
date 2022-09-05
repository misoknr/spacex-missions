import React from 'react';
import { Provider } from "urql";

import { spacexClient } from './spacex/api-client'
import MissionTable from './spacex/MissionTable';
import './App.css';

function App() {
    return (
        <Provider value={spacexClient}>
            <div className="App">
                <h1>SpaceX Mission List</h1>
                <MissionTable/>
            </div>
        </Provider>
    );
}

export default App;
