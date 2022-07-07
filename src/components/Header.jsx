import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.connectedPerson = this.connectedPerson.bind(this);
    this.state = {
      name: '',
    };
  }

  connectedPerson() {
    const { name } = this.state;
    if (!name) {
      getUser().then((user) => {
        this.setState({ name: user });
      });
      return <Loading />;
    }
    return <p>{ name.name }</p>;
  }

  render() {
    return (
      <div>
        <header data-testid="header-component">
          <div data-testid="header-user-name">
            {this.connectedPerson()}
          </div>
          <div>
            <Link data-testid="link-to-search" to="/search">search</Link>
            <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
            <Link data-testid="link-to-profile" to="/profile">profile</Link>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
