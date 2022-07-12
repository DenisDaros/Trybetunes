import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { albumId } = this.props;
    return (
      <>
        <li>{ albumId.trackName }</li>
        <audio data-testid="audio-component" src={ albumId.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>

      </>
    );
  }
}

MusicCard.propTypes = {
  albumId: PropTypes.object,
}.isRequired;

export default MusicCard;
