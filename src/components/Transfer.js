import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CircularProgress, Snackbar } from "@material-ui/core";
import { AuthContext } from "./Context";
import API from "../API";

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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function Transfer() {
  const classes = useStyles();

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))

  const [sender, setSender] = useState("");
  const [reciver, setReciver] = useState("");
  const [amt, setAmt] = useState(0);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMesssage] = useState("");

  const [users, setUsers] = useState([]);
  const { jwt } = useContext(AuthContext)


  useEffect(() => {
    const getDataFromFirebase = [];
    API.getAllUsers().then(querySnapshot => {
      querySnapshot.data.map(({ _id, username }) => {
        getDataFromFirebase.push({ username, key: _id });
      });
      setUsers(getDataFromFirebase);
    });
  }, [])

  const transferMoney = async (e) => {
    e.preventDefault();
    if (!jwt) {
      setAlert({ open: true, color: "#FF3232" });
      setAlertMesssage("You are not authorized");
    }


    setLoading(true);

    var rusr = users.filter(p => { return p.username === reciver });
    console.log('sender account:', rusr[0].amount);

    var susr = users.filter(p => { return p.username === sender });
    console.log('recvier accunt:', susr[0].amount);

    if (susr[0].username === rusr[0].username) {
      setLoading(false);
      setAlert({ open: true, color: "#FF3232" });
      setAlertMesssage("Both Sender and Reciver cant be same.");
    }
    else if (parseFloat(susr[0].amount) < parseFloat(amt)) {
      setLoading(false);
      setAlert({ open: true, color: "#FF3232" });
      setAlertMesssage("Sender dont have enough funds.");
    }
    else {

      API.postTransaction(jwt, reciver, amt)
        .then(() => {
          setAlert({ open: true, color: "#4BB543" });
          setAlertMesssage("Money Transferred Successfully !!!!");
        }).catch(error => {
          setAlert({ open: true, color: "#FF3232" });
          setAlertMesssage("Something went wrong! Please try again.");
        })
        .finally(setLoading(false));

      setAmt(0);
      setReciver("");
      setSender("");


    }
  }

  const onAmountChange = (e) => {
    const amt = e.target.value;
    if (!amt || amt.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setAmt(amt);
    }
  }

  const buttonContents = (
    <React.Fragment>
      Transfer
    </React.Fragment>
  );


  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      style={{
        marginTop: matchesSM ? '4em' : matchesMD ? '5em' : undefined,
        marginBottom: matchesMD ? '5em' : '4.5em'
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
              Transfer Money
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction='column'
            style={{ maxWidth: matchesXS ? '20em' : matchesSM ? '25em' : '40em' }}
          >
            <Grid item style={{ marginTop: '2em', marginBottom: '0.5em' }}>
              <Typography style={{ color: theme.palette.common.blue }}>From</Typography>
              <FormControl variant="outlined" fullWidth>
                <Select
                  native
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  label="From"
                >
                  <option aria-label="None" value="" />
                  {users.map((data) => {
                    return (<option key={Math.random().toString(36).substr(2, 9)}>{data.username}</option>)
                  })}
                </Select>
              </FormControl>


            </Grid>
            <Grid item style={{ marginBottom: '0.5em' }}>
              <Typography style={{ color: theme.palette.common.blue }}>To</Typography>
              <FormControl variant="outlined" fullWidth >
                <Select
                  native
                  value={reciver}
                  onChange={(e) => setReciver(e.target.value)}
                  label="From"
                >
                  <option aria-label="None" value="" />
                  {users.map((data) => {
                    return (<option key={Math.random().toString(36).substr(2, 9)}>{data.username}</option>)
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item style={{ marginBottom: '0.5em' }}>
              <Typography style={{ color: theme.palette.common.blue }}>
                Amount
              </Typography>
              <TextField
                id="amount"
                style={{ marginTop: '1' }}
                variant="outlined"
                fullWidth
                value={amt}
                onChange={onAmountChange}
              />
            </Grid>
            <Grid item container justifyContent='center' style={{ marginTop: '2em' }}>
              <Button
                disabled={
                  reciver.length === 0 ||
                  sender.length === 0 ||
                  amt.length === 0
                }
                variant='contained'
                className={classes.sendButton}
                onClick={transferMoney}
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
  )
}





