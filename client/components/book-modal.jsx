import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Link } from 'react-router-dom';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 55;
  const left = 55;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: '70%'
  };
}

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  marginTop: {
    marginTop: theme.spacing()
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  },
  marginLeft: {
    marginLeft: -17
  },
  paper: {
    position: 'absolute',
    width: 325,
    height: 150,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    outline: 'none'
  },
  snackbar: {
    backgroundColor: '#3A8288'
  },
  btnColor: {
    color: '#48dbfb'
  }
}));

function SimpleModal(props) {
  const [open, setOpen] = React.useState(false);
  const [openSnackBar, setSnackBarOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    const status = props.loggedIn;
    if (!status) {
      handleSnackbarOpen();
    } else {
      setOpen(true);
      
    }
  };

  const handleClose = () => {
    setOpen(false);
    props.booking();
    
  };

  const handleSnackbarOpen = () => {
    setSnackBarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  };

  const classes = useStyles();

  const bookingDates = () => {
    const dates = props.dates;
    let datesArray = '';
    for ( let index = 0; index < dates.length; index++ ){
      const yyyy = dates[index].getFullYear();
      const mm = dates[index].getMonth();
      const dd = dates[index].getDate();
      const day = String(dates[index]).slice( 0 , 3 );
      if ( index ){
        datesArray += `, ${day} ${mm}-${dd}-${yyyy}`
      } else {
        datesArray += `${day} ${mm}-${dd}-${yyyy}`
      }
    }
    return datesArray;
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button onClick={ props.dates.length ? handleOpen : null} type="button" className={classes.margin} fullWidth variant="contained" color="primary" >
          <Typography variant="body1" gutterBottom>Book</Typography>
        </Button>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography className={classes.marginBottom} variant="h5" id="modal-title" color="primary" align="center">
            Booking Confirmation
            </Typography>
            <img src={props.item.mainImage} className={classes.marginBottom} style={{ width: '100%', height: '200px' }} alt={props.item.title}/>
            <Typography variant="h6" id="simple-modal-description">
              Your booking has been confirmed!
              Product detail below:
              <br/>
              <br/>
            </Typography>
            <Typography variant="h6" id="simple-modal-description">
              { props.item.title }
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              { props.item.location }
            </Typography>
            <Typography className={classes.marginBottom} variant="subtitle1" id="simple-modal-description">
              Booked for the following dates: 
              <br/>
              { bookingDates() }
            </Typography>
            <Button type="button" className={classes.margin} fullWidth variant="contained" color="primary" onClick={handleClose}>
              <Typography variant="body1" gutterBottom>Close</Typography>
            </Button>
          </div>
        </Modal>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={openSnackBar}
          autoHideDuration={8000}
          onClose={handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
        >
          <SnackbarContent
            className={classes.snackbar}
            message={
              <Typography variant="button" id="message-id" > ✨ Please
                <Button className={classes.btnColor} key="undo" style={{ textDecorationLine: 'underline' }} size="medium" component={Link} to={'/login'}>
              Log in
                </Button>
              to book ✨</Typography>
            }
            action={
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleSnackbarClose}>
                <CloseIcon />
              </IconButton>
            }
          >
          </SnackbarContent>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
}

export default SimpleModal;
