import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, useEffect } from 'react';
import { Button, Typography, Toolbar, IconButton, AppBar, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    grow: {
        flexGrow: 1
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddChangeDlg(props) {
    const classes = useStyles();

    const [id, setId] = useState(null)
    const [verben, setVerben] = useState(null)
    const [frag, setFrag] = useState(null)
    const [transFrag, setTransFrag] = useState(null)
    const [trans, setTrans] = useState(null)
    const [dat, setDat] = useState(null)
    const [pris, setPris] = useState(null)
    const [prop, setProp] = useState(null)

    function getObj() {
        return { id, verben, frag, transFrag, trans, dat, pris, prop }
    }

    useEffect(() => {
        if (props.em) {
            setId(props.em.id)
            setVerben(props.em.verben)
            setFrag(props.em.frag)
            setTransFrag(props.em.transFrag)
            setTrans(props.em.trans)
            setDat(props.em.dat)
            setPris(props.em.pris)
            setProp(props.em.prop)
        }
    }, [props.id, props.em])

    return (
        <Dialog fullScreen open={props.show} onClose={e => props.onClose(false)} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Container maxWidth="md">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={e => props.onClose(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.grow}>Добавить</Typography>
                        <Button autoFocus color="inherit" onClick={e => props.onClose(true, props.id, getObj())}>Изменить</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <DialogContent>
                <Container maxWidth="md">
                    <div>
                        <Typography variant="h6" component="h6">id:{id}</Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            label="verben"
                            value={verben}
                            onChange={e => setVerben(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="frag"
                            value={frag || ''}
                            onChange={e => setFrag(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="transFrag"
                            value={transFrag || ''}
                            onChange={e => setTransFrag(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="trans"
                            value={trans || ''}
                            onChange={e => setTrans(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="dat"
                            value={dat || ''}
                            onChange={e => setDat(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="pris"
                            value={pris || ''}
                            onChange={e => setPris(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="prop"
                            value={prop || ''}
                            onChange={e => setProp(e.target.value)}
                        />
                    </div>
                </Container>
            </DialogContent>
        </Dialog>
    );
}

function ConfirmDlg(props) {
    return <Dialog
        open={props.show}
        TransitionComponent={Transition}
    >
        <DialogTitle id="alert-dialog-title">Вы уверенны?</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">Вы уверены что хотите удалить?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={e => props.onClose(false)} color="primary">Нет</Button>
            <Button onClick={e => props.onClose(true, props.id)} color="primary" autoFocus>Да</Button>
        </DialogActions>
    </Dialog>
}

export { AddChangeDlg, ConfirmDlg };