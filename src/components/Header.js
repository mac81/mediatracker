import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {font, color} from '../styles/typography';
import UserMenu from './UserMenu';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: radial-gradient(circle at 20% 50%, rgb(4, 28, 44) 0%, rgb(53, 81, 102) 100%);
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
    return (
      <StyledHeader>
        <div className="left">
          <img src="http://reforgedstudios.com/site/templates/images/media/reforged_logo_horizontal_white_text.png" />
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

export default Header;
