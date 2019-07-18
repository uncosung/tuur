import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import MatGeocoder from 'react-mui-mapbox-geocoder';

class CreatePackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      tags: [],
      location: {
        name: '',
        coordinates: []
      },
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
  }

  handleSelect = (result) => {
    this.setState({
      location: {
        name: result.place_name,
        coordinates: result.geometry.coordinates,
      }
    });
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      tags: value
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      inputErrors: { ...this.state.inputErrors, [name]: false }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, location, tags, timeRange, dates, imageUrl } = this.state;

    if (!title.length || !description.length || !location.name.length || !imageUrl.length) {
      this.setState({
        inputErrors: {
          title: !title,
          description: !description,
          location: !location,
          imageUrl: !imageUrl
        }
      });
    } else {
      // for ( var value of dates ){
      if (imageUrl.length !== 0 && dates.length !== 0 && tags.length !== 0 && location.name.length !== 0) {
        fetch('/api/package.php', {
          method: 'POST',
          body: JSON.stringify(
            { title, location, tags, timeRange, description, dates, imageUrl })
        })
          .then(res => res.json())
          .then(newPackage => console.log('new package on createPackage', newPackage));
        this.setState({ openSnackBar: false });
        this.props.history.push('/user-profile/' + this.props.packages.email);
      }
      // }
    }
    if (imageUrl.length === 0 || dates.length === 0 || tags.length === 0 || location.name.length === 0) {
      this.setState({ openSnackBar: true });
    } else {
      this.setState({ openSnackBar: false });
    }
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackBar: false });
  }

  handleSnackbarOpen = () => {
    this.setState({ openSnackBar: true });
  }

  handleModalClose = (dates) => {
    this.setState({
      openModal: false,
      dates: dates
    });
  }

  modalClose = () => {
    this.setState({ openModal: false });
  }

  iconClickhandler = () => {
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

  removeImage = (e) => {
    let id = e.target.id;
    id = parseInt(id);
    let imgArray = this.state.imageUrl;
    imgArray.splice(id, 1);
    this.setState({ imageUrl: imgArray });
  }

  removeChips = (e) => {
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


    const geocoderApiOptions = {
      country: 'us',
      proximity: { longitude: -118.243683, latitude: 34.052235 }
    };

    return (
      <Container style={{ paddingBottom: '80px' }}>
        <Typography className={classes.marginTop} variant="h4" align="center" gutterBottom>
          Create Tuur
        </Typography>
        <Grid mx="auto" container component="form" justify="center" onSubmit={this.handleSubmit}>

          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10}>
              <TextField required helperText={this.state.inputErrors.title ? 'Must include a title' : ' '} error={this.state.inputErrors.title} fullWidth id="input-title" label="Title" name="title" onChange={this.handleInputChange} text={this.state.name} />
            </Grid>
          </Grid>
          {/* <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10}>
              <TextField required helperText={this.state.inputErrors.location ? 'Please provide a location' : ' '} error={this.state.inputErrors.location} fullWidth id="input-location" label="Location" name="location" onChange={this.handleInputChange} />
            </Grid>
          </Grid> */}
          <Grid justify="center" className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10}>
              <MatGeocoder
                inputPlaceholder="Location"
                accessToken={'pk.eyJ1IjoiamVub25nMTkiLCJhIjoiY2p2MzJoZHFoMDIxejQ0czNvYXF2azNnNSJ9.El0sFq0rePnWEbFC4RwVTQ'}
                showLoader={true}
                showInputContainer={false}
                autocomplete={true}
                fuzzyMatch={true}
                {...geocoderApiOptions}
                onSelect={this.handleSelect}
                onChange={this.handleInputChange}
                name="location"
              />
            </Grid>
          </Grid>

          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10} >
              <FormControl className={classes.form}>
                <InputLabel htmlFor="input-image" required>
                  Images (max 4, click to remove)
                </InputLabel>
                <Input
                  placeholder='Images (max 4 images, click to remove)'
                  className={classes.input}
                  id="input-imageUrl"
                  type='text'
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container justify="center" direction="row">
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="0" style={imgStyle} src={this.state.imageUrl ? this.state.imageUrl[0] : null} alt="" />
            </div>
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="1" style={imgStyle} src={this.state.imageUrl ? this.state.imageUrl[1] : null} alt="" />
            </div>
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="2" style={imgStyle} src={this.state.imageUrl ? this.state.imageUrl[2] : null} alt="" />
            </div>
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="3" style={imgStyle} src={this.state.imageUrl ? this.state.imageUrl[3] : null} alt="" />
            </div>
            <IconButton aria-label="add" className={classes.noPadding} onClick={this.iconClickhandler}>
              <AddCircleOutline style={{ fontSize: 40 }} />
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
              <CalendarToday onClick={() => this.setState({ openModal: true })} />
            </Grid>

            <Grid item xs={11} >
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.openModal}
                onClose={() => this.handleModalClose(this.state.dates)}
              >
                <Grid className={classes.paper}>
                  <DatePicker key={this.state.title} dates={this.state.dates} close={this.handleModalClose} modalClose={this.modalClose} unavailableDates={this.maxDate()} />

                </Grid>
              </Modal>
            </Grid>
          </Grid>
          <div style={{ padding: '0 25px 0 30px 0', display: 'flex', width: '80%', flexWrap: 'wrap' }} >
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
          </div>

          <Grid className={classes.margin} style={{ marginBottom: '30px' }} container alignItems="flex-end" justify="center">
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

          <ThemeProvider theme={theme}>
            <Grid container justify="center" style={{ marginBottom: '30px' }}>
              <Grid item xs={10}>
                <Button type="submit" fullWidth variant="contained" color="primary" onClick={this.handleSubmit} >
                  <Add style={{ fontSize: '30px', padding: 0, margin: 0 }} className={classes.extendedIcon} /> Create
                </Button>
              </Grid>
            </Grid>
          </ThemeProvider>

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
    marginTop: theme.spacing(3)
  },
  paddingTop: {
    paddingTop: theme.spacing(5)
  },
  noPadding: {
    padding: 2
  },
  marginLeft: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(1)
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
  },
  fab: {
    margin: theme.spacing(1),
    right: 20,
    bottom: '77px',
    position: 'fixed'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
});

const categories = [
  'Food',
  'Shopping',
  'Coffee',
  'Outdoors',
  'Nightlife',
  'Activities',
  'Other'
];

export default withStyles(styles)(CreatePackage);
