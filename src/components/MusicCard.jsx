import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favorita: false,
      carregando: false,
    };
  }

changeCheckBox = async ({ target }) => {
  const { albumId } = this.props;
  const { checked } = target;
  this.setState({ favorita: checked, carregando: true });
  if (checked) {
    await addSong(albumId);
    this.setState({ carregando: false });
}
}

render() {
  const { albumId } = this.props;
  const { favorita, carregando } = this.state;
  return (
    <>
      {carregando && <Loading />}
      {!carregando && (
        <div>
          <li>{ albumId.trackName }</li>
          <audio data-testid="audio-component" src={ albumId.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorita">
            Favorita
            <input
              type="checkbox"
              checked={ favorita }
              name="favorita"
              onChange={ this.changeCheckBox }
              id="favorita"
              data-testid={ `checkbox-music-${albumId.trackId}`}
            />
          </label>
        </div>
      )}
    </>
  );
}
}

MusicCard.propTypes = {
  albumId: PropTypes.object,
}.isRequired;

export default MusicCard;
