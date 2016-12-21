import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from './login/LoginForm';

const App =
    <div>
        <h1>Courtbook</h1>
        <div>For Great Justice!</div>
        <LoginForm/>
    </div>;

ReactDOM.render(App, document.getElementById('app'));