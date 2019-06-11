import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InfiniteCalendar, {
  Calendar,
  withMultipleDates,
  defaultMultipleDateInterpolation
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
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
  fontSize: {
    fontSize: '2.5rem'
  },
  paddingRight: {
    paddingRight: 20
  },
  paddingLeft: {
    paddingLeft: 20
  }
});

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: this.props.dates
    };
    this.setDate = this.setDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
  }

  setDate(date) {
    let dateArray = defaultMultipleDateInterpolation(date, this.state.dates);
    this.setState({
      dates: dateArray
    });
  }

  handleSubmit() {
    this.state.dates.sort((a, b) => {
      return a.getTime() - b.getTime();
    });
    this.props.close(this.state.dates);
  }

  handleBooking() {
    if (this.state.dates.length) {
      this.props.booking(this.state.dates);
      this.props.history.push('../itinerary');
    }
  }

  nextDay() {
    let today = new Date();
    const dd = today.getDate() + 1;
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;
    return today;
  }

  render() {
    const MultipleDatesCalendar = withMultipleDates(Calendar);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid justify="center" alignItems="center" container>
          <Grid item xs={2} className={classes.paddingRight} onClick={() => this.props.modalClose()}>
            <KeyboardArrowLeft className={classes.fontSize} />
          </Grid>
          <Grid item xs={10} className={classes.paddingLeft}>
            <Typography className={classes.marginTop} variant="h4" gutterBottom>
            Select dates
            </Typography>
          </Grid>
        </Grid>

        <InfiniteCalendar
          width={350}
          height={300}
          Component={MultipleDatesCalendar}
          selected={this.state.dates}
          onSelect={date => {
            this.setDate(date);
          }}
          minDate= { new Date(this.nextDay())}
          maxDate= { this.props.unavailableDates.maxDate }
          disabledDates = { (this.props.unavailableDates) ? this.props.unavailableDates.disabledList : null }
          className={classes.marginBottom}
        />

        <Grid className={classes.marginLeft} justify="center" alignItems="center" container>
          <Grid item xs={7} >
            { this.props.unavailableDates.disabledList
              ? <Button onClick = {this.handleBooking } type="button" className={classes.margin} fullWidth variant="contained" color="primary" >
                <Typography variant="body1" gutterBottom>Book</Typography>
              </Button>
              : <Button onClick = {this.handleSubmit} type="button" className={classes.margin} fullWidth variant="contained" color="primary">
                <Typography variant="body1" gutterBottom>Select Dates</Typography>
              </Button>
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(DatePicker));
