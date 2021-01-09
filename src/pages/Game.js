import { Container, Typography, Grid, Backdrop, CircularProgress, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    app: {
        textAlign: 'center',
        height: '100vh',
    },
    main: {
        marginTop: 80,
        marginBottom: 100,
    },
    quest: {
        width: 100,
        height: 100
    }
}));


function ShowData({ data }) {
    if (!data) return null;
    return <pre>
        {JSON.stringify(data, null, 2)}
    </pre>
}


export default function Game() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        fetch('/data.json')
            .then(r => r.json())
            .then(r => {
                setData(r)
            })
            .finally(e => setLoading(false));
    }, []);

    return (<>
        <main>
            <Container>
                <Grid container justify="center">
                    <Grid item>
                        <Typography>Test</Typography>
                    </Grid>
                </Grid>
                <Grid container justify="center" direction="column">
                    <Grid item>
                        <Paper elevation={2} className={classes.quest} />
                    </Grid>
                    <Grid item>
                        <Button>Test</Button>
                    </Grid>
                </Grid>
            </Container>
        </main>
        <footer>
            <ShowData data={data} />
        </footer>
        <Backdrop className={classes.backdrop} open={loading} >
            <CircularProgress color="inherit" />
        </Backdrop>
    </>);
}