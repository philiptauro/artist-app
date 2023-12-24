import './artistContainer.css';
import ArtistList from '../artist-list/artistList';
import ArtistDetail from '../artist-detail/artistDetail';
import { ArtistContext, CurrentArtistContext, defaultArtist } from '../../contexts/Artist';
import { useState } from 'react';
import { Artist } from '../../types/Artist';


function ArtistContainer() {
  const [artist, setArtist] = useState<Artist|null>(null);

  const selectedArtist: ArtistContext = {
    artist,
    updateContext: setArtist
  }
  return (
    <CurrentArtistContext.Provider value={selectedArtist}>
      <div className="artist-container">
        <ArtistList  />
        {
          !!selectedArtist.artist && <ArtistDetail />
        }
      </div>
    </CurrentArtistContext.Provider>
  );
}

export default ArtistContainer;
