import './Auth.css';
import React, { useState } from 'react';

function Auth() {
    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('admin');
    return (
        <div className="Auth">
            <input value={login} onChange={e => setLogin(e.target.value)}></input>
            <input value={password} onChange={e => setPassword(e.target.value)}></input>
            <button onClick={e => {
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
                        }
                        console.log(data)
                    })
                    .catch(e => console.log(e));
            }} >Войти</button>
            <button onClick={e => {
                fetch('/gettoken', {
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                })
                    .then(r => r.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(e => console.log(e));
            }}>Show</button>
            <button onClick={e => {
                localStorage.setItem('token', '');
            }}>Logout</button>
        </div>
    );
}

export default Auth;