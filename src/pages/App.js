import './App.css';
import { connect } from 'react-redux'
import { Button, Container, Typography, ButtonGroup, Toolbar, IconButton, AppBar, Fab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

function App(props) {
    if (!localStorage.getItem('token')) {
        props.history.push('/auth');
    }
    return (
        <div className="App">
            <AppBar className="AppBar" position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="grow" ></Typography>
                    <Button color="inherit" href="/auth">Login</Button>
                    <Button color="inherit" onClick={e => {
                        localStorage.setItem('token', '');
                    }}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container className="Main">
                {props.list.map((e, i) => {
                    return <div key={i}>
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '24px' }}>{e}</Typography>
                        <ButtonGroup variant="text" color="primary" aria-label="contained primary button group">
                            <Button onClick={
                                e => {
                                    props.dispatch({ type: 'CHANGE_EM_LIST', payload: i })
                                }
                            }>change</Button>
                            <Button onClick={
                                e => {
                                    props.dispatch({ type: 'REMOVE_FROM_LIST', payload: i })
                                }
                            }>remove</Button>
                        </ButtonGroup>
                    </div>
                })}
            </Container>
            <Fab color="primary" aria-label="add" className="Fab" onClick={e => {
                props.dispatch({ type: 'ADD_TO_LIST', payload: props.list.length + 1 })
            }}>
                <AddIcon />
            </Fab>
        </div>
    );
}

export default connect(s => ({ list: s.list }))(App);
