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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 55;
  const left = 55;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
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
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const [openSnackBar, setSnackBarOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    const notlogin = true;
    if (notlogin) {
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
  console.log(props);
  return (
    <div>
      <Button onClick={ props.dates.length ? handleOpen : null} type="button" className={classes.margin} fullWidth variant="contained" color="primary" >
        <Typography variant="body1" gutterBottom>Book</Typography>
      </Button>
      {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography> */}
      {/* <Button onClick={handleOpen}>Open Modal</Button> */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Confirmation
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            { props.item.title }
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            { props.item.location }
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Booked for the following dates:
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
                <Button className={classes.btnColor} key="undo" style={{ textDecorationLine: 'underline' }} size="medium" onClick={handleClose}>
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
