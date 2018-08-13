import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Link} from 'react-router-dom';
import {SELECTORS} from '../reducers';
import {bindActionCreators} from 'redux';
import {userLogin} from '../actions/userActions';
import styled from 'styled-components';
import {font, color} from '../styles/typography';
import Hero from '../components/Hero';

class Login extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      username: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  login() {
    this.props.userLogin(this.state.username, this.state.password);
  }

  render() {
    const {details, season, match} = this.props;

    return (
      <div>
        <input name="username" onChange={this.onChange} />
        <input type="password" name="password" onChange={this.onChange} />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  details: SELECTORS.SERIES.getSeriesDetails(state),
  season: SELECTORS.SERIES.getSeason(state),
});

const mapDispatchToProps = dispatch => ({
  userLogin: bindActionCreators(userLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
