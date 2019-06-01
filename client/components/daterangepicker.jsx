import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DateRangePicker } from 'react-dates';
import { mergeClasses } from '@material-ui/styles';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const styles = theme => ({
  root: {
    margin: theme.spacing(0.5),
    width: '80%'
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={this.state.startDate}
          orientation="vertical" verticalHeight={568}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }); }}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => { this.setState({ focusedInput }); }}
        />
      </div>
    );
  }
}
// import React, { Component } from 'react';
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';

// class DatePicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: [new Date(), new Date()]
//     };
//   }
//   onChange(date) {
//     this.setState({ date });
//   }
//   render() {
//     return (
//       <div>
//         <DateRangePicker
//           onChange={this.onChange}
//           value={this.state.date}
//         />
//       </div>
//     );
//   }
// }
export default withStyles(styles)(DatePicker);
