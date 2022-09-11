import React from 'react';
import { Navbar } from 'react-bootstrap';

import LanguageSelector from './LanguageSelector';

const AppHeader = () => (
    <Navbar sticky="top">
        <LanguageSelector/>
    </Navbar>
);

export default AppHeader;
