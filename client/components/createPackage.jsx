import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import FastFood from '@material-ui/icons/FastFood';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';

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
        flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(0.5),
      fontSize: 33
    },
    padding: {
      padding: theme.spacing(1)
    },
    paddingBottom: {
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1)
    },
    textField: {
      marginRight: theme.spacing(1),
      width: '100%'
    },
    marginTop: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5)
    },
    marginTop2: {
      marginTop: theme.spacing(2)
    },
    chip: {
        margin: theme.spacing(1),
    },
  });

class CreatePackage extends Component{
    constructor(props){
        super(props);
        this.state={
            title: '',
            description: '',
            tags: [],
            language: '',
            hours: '',
            dates: [],
            imageUrl:'',
            inputErrors: {
                name: false,
                email: false,
                location: false,
                image: false,
                bio: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
          [name]: value,
          inputErrors: { ...this.state.inputErrors, [name]: false }
        });
    }

    handleSubmit(event) {
        const { title, description, tags, language, hours, dates, imageUrl} = this.state;
        event.preventDefault();
        if (!this.state.title.length || !this.state.description.length || !this.state.language.length || !this.state.imageUrl.length) {
          this.setState({
            inputErrors: {
              title: !this.state.title,
              description: !this.state.description,
              language: !this.state.language,
              imageUrl: !this.state.imageUrl,
            }
          });
        } else {
          fetch('/api/package.php', {
            method: 'POST',
            body: JSON.stringify(
              { title, description, tags, langauge, hours, dates, imageUrl})
    
          })
            .then(res => res.json())
            .then(newUser => {
              this.setState({
                title: '',
                description: '',
                tags: [],
                language: '',
                hours: '',
                dates: [],
                imageUrl:'',
              });
            });
        }
      }
    

    render(){
        const { classes } = this.props;

        return (
        <Container>
            <Typography className={classes.marginTop} variant="h4" align="center" gutterBottom>
            Create Tuur
            </Typography>
            <Grid mx="auto" container component="form" justify="center" onSubmit={this.handleSubmit}>

            <Grid className={classes.margin} container alignItems="flex-end" justify="center">
                <Grid item xs={10}>
                <TextField required helperText={this.state.inputErrors.title ? 'Must include a title' : ' '} error={this.state.inputErrors.title} fullWidth id="input-title" label="Title" name="title" onChange={this.handleInputChange} />
                </Grid>
            </Grid>
            <Grid className={classes.margin} container alignItems="flex-end" justify="center">
                <Grid item xs={10}>
                <TextField required helperText={this.state.inputErrors.language ? 'Please provide a language' : ' '} error={this.state.inputErrors.language} fullWidth id="input-language" label="language" name="language" onChange={this.handleInputChange} />
                </Grid>
            </Grid>

            <Grid className={classes.margin} container alignItems="flex-end" justify="center">
                <Grid item xs={10}>
                <TextField required helperText={this.state.inputErrors.imageUrl ? 'Please provide images' : ' '} error={this.state.inputErrors.imageUrl} fullWidth id="input-imageUrl" label="Images" name="imageUrl" onChange={this.handleInputChange} />
                </Grid>
            </Grid>

            <Grid className={classes.margin} container alignItems="flex-end" justify="center">
                <Typography className={classes.margin} variant="h2" align="center" gutterBottom>
                    Tuur Tags
                </Typography>
                <div className={classes.root}>                   
                        <Chip
                            label="FOOD"
                            // onClick={}
                            className={classes.chip}
                            foodIcon={<FastFood />}
                            variant="outlined"
                        />

                        <Chip
                            label="NIGHTLIFE"
                            // onClick={}
                            className={classes.chip}
                            variant="outlined"
                        />

                        <Chip
                            label="OUTDOORS"
                            // onClick={}
                            className={classes.chip}
                            variant="outlined"
                        />

                        <Chip
                            label="SHOPPING"
                            // onClick={}
                            className={classes.chip}
                            variant="outlined"
                        />

                        <Chip
                            label="ACTIVITIES"
                            // onClick={}
                            className={classes.chip}
                            variant="outlined"
                        />

                        <Chip
                            label="COFFEE"
                            // onClick={}
                            className={classes.chip}
                            variant="outlined"
                        />

                        <Chip
                            label="CULTURE"
                            // onClick={}
                            className={classes.chip}
                            variant="outlined"
                        />
                </div>
            </Grid>

            <Grid className={classes.margin} container alignItems="flex-end" justify="center">
                <Grid item xs={10}>
                <TextField
                    id='outlined-textarea'
                    label='Describe the Tuur(In 150 characters)'
                    required
                    helperText={this.state.inputErrors.description ? 'Please enter a short description about the tuur' : ' '}
                    error={this.state.inputErrors.description}
                    multiline
                    fullWidth
                    rowsMax={3}
                    className={classes.textField}
                    margin='normal'
                    name="description"
                    onChange={this.handleInputChange}
                />
                </Grid>
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
        )
    }
}

export default withStyles(styles)(CreatePackage);