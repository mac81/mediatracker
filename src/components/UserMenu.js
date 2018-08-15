import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SELECTORS} from '../reducers';
import * as userActions from '../actions/userActions';

class UserMenu extends Component {
  render() {
    const {user, userSignup} = this.props;

    return (
      <div>
        {user && `Hello ${user.user_metadata.full_name}`}
        <button onClick={userSignup}>Signup</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: SELECTORS.USER.getUser(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);
