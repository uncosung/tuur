import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

const styles = theme => ({
  root: {
    margin: theme.spacing(0.5)
  }
});

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    };
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
          selected={[ new Date()]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DatePicker);
