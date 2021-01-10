import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    app: {
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

function Auth(props) {
    const classes = useStyles();
    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('admin');
    return (
        <div className={classes.app}>
            <Grid container spacing={2} justify="center" direction="column">
                <Grid item>
                    <TextField variant="outlined" label="login" value={login} onChange={e => setLogin(e.target.value)}></TextField>
                </Grid>
                <Grid item>
                    <TextField variant="outlined" label="password" value={password} onChange={e => setPassword(e.target.value)}></TextField>
                </Grid>
                <Grid item>
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
                                    props.history.push('/admin');
                                }
                            })
                            .catch(e => console.log('AuthError'));
                    }} >Войти</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Auth;