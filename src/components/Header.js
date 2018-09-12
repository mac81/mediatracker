import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {SELECTORS} from '../reducers';
import styled from 'styled-components';
import {font} from '../styles/typography';
import UserMenu from './UserMenu';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(to right top, #34234e, #572d5b, #793764, #9b4268, #ba5268);
  padding: 20px;

  .left {
    display: flex;
  }

  img {
    max-height: 50px;
    margin-right: 50px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    display: flex;
  }

  li {
    display: inline-flex;
  }

  a {
    padding: 10px 20px;
    color: #fff;
    ${font('button')};
    text-transform: uppercase;
  }
`;

class Header extends Component {
  render() {
    const {user} = this.props;
    return (
      <StyledHeader>
        <div className="left">
          <img
            src="http://reforgedstudios.com/site/templates/images/media/reforged_logo_horizontal_white_text.png"
            alt="logo"
          />
          <nav>
            <ul>
              <li>
                <Link to="">Discover</Link>
              </li>
              <li>
                <Link to="">Movies</Link>
              </li>
              <li>
                <Link to="">Tv Shows</Link>
              </li>
            </ul>
          </nav>
        </div>
        <UserMenu />
      </StyledHeader>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: SELECTORS.USER.getUser(state),
});

export default connect(mapStateToProps)(Header);
