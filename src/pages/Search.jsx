import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      pesquisar: '',
      disabled: true,
      retornoArtista: [],
      carregando: false,
      nomeArtista: '',
    };
  }

  inputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value, nomeArtista: value },
      () => {
        const numeroMagico = 2;
        this.setState({ disabled: value.length < numeroMagico });
      });
  }

  changeSearching = async () => {
    const { pesquisar } = this.state;
    console.log(pesquisar);
    this.setState({ carregando: true });
    const artista = await searchAlbumsAPI(pesquisar);
    this.setState({ retornoArtista: artista, carregando: false },
      () => this.setState({ pesquisar: '' }));
  }

  arrayEmpty = () => {
    const { retornoArtista } = this.state;
    if (retornoArtista.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
  }

  render() {
    const { disabled, pesquisar, retornoArtista, carregando, nomeArtista } = this.state;
    return (
      <>
        {carregando && <Loading />}
        {!carregando && (
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
                  type="button"
                  data-testid="search-artist-button"
                  name="Pesquisar"
                  disabled={ disabled }
                  onClick={ this.changeSearching }
                >
                  Pesquisar
                </button>

                <div>
                  { this.arrayEmpty() }
                  {/* <p>{`Resultado de álbuns de:${nomeArtista}`}</p> */}
                  {retornoArtista.length > 0
                  && <p>{`Resultado de álbuns de: ${nomeArtista}`}</p>}
                  {
                    retornoArtista.map((index) => (
                      <li key={ index.artistId }>
                        <Link
                          data-testid={ `link-to-album-${index.collectionId}` }
                          to={ `/album/${index.collectionId}` }
                        >
                          {index.collectionName}
                        </Link>

                      </li>))
                  }
                </div>
              </form>
            </div>

          </>
        )}
      </>);
  }
}

export default Search;
