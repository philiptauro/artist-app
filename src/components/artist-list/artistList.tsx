import { useContext, useEffect, useState } from 'react';
import './artistList.css';
import { Artist } from '../../types/Artist';
import ArtistTile from '../artist-tile/artistTile';
import { generateURL } from '../../constants/urls';
import { CurrentArtistContext } from '../../contexts/Artist';
import { Link } from 'react-router-dom';


function ArtistList() {
  const artistContext = useContext(CurrentArtistContext);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setArtists([]);
      await (await fetch(generateURL('artists_with_song_count'))).json()
        .then((artists: Artist[]) => {
          const updatedArtists = artists.map((artist: Artist) => {
            return { ...artist, artistId: artist.id}
          });
          setArtists(updatedArtists);
        }).catch(() => {
          setIsError(true);
        }).finally(() => {
          setIsLoading(false);
        });
    })()
  }, []);

  function updateArtist(e: Event, artist: Artist) {
    console.log(artist);
    artistContext.updateContext(artist);
  }

  return (
    <div className="artist-list">
      <div>
        <h2>Artists</h2>
        <Link to="artist/add">Add Artist</Link>
        {
          isLoading && <div> Loading Artists...</div>
        }
        {
          !isLoading && isError && <div>An error occurred while loading artists. Please try later.</div>
        }
        {
          !isLoading && !isError && (artists && artists.length > 0) && (
            <div>
              {
                artists.map(artist => (
                  <ArtistTile key={artist.artistId} artist={artist} onSelected={(e: Event) => updateArtist(e, artist) } />
                ))
              }
            </div>
          )
        }
        {
          !isLoading && !isError && (artists.length === 0) && <div>No artists to show!</div>
        }
      </div>
    </div>
  );
}

export default ArtistList;
