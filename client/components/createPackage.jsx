import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import DatePicker from './results/date-multiple-picker';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const divStyle = {
  width: '47px',
  height: '40px',
  border: '1px solid gray',
  marginRight: '5px'
};

const imgStyle = {
  width: '100%',
  height: '100%',
  backgroundRepeat: 'norepeat',
  backgroundSize: '100% 100%'
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#A6C7C8' },
    inherit: { main: '#A0C3C5' },
    default: { main: '#f5e1da' }
  }
});

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '100%'
  },
  marginTop: {
    marginTop: theme.spacing(5)
  },
  paddingTop: {
    paddingTop: theme.spacing(5)
  },
  noPadding: {
    padding: 2
  },
  marginLeft: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(3)
  },
  chip: {
    width: '31%',
    fontSize: '1rem',
    margin: '2px'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 276,
    maxWidth: 276
  },
  subtitle: {
    fontSize: 20
  },
  modalStyle: {
    top: 5,
    left: 5
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 7,
    outline: 'none'
  },
  input: {
    width: '100%'
  },
  form: {
    width: '100%'
  },
  dateChip: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 40,
    marginRight: '4px',
    marginBottom: '4px'
  },
  close: {
    padding: theme.spacing(2)
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  }
});

const categories = [
  'Food',
  'Shopping',
  'Coffee',
  'Outdoors',
  'Nightlife',
  'Activities'
];

class CreatePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      tags: [],
      location: '',
      timeRange: '',
      dates: [],
      imageUrl: '',
      inputErrors: {
        title: false,
        location: false,
        imageUrl: false,
        timeRange: false,
        description: false,
        tags: false
      },
      openModal: false,
      newDates: [],
      openSnackBar: false

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.iconClickhandler = this.iconClickhandler.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.removeChips = this.removeChips.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      tags: value
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      inputErrors: { ...this.state.inputErrors, [name]: false }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, description, location, tags, timeRange, dates, imageUrl } = this.state;

    if (!this.state.title.length || !this.state.description.length || !this.state.location.length || !this.state.imageUrl.length) {
      this.setState({
        inputErrors: {
          title: !this.state.title,
          description: !this.state.description,
          location: !this.state.location,
          imageUrl: !this.state.imageUrl
        }
      });
    } else {
      // for ( var value of dates ){
      if (this.state.imageUrl.length !== 0 && this.state.dates.length !== 0 && this.state.tags.length !== 0) {
        fetch('/api/package.php', {
          method: 'POST',
          body: JSON.stringify(
            { title, location, tags, timeRange, description, dates, imageUrl })
        })
          .then(res => res.json())
          .then(newPackage => this.props.view('userProfile', this.props.user));
        this.setState({ openSnackBar: false });
      }
      // }
    }
    if (this.state.imageUrl.length === 0 || this.state.dates.length === 0 || this.state.tags.length === 0) {
      this.setState({ openSnackBar: true });
    } else {
      this.setState({ openSnackBar: false });
    }
  }

  handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackBar: false });
  }

  handleSnackbarOpen() {
    this.setState({ openSnackBar: true });
  }

  handleModalClose(dates) {
    this.setState({
      openModal: false,
      dates: dates
    });
  }

  modalClose() {
    this.setState({ openModal: false });
  }

  iconClickhandler() {
    let img = document.getElementById('input-imageUrl').value;
    let imgArray = this.state.imageUrl;
    if (img) {
      if (imgArray.length >= 4) {
        document.getElementById('input-imageUrl').value = '';
        return;
      }
      this.setState({ imageUrl: [...this.state.imageUrl, img] });
      document.getElementById('input-imageUrl').value = '';
    }
  }

  removeImage(e) {
    let id = e.target.id;
    id = parseInt(id);
    let imgArray = this.state.imageUrl;
    imgArray.splice(id, 1);
    this.setState({ imageUrl: imgArray });
  }

  removeChips(e) {
    let dateId = e.currentTarget.id;
    dateId = parseInt(dateId);
    let datesArray = this.state.dates;
    datesArray.splice(dateId, 1);
    this.setState({ dates: datesArray });
  }

  maxDate() {
    const currentDate = new Date();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    const maxMonth = this.maxMonth(month);
    const maxDay = 1;
    const maxYear = this.maxYear(maxMonth, year);
    const maxDate = new Date(maxYear, maxMonth, maxDay);
    const data = {
      maxDate
    };
    return data;
  }

  maxMonth(currentMonth) {
    if (currentMonth >= 10) {
      return currentMonth + 2 - 12;
    }
    return currentMonth + 2;
  }

  maxYear(month, year) {
    if (!month) {
      return year++;
    }
    return year;
  }

  render() {
    const { classes } = this.props;
    let warning = null;
    if (this.state.imageUrl.length === 0) {
      warning = '⛔️ You need to upload images 🎍';
    } else if (this.state.dates.length === 0) {
      warning = '⛔️ You need to pick dates 📆';
    } else if (this.state.tags.length === 0) {
      warning = '⛔️ You need to pick categories 🍧';
    }
    return (
      <Container>
        <Typography className={classes.marginTop} variant="h4" align="center" gutterBottom>
            Create Tuur
        </Typography>
        <Grid mx="auto" container component="form" justify="center" onSubmit={this.handleSubmit}>

          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10}>
              <TextField required helperText={this.state.inputErrors.title ? 'Must include a title' : ' '} error={this.state.inputErrors.title} fullWidth id="input-title" label="Title" name="title" onChange={this.handleInputChange} text={ this.state.name}/>
            </Grid>
          </Grid>
          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10}>
              <TextField required helperText={this.state.inputErrors.location ? 'Please provide a location' : ' '} error={this.state.inputErrors.location} fullWidth id="input-location" label="Location" name="location" onChange={this.handleInputChange} />
            </Grid>
          </Grid>

          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10} >
              <FormControl className={classes.form}>
                <InputLabel htmlFor="input-image" required>
                    Images (max 4)
                </InputLabel>
                <Input
                  placeholder='Images (max 4 images)'
                  className={classes.input}
                  id="input-imageUrl"
                  type = 'text'
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container justify="center" direction="row">
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="0" style={imgStyle} src={this.state.imageUrl ? this.state.imageUrl[0] : null} alt=""/>
            </div>
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="1" style={imgStyle} src={this.state.imageUrl ? this.state.imageUrl[1] : null} alt=""/>
            </div>
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="2" style={imgStyle} src={this.state.imageUrl ? this.state.imageUrl[2] : null} alt=""/>
            </div>
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="3" style={imgStyle} src={this.state.imageUrl ? this.state.imageUrl[3] : null} alt=""/>
            </div>
            <IconButton aria-label="add" className={classes.noPadding} onClick={this.iconClickhandler}>
              <AddCircleOutline style={{ fontSize: 40 }}/>
            </IconButton>
          </Grid>

          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10}>
              <TextField required helperText={this.state.inputErrors.timeRange ? 'Please provide duration of tuur' : ' '} error={this.state.inputErrors.timeRange} fullWidth id="input-timeRange" label="Tuur Duration (Time range)" name="timeRange" onChange={this.handleInputChange} />
            </Grid>
          </Grid>

          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10}>
              <TextField
                id='outlined-textarea'
                label='Describe the Tuur (150 characters)'
                required
                helperText={this.state.inputErrors.description ? 'Please enter a short description about the tuur' : ' '}
                error={this.state.inputErrors.description}
                multiline
                fullWidth
                rowsMax={3}
                className={classes.textField}
                name="description"
                onChange={this.handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid className={classes.margin} container alignItems="flex-end">
            <Grid item xs={6} className={classes.marginLeft}>
              <Typography className={classes.subtitle} variant="subtitle2" align="left" gutterBottom>
              Available Dates
              </Typography>
            </Grid>
            <Grid item xs={2} >
              <CalendarToday onClick={() => this.setState({ openModal: true })}/>
            </Grid>

            <Grid item xs={11} >
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.openModal}
                onClose={() => this.handleModalClose(this.state.dates)}
              >
                <Grid className={classes.paper}>
                  <DatePicker key={this.state.title} dates={this.state.dates} close={this.handleModalClose} modalClose={this.modalClose} unavailableDates={ this.maxDate()} />

                </Grid>
              </Modal>
            </Grid>
          </Grid>
          <Grid container>
            {this.state.dates.map((data, index) => {
              let date = data.getDate();
              let month = data.getMonth() + 1;
              let newdate = month + '/' + date;
              return (
                <Chip
                  variant="outlined" color="primary" size="small"
                  key={index}
                  label={newdate}
                  id={index}
                  className={classes.dateChip}
                  onClick={this.removeChips}
                />
              );

            })}
          </Grid>

          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <div className={classes.root}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip" required>
                    Categories
                </InputLabel>
                <Select
                  multiple
                  value={this.state.tags}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                          color="primary"
                        />
                      ))}
                    </div>
                  )}
                >
                  {categories.map(name => (
                    <MenuItem key={name} value={name}>
                      <Typography className={classes.subtitle} variant="subtitle2" align="left" gutterBottom>
                        {name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

          </Grid>

          <Grid justify="center" className={classes.margin} container>
            <Grid className={classes.marginTop} container justify="center" >
              <ThemeProvider theme={theme}>
                <Button type="submit" className={classes.margin} fullWidth variant="contained" color="primary">
                  <Typography variant="body1" gutterBottom>Create Package</Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            variant="info"
            open={this.state.openSnackBar}
            autoHideDuration={6000}
            onClose={this.handleSnackbarClose}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">{warning}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={() => this.handleSnackbarClose()}>
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(CreatePackage);
