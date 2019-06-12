import React, { Component } from 'react';
import UserProfile from './user-profile';
import { Route, Switch, withRouter } from 'react-router-dom';
import BottomNav from './bottom-nav';
import LogIn from './log-in';
import Itinerary from './itinerary';
import Results from './results';
import Search from './search';
import PackageDetails from './results/package-details';
import UserViewProfile from './user-view-profile';
import EditProfile from './user-edit-profile';
import SignUp from './sign-up';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      user: null,
      location: [],
      tags: [],
      toggleStatus: false,
      dates: {
        start: null,
        end: null
      }
    };
    this.setRoutePath = this.setRoutePath.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.logIn = this.logIn.bind(this);
    this.edit = this.edit.bind(this);

  }

  componentDidUpdate(prevProps, prevState) {
    console.log('previous', prevState, 'current', this.state)
    if (this.state.path !== prevState.path || this.state.tags !== prevState.tags) {
      this.props.history.push(this.state.path);
    }
  }

  setRoutePath(path) {
    console.log('setting path', this.state);
    this.setState({
      path: path
    }, () => console.log('stateystate', this.state));
  }

  logIn(user) {
    this.setState({ user }, () => this.props.history.push('/user-profile/' + user.email));
  }

  edit(user) {
    this.setState({ user }, () => this.props.history.push('/user-profile/' + user.email));
  }

  handleSearch(location, tags, dates) {
    console.log('searched!', location, tags, dates)
    if (!location.name && tags) {
      this.setState({
        tags: tags
      }, () => console.log('these arent the dates', this.state))
      return
    }
    else if (!location.name && !tags){
      return
    }
    else if (!tags && !dates){
      this.setState({
        location:location
      })
    }
    else {
      this.setState({
        location: location,
        tags: tags,
        dates: {
          start: dates.start,
          end: dates.end
        }
      }, () => console.log('these arent the dates', this.state));
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login"
            render={props =>
              <div>
                <LogIn {...props} logIn={this.logIn} isAuthed={true}/>
              </div>
            }/>

          <Route exact path="/" render={props =>
            <div>
              <Search search={this.handleSearch} path={this.setRoutePath} />
            </div>
          }/>
          <Route exact path="/itinerary" render={props =>
            <div>
              <Itinerary />
            </div>
          }/>
          <Route exact path="/sign-up" render={props =>
            <div>
              <SignUp logIn={this.logIn}/>
            </div>
          }/>
          <Route exact path="/user-view-profile/:email"
            render={props => <div><UserViewProfile {...props} isAuthed={true}/>, <BottomNav path={this.setRoutePath} user={this.state.user}/></div>}/>

          <Route exact path="/user-profile/:email"
            render={props => <div><UserProfile user={this.state.user} {...props} isAuthed={true}/>,
            </div>}
          />

          <Route exact path="/edit-profile/:email"
            render={props => <div><EditProfile user={this.state.user} {...props} isAuthed={true}/>,
            </div>}
          />

          <Route path="/results" render={props =>
            <div>
              <Results dates={this.state.dates} handleDates={this.handleDates} toggleStatus={this.state.toggleStatus} key={this.state.location.name} tags={this.state.tags} location={this.state.location} search={this.handleSearch}/>

            </div>
          }/>
          <Route path="/package-details/:id"
            render={props => <PackageDetails packages={this.state.user}{...props} isAuthed={true}/>}/>

        </Switch>
        <BottomNav path={this.setRoutePath} user={this.state.user}/>
      </div>

    );
  }
}

export default withRouter(App);
