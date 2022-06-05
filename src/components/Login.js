import { Button, Grid, useTheme, useMediaQuery, makeStyles, Typography, TextField, CircularProgress, Snackbar } from '@material-ui/core';
import React, { useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import API from '../API';
import { AuthContext } from './Context';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
    sendButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 45,
        width: 245,
        fontSize: '1rem',
        marginBottom: '3em',
        backgroundColor: theme.palette.common.orange,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down("sm")]: {
            height: 40,
            width: 225
        }
    }
}));


export default function Login() {

    const {setJwt, setUsername, setRole} = useContext(AuthContext)


    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    const [passwordValues, setPassword] = useState({
        password: "",
        showPassword: false,
    });

    const [name, setName] = useState('');

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({ open: false, color: "" });
    const [alertMessage, setAlertMesssage] = useState("");

    const handlePasswordChange = (prop) => (event) => {
        setPassword({ ...passwordValues, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setPassword({ ...passwordValues, showPassword: !passwordValues.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const buttonContents = (
        <React.Fragment>
            Submit
        </React.Fragment>
    );

    const history = useHistory();

    const Push = (e) => {
        e.preventDefault();
        setLoading(true);

        API.sendLoginRequest(name, passwordValues.password)
            .then(res => {
                setJwt(res.data.jwt)
                setUsername(res.data.user.username)
                setRole(res.data.user.role)
                setAlert({ open: true, color: "#4BB543" })
                setAlertMesssage("Successfully logged in !!")
                history.push("/")
            })
            .catch(err => {
                setAlert({ open: true, color: "#FF3232" });
                setAlertMesssage("Something went wrong! Please try again.");
                console.error(err)
            })
            .finally(
                setLoading(false)
            )

        setName('');
        setPassword('');
    }


    return (
        <Grid
            container
            direction='column'
            justifyContent='center'
            style={{
                marginTop: matchesSM ? '4em' : matchesMD ? '5em' : undefined,
                marginBottom: matchesMD ? '5em' : undefined
            }}
        >
            <Grid item>
                <Grid item container direction='column' style={{ alignItems: 'center' }}>
                    <Grid item>
                        <Typography
                            variant='h3'
                            align='center'
                            style={{ lineHeight: 1 }}
                        >
                            Log in
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        direction='column'
                        style={{ maxWidth: matchesXS ? '20em' : matchesSM ? '25em' : '40em' }}
                    >
                        <Grid item style={{ marginTop: '2em', marginBottom: '0.5em' }}>
                            <Typography style={{ color: theme.palette.common.blue }}>Name</Typography>
                            <TextField
                                id="name"
                                variant="outlined"
                                fullWidth
                                // error={senderEmailHelper.length !== 0}
                                // helperText={senderEmailHelper}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Typography htmlFor="standard-adornment-password">
                                Enter your Password
                            </Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type={passwordValues.showPassword ? "text" : "password"}
                                onChange={handlePasswordChange("password")}
                                value={passwordValues.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {passwordValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>

                        <Grid item container justifyContent='center' style={{ marginTop: '2em' }}>
                            <Button
                                disabled={
                                    name.length === 0 ||
                                    passwordValues.password === 0
                                }
                                variant='contained'
                                className={classes.sendButton}
                                onClick={Push}
                            >
                                {loading ? <CircularProgress size={30} /> : buttonContents}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                open={alert.open}
                ContentProps={{
                    style: {
                        backgroundColor: alert.color
                    }
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                message={alertMessage}
                autoHideDuration={4000}
                onClose={() => setAlert(false)}
            />

        </Grid>
    );
};
