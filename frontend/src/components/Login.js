
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';
import './../styles/login.css';
import Header from './Header';
import '../styles/login.css';

const mapStateToProps = state => ({ 
  ...state.auth,
  appName: state.common.appName,
  token: state.common.token 
});

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (username, password) =>
    dispatch({ type: LOGIN, payload:agent.Auth.login(username, password)}),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (username, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const username = this.props.username;
    const password = this.props.password;
    return (
      <div className="auth-page">
          <div className="banner">
            <div className="container">
              <h1 className="text-xs-left">Login</h1>
            </div>
          </div>        
          <div className="page container">

          <div className="row">
          

            <div className="col-md-12 col-xs-12 form-block">
              <div class="alert alert-light" role="alert">
              {this.props.errors}
              </div>  
              <h1 className="text-xs-left"></h1>
              <p className="text-xs-left">
                <Link to="/register">
                  Need an account?
                </Link>
              </p>

              

              <form onSubmit={this.submitForm(username, password)} >
                <fieldset>

                  <fieldset className="form-group">
                    <label>Username or Email</label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={this.changeUsername} />
                  </fieldset>

                  <fieldset className="form-group">
                    <label>Password</label>
                  <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign in
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
  