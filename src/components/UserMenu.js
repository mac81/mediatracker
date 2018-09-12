import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';
import {SELECTORS} from '../reducers';
import * as userActions from '../actions/userActions';
import {font} from '../styles/typography';
import {Link} from 'react-router-dom';

const StyledUserMenu = styled.div`
  .user-menu {
    display: flex;
    align-items: center;
  }

  .avatar {
    background-color: #34234e;
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
  }

  .user-dropdown-menu {
    position: relative;
  }

  .user-dropdown-menu-content {
    position: absolute;
    background: white;
  }

  .button {
    background: none;
    border: none;
    ${font('button')};
    color: rgba(255, 255, 255, 0.87);
    text-transform: uppercase;
    padding: 6px 10px;
    cursor: pointer;
    margin-left: 20px;
    border-radius: 3px;
    transition: background 300ms ease-in-out;
    &:hover {
      background-color: rgb(4, 28, 44);
    }
  }
`;
class UserMenu extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };
  }

  logout = () => {
    this.setState({showMenu: false}, () => {
      document.removeEventListener('click', this.closeMenu);
    });
    this.props.logout();
  };

  showMenu = event => {
    event.preventDefault();

    this.setState({showMenu: true}, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({showMenu: false}, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  };

  render() {
    const {user, login, signup} = this.props;

    return (
      <StyledUserMenu>
        {user && (
          <div className="user-menu">
            <Link to="/collection">My collection</Link>
            <div className="user-dropdown-menu">
              <div className="avatar" onClick={this.showMenu}>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#E97F60"
                    d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                  />
                </svg>
              </div>
              {this.state.showMenu && (
                <div
                  className="user-dropdown-menu-content"
                  ref={element => {
                    this.dropdownMenu = element;
                  }}>
                  <button onClick={this.logout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        )}

        {!user && (
          <div>
            <button className="button" onClick={login}>
              Login
            </button>
            <button className="button" onClick={signup}>
              Signup
            </button>
          </div>
        )}
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
