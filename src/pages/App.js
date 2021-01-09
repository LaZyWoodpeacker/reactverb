import { connect } from 'react-redux'
import { Button, Container, Typography, Toolbar, IconButton, AppBar, Fab, Grid, Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { AddChangeDlg, ConfirmDlg } from './Dialogs'

const useStyles = makeStyles(theme => ({
    app: {
        textAlign: 'center',
        minHeight: '100vh'
    },
    main: {
        marginTop: 80,
        marginBottom: 100,
    },
    grow: {
        flexGrow: 1
    },
    fab: {
        position: 'fixed!important',
        bottom: '2rem',
        right: '2rem',
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));


function App(props) {
    const classes = useStyles();
    const [removeDlg, setremoveDlg] = useState(false)
    const [chAddDlg, setChAddDlg] = useState(false)
    const [curDlg, setCurDlg] = useState(null)
    const [id, setId] = useState(null)

    if (!localStorage.getItem('token')) {
        props.history.push('/auth');
    }

    const getData = () => disp => {
        disp({ type: 'SET_LOADING', payload: true })
        fetch('/data.json')
            .then(r => r.json())
            .then(r => {
                props.dispatch({ type: 'UPLOAD_LIST', payload: r })
            })
            .finally(e => disp({ type: 'SET_LOADING', payload: false }))
    }

    const saveData = () => disp => {
        disp({ type: 'SET_LOADING', payload: true })
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(props.list.map((e, i) => ({ ...e, id: i })))
        })
            .then(r => {
                disp({ type: 'SET_SAVE', payload: false })
            })
            .finally(e => disp({ type: 'SET_LOADING', payload: false }))
            .catch(e => console.log(e));
    }

    useEffect(() => {
        props.dispatch(getData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classes.app}>
            <AppBar position="fixed">
                <Container>
                    <Toolbar>
                        <IconButton edge="start" color="inherit">
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant="h6" className={classes.grow} ></Typography>
                        {props.save && <IconButton edge="start" color="inherit" onClick={e => {
                            props.dispatch(saveData())
                        }}>
                            <SaveIcon />
                        </IconButton>
                        }
                        <IconButton edge="start" color="inherit" onClick={e => {
                            localStorage.removeItem('token');
                            props.history.push('/auth');
                        }}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <main>
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
                                                setId(i);
                                                setCurDlg(props.list[i]);
                                                setChAddDlg(true);
                                            }
                                        }>Change</Button>
                                        <Button size="small" onClick={
                                            e => {
                                                setId(i);
                                                setremoveDlg(true);
                                            }
                                        }>Remove</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        })}
                    </Grid>
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={e => {
                        setCurDlg({
                            "id": -1,
                            "verben": "",
                            "transFrag": "",
                            "trans": "",
                            "dat": false,
                            "pris": "",
                            "prop": ""
                        });
                        setId(-1);
                        setChAddDlg(true);
                    }}>
                        <AddIcon />
                    </Fab>
                </Container>
            </main>
            <ConfirmDlg show={removeDlg} id={id} onClose={(remove, id) => {
                setremoveDlg(false)
                if (remove) {
                    props.dispatch({ type: 'REMOVE_FROM_LIST', payload: id })
                }
            }}></ConfirmDlg>
            <AddChangeDlg show={chAddDlg} id={id} em={curDlg} onClose={(save, id, obj) => {
                setChAddDlg(false)
                if (save) {
                    if (id === -1) {
                        props.dispatch({ type: 'ADD_TO_LIST', payload: obj });
                    }
                    else {
                        props.dispatch({ type: 'CHANGE_EM_LIST', payload: { id, obj } })
                    }
                }
            }}></AddChangeDlg>
            <Backdrop className={classes.backdrop} open={props.loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >
    );
}

export default connect(s => ({ ...s }))(App);
