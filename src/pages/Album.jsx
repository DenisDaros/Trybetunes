import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      array: [],
      artista: '',
      album: '',
    };
  }

  componentDidMount() {
    this.bringingId();
  }

  bringingId = async () => {
    const { match: { params: { id } } } = this.props;
    const idAlbum = await getMusics(id);
    this.setState({ artista: idAlbum[0].artistName,
      album: idAlbum[0].collectionName,
      array: idAlbum });
    console.log(idAlbum);
  }

  render() {
    const { artista, album, array } = this.state;
    return (
      <>
        <div data-testid="page-album">
          <Header />
          Album
        </div>
        <p data-testid="artist-name">{ artista }</p>
        <p data-testid="album-name">{ album }</p>
        <div>
          { array.map((elem, index) => (
            index > 0
             && <MusicCard key={ index } albumId={ elem } />))}
        </div>
      </>);
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
