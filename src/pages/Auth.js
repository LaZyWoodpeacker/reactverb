import './Auth.css';
import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

function Auth(props) {
    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('admin');
    return (
        <div className="Auth">
            <TextField value={login} onChange={e => setLogin(e.target.value)}></TextField>
            <TextField value={password} onChange={e => setPassword(e.target.value)}></TextField>
            <Button variant="contained" color="primary" onClick={e => {
                fetch('/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ login, password })
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data.type === 'ok') {
                            localStorage.setItem('token', data.token);
                            props.history.push('/');
                        }
                    })
                    .catch(e => console.log('AuthError'));
            }} >Войти</Button>
            <Button variant="contained" onClick={e => {
                fetch('/gettoken', {
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                })
                    .then(r => r.text())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(e => console.log(e));
            }}>Show</Button>
        </div>
    );
}

export default Auth;