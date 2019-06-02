import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    margin: theme.spacing(0.5),
    fontSize: 33
  }
});

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: []
    };
    this.selectedDate = [new Date()];
    this.setDate = this.setDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setDate(date){
    let dateArray = defaultMultipleDateInterpolation(date, this.state.dates);
    this.setState({
      dates: dateArray
    })
  }
  handleSubmit(){
    console.log(this.state.dates)
  }
  componentDidMount(){
    let dateArray = defaultMultipleDateInterpolation(this.selectedDate, this.state.dates);
    this.setState({
      dates: dateArray
    })
  }
  render() {
    const MultipleDatesCalendar = withMultipleDates(Calendar);
    const { classes } = this.props;
    return (
      <div className={classes.root}>

        <InfiniteCalendar
          width={350}
          height={300}
          Component={MultipleDatesCalendar}
          interpolateSelection={defaultMultipleDateInterpolation}
          selected={this.selectedDate}
          onSelect={(date) => {
            this.setDate(date);
          }}
        />
        <Button onClick = {this.handleSubmit} type="button" className={classes.margin} fullWidth variant="contained" color="primary">
          <Typography variant="body1" gutterBottom>submit dates</Typography>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(DatePicker);
