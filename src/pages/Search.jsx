import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.inputChange = this.inputChange.bind(this);
    this.changeLogin = this.changeSearching.bind(this);
    this.state = {
      pesquisar: '',
      disabled: true,
    };
  }

  inputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.changeSearching());
  }

  changeSearching() {
    const { pesquisar } = this.state;
    const numeroMagico = 2;
    this.setState({ disabled: pesquisar.length < numeroMagico });
  }

  render() {
    const { disabled, pesquisar } = this.state;
    return (
      <>
        <h1>Search</h1>
        <div data-testid="page-search">
          <Header />
        </div>
        <div>
          <form>
            <input
              type="text"
              name="pesquisar"
              data-testid="search-artist-input"
              value={ pesquisar }
              onChange={ this.inputChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              name="Pesquisar"
              disabled={ disabled }
              onClick={ this.changeSearching }
            >
              Pesquisar
            </button>
          </form>
        </div>

      </>);
  }
}

export default Search;
