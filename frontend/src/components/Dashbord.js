import React from 'react';
import Header from './Header';
import { Link  , Route , Switch} from 'react-router-dom';
import agent from '../agent';
import PackagesList from './Packages/PackagesList';
import NotRecovered from './Packages/NotRecovered';
import Recovered from './Packages/Recovered';
import RequestsList from './Requests/RequestsList';
import { connect } from 'react-redux';
import {
  DASHBORD_PAGE_LOADED,
  DASHBORD_PAGE_UNLOADED
} from '../constants/actionTypes';
import '../styles/dashbord.css';

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};
const mapStateToProps = state => ({
  packages : state.packageList.packages,
  currentUser: state.common.currentUser,
  dashbord: state.dashbord,
  common : state.common.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: DASHBORD_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: DASHBORD_PAGE_UNLOADED })
});

class Dashbord extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Packages.perUser());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <nav class="navbar bg-light">
      <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashbord/packages/">
              My packages
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashbord/notrecovered/">
              Not Recovered
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashbord/recovered/">
              Recovered
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/dashbord/requests/">
              Recovered
            </Link>
          </li>
      </ul>
      </nav>
      
    );
  }

  render() {
    return (
      <div id="dashbord" className="wrapper">
      <Header appName={this.props.appName} currentUser={this.props.currentUser} />
        <div className="container-fluid"> 
        <section id="bord">
        <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            {this.props.currentUser ? <h1>{this.props.currentUser.username}</h1> : null}
            {this.renderTabs()}

          </div>
          <div className="col-sm-9">
            <Switch>
              <Route exact path="/dashbord/packages/" component={PackagesList}/>
              <Route path="/dashbord/notrecovered/" component={NotRecovered} />
              <Route path="/dashbord/recovered/" component={Recovered}/>
              <Route path="/dashbord/requests/" component={RequestsList}/>
              <Route path="/dashbord/donate/" component={RequestsList}/>
            </Switch>
          </div>

        </div>
      </div>
      </section>

        </div>
                

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashbord);
