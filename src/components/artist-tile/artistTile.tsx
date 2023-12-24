import React, { useContext, useState } from 'react';
import './artistTile.css';
import { Artist } from '../../types/Artist';
import { getAge } from '../../helpers';
import { CurrentArtistContext } from '../../contexts/Artist';
import { generateURL } from '../../constants/urls';
import { useNavigate } from 'react-router-dom';

type ArtistTileProps = {
  artist: Artist;
  onSelected?: Function;
}

function ArtistTile(props: ArtistTileProps) {
  const { artist } = props;
  const artistContext = useContext(CurrentArtistContext);
  const navigate = useNavigate();
  
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if (props.onSelected) {
      props.onSelected(e)
    }
  }


  async function deleteArtist(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, artist: Artist) {
    console.log(artist.artistId);
    e.stopPropagation();
    e.preventDefault();

    if (artist.songCount > 0) {
      alert(`Cannot delete ${artist.artistName} as there are ${artist.songCount} songs associated to this artist. Clear associated Songs and try again.`)
    } else {
      const isConfirmed = window.confirm(`Are you you wish to delete ${artist.artistName}?`)
      if (isConfirmed) {
        await (await fetch(generateURL('delete_artist_by_id', { "var_artistId": artist.artistId?.toString() }))).json()
          .then((c: {message: string}) => {
            alert(`Successfully deleted - ${artist.artistName}`);
            window.location.reload();
          }).catch((_err) => {
            alert(`An error occurred while deleting ${artist.artistName}`);
            // console.log('Ohhhh noooo', err)
          })
      }
    }
  }

  return (
    <div className={`artist ${artist.artistId === artistContext.artist?.id ? '--isSelected' : ''}`} onClick={(e) => handleClick(e)}>
      <h3 className='artist-name'>{artist.artistName}</h3>
      <div className='artist-nationality'>Nationality: {artist.nationality}</div>
      <div className='artist-age'>Age: {artist.dateOfBirth ? getAge(artist.dateOfBirth) : '-'}</div>
      <div className='artist-songs-count'>Number of Songs: {artist.songCount ?? 0}</div>
      <div className='artist-actions'>
        <button type="button" onClick={(e) => { deleteArtist(e, artist) }}>Delete</button>
      </div>
    </div>
  );
}

export default ArtistTile;
