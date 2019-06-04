import React, { Component } from 'react';
// import clsx from 'clsx';
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
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import DatePicker from './daterangepicker';

const divStyle = {
  width: '47px',
  height: '40px',
  border: '1px solid gray',
  marginRight: '5px',
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
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
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
  marginLeft: {
    marginLeft: theme.spacing(3),
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
  form : {
    width: '100%'
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
      language: '',
      location: 'sd',
      hours: '',
      dates: ['01/01/2019'],
      imageUrl: [],
      inputErrors: {
        name: false,
        email: false,
        location: false,
        image: false,
        bio: false
      },
      openModal: false,
      tempImage: '',
      message: ''

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.iconClickhandler = this.iconClickhandler.bind(this);
    this.removeImage = this.removeImage.bind(this);
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
    const { title, description, location, tags, language, hours, dates, imageUrl } = this.state;

    if (!this.state.title.length || !this.state.description.length || !this.state.language.length || !this.state.imageUrl.length) {
      this.setState({
        inputErrors: {
          title: !this.state.title,
          description: !this.state.description,
          language: !this.state.language,
          imageUrl: !this.state.imageUrl
        }
      });
    } else {
      fetch('/api/package.php', {
        method: 'POST',
        body: JSON.stringify(
          { title, location, tags, hours, description, dates, imageUrl })
      })
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(newUser => {
          console.log(newuser);
        // this.setState({
        //   title: '',
        //   description: '',
        //   tags: [],
        //   language: '',
        //   hours: '',
        //   dates: [],
        //   imageUrl: ''
        // });
        });
    }
  }
  handleModalClose() {
    this.setState({ openModal: false });
  }
  iconClickhandler() {
    let img = document.getElementById('input-imageUrl').value;
    let imgArray= this.state.imageUrl;
    if(imgArray.length >= 4) {
      document.getElementById('input-imageUrl').value = '';
      return;
    }
    this.setState({ imageUrl : [...this.state.imageUrl, img]});
    document.getElementById('input-imageUrl').value = '';
  }
  removeImage(e) {
    let id = e.target.id;
    id = parseInt(id); 
    let imgArray = this.state.imageUrl;
    imgArray.splice(id, 1);
    this.setState({ imageUrl: imgArray });
  }
  render() {
    console.log('state', this.state);
    const { classes } = this.props;

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
              <TextField required helperText={this.state.inputErrors.language ? 'Please provide a language' : ' '} error={this.state.inputErrors.language} fullWidth id="input-language" label="Language" name="language" onChange={this.handleInputChange} />
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
                  name="tempImage"
                  // onChange={this.handleInputChange}
                     />
              </FormControl>
            </Grid>
          </Grid>
          
          <Grid container justify="center" direction="row">       
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="0" style={imgStyle} src={this.state.imageUrl? this.state.imageUrl[0] : null} alt=""/>
            </div>
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="1" style={imgStyle} src={this.state.imageUrl? this.state.imageUrl[1] : null} alt=""/>
            </div>
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="2" style={imgStyle} src={this.state.imageUrl? this.state.imageUrl[2] : null} alt=""/>
            </div>
            <div style={divStyle} className="preview" onClick={this.removeImage}>
              <img id="3" style={imgStyle} src={this.state.imageUrl? this.state.imageUrl[3] : null} alt=""/>
            </div>
            <IconButton aria-label="add" onClick={this.iconClickhandler}>
              <AddCircleOutline />
            </IconButton>
          </Grid>

          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10}>
              <TextField required helperText={this.state.inputErrors.imageUrl ? 'Please provide duration of tuur' : ' '} error={this.state.inputErrors.imageUrl} fullWidth id="input-hours" label="Tuur Duration(hours)" name="hours" onChange={this.handleInputChange} />
            </Grid>
          </Grid>

          <Grid className={classes.margin} container alignItems="flex-end" justify="center">
            <Grid item xs={10}>
              <TextField
                id='outlined-textarea'
                label='Describe the Tuur(150 characters)'
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

            <Grid item xs={11} className={classes.marginZero}>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.openModal}
                onClose={this.handleModalClose}
              >
                <Grid className={classes.paper}>
                  <DatePicker close={this.handleModalClose}/>
                </Grid>

              </Modal>
            </Grid>

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
                <Button type="submit" className={classes.margin} fullWidth variant="contained" color="primary" onClick={this.handleSubmit}>
                  <Typography variant="body1" gutterBottom>Create Package</Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(CreatePackage);
