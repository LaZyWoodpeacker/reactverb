import './App.css';
import { connect } from 'react-redux'
import { Button, Container, Typography, Toolbar, IconButton, AppBar, Fab, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    main: {
        marginTop: 10
    },
    card: {
        width: 275,
        margin: 5
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function App(props) {
    const classes = useStyles();
    const [removeDlg, setremoveDlg] = useState(false)
    const [chAddDlg, setChAddDlg] = useState(false)

    useEffect(() => {
        fetch('/data.json')
            .then(r => r.json())
            .then(r => {
                props.dispatch({ type: 'UPLOAD_LIST', payload: r })
            })
    })

    if (!localStorage.getItem('token')) {
        props.history.push('/auth');
    }
    return (
        <div className="App">
            <AppBar className="AppBar" position="static">
                <Container>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className="grow" ></Typography>
                        <Button color="inherit" onClick={e => {
                            localStorage.removeItem('token');
                            props.history.push('/auth');
                        }}>Logout</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container className={classes.main}>
                <Grid container
                    justify="center"
                    alignItems="stretch">
                    {props.list.map((e, i) => {
                        return <div key={i}>
                            <Card className={classes.card} >
                                <CardContent>
                                    <Typography variant="h5" component="h2">{e.trans}</Typography>
                                    <Typography className={classes.pos} color="textSecondary">{e.verben}</Typography>
                                    <Typography variant="body2" component="p">{e.transFrag}</Typography>
                                    <Typography variant="body2" component="p">{e.frag}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={
                                        e => {
                                            setChAddDlg(true)
                                            props.dispatch({ type: 'CHANGE_EM_LIST', payload: i })
                                        }
                                    }>Change</Button>
                                    <Button size="small" onClick={
                                        e => {
                                            setremoveDlg(true)
                                        }
                                    }>Remove</Button>
                                </CardActions>
                            </Card>
                        </div>
                    })}
                </Grid>
            </Container>
            <Fab color="primary" aria-label="add" className="Fab" onClick={e => {
                props.dispatch({ type: 'ADD_TO_LIST', payload: props.list.length + 1 })
            }}>
                <AddIcon />
            </Fab>
            <Dialog
                open={removeDlg}
                onClose={e => console.log("test")}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Вы уверенны?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Вы уверены что хотите удалить?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => setremoveDlg(false)} color="primary">Нет</Button>
                    <Button onClick={e => {
                        setremoveDlg(false)
                        // props.dispatch({ type: 'REMOVE_FROM_LIST', payload: i })
                    }} color="primary" autoFocus>Да</Button>
                </DialogActions>
            </Dialog>
            <Dialog fullScreen open={chAddDlg} onClose={e => setChAddDlg(false)} >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={e => setChAddDlg(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" >Sound</Typography>
                        <Button autoFocus color="inherit" onClick={e => setChAddDlg(false)}>save</Button>
                    </Toolbar>
                </AppBar>

            </Dialog>
        </div >
    );
}

export default connect(s => ({ list: s.list }))(App);
