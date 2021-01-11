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
    const [pris, setPris] = useState(null)

    function getObj() {
        return { id, verben, frag, transFrag, trans, pris }
    }

    useEffect(() => {
        if (props.em) {
            setId(props.em.id)
            setVerben(props.em.verben)
            setFrag(props.em.frag)
            setTransFrag(props.em.transFrag)
            setTrans(props.em.trans)
            setPris(props.em.pris)
        }
    }, [props.id])

    return (
        <Dialog fullScreen open={props.show} onClose={e => props.onClose(false)} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Container maxWidth="md">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={e => props.onClose(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.grow}></Typography>
                        <Button autoFocus color="inherit" onClick={e => props.onClose(true, props.id, getObj())}>{(id === -1) ? 'Добавить' : 'Изменить'}</Button>
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
                            label="Глагол"
                            value={verben}
                            onChange={e => setVerben(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Перевод глагола"
                            value={trans || ''}
                            onChange={e => setTrans(e.target.value)}
                        />
                        <TextField
                            label="Вопрос"
                            multiline
                            fullWidth
                            value={frag || ''}
                            onChange={e => setFrag(e.target.value)}
                        />
                        <TextField
                            label="Приставка"
                            fullWidth
                            value={pris || ''}
                            onChange={e => setPris(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            multiline
                            label="Перевод вопроса"
                            value={transFrag || ''}
                            onChange={e => setTransFrag(e.target.value)}
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