import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';
import {SELECTORS} from '../reducers';
import * as userActions from '../actions/userActions';

const StyledUserMenu = styled.div`
  .avatar {
    background-color: rgb(4, 28, 44);
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
  }
`;
class UserMenu extends Component {
  render() {
    const {user, userSignup} = this.props;

    return (
      <StyledUserMenu>
        <div className="avatar">
          <svg viewBox="0 0 24 24">
            <path
              fill="#ffffff"
              d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
            />
          </svg>
        </div>
        {!user && <button onClick={userSignup}>Signup</button>}
      </StyledUserMenu>
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
