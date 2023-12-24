import React, { useContext, useEffect, useState } from 'react';
import './artistDetail.css';
import { generateURL } from '../../constants/urls';
import SongDetail from '../song-detail/songDetail';
import { SongsByArtist } from '../../types/SongsByArtist';
import { CurrentArtistContext } from '../../contexts/Artist';
import { Link, useParams } from 'react-router-dom';

function ArtistDetail() {
  const [songs, setSongs] = useState<SongsByArtist[]>([]);
  const [selectedSongId, setSelectedSongId] = useState<number | undefined>(undefined);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedArtistId, setSelectedArtistId] = useState<string | undefined>();
  let artist = useContext(CurrentArtistContext).artist;
  let { artistId } = useParams();

  useEffect(() => {
    artistId = artistId ? artistId : artist?.artistId.toString() ?? undefined;
    setSelectedArtistId(artistId);
    if (artistId) {
      (async () => {
        setIsLoading(true);
        setSongs([]);
        await (await fetch(generateURL('songs_by_artist', { 'var_artistId': artistId }))).json()
          .then((songs: SongsByArtist[]) => {
            setSongs(songs);
            if (songs.length > 0) {
              setSelectedSongId(songs[0].songId)
            }
          }).catch(() => {
            setIsError(true);
          }).finally(() => {
            setIsLoading(false);
          });
      })()
    }
  }, [artist]);

  function onSongSelected(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSongId(parseInt(e.currentTarget.value));
  }

  return (
    <div className="artist-detail">
      {
        isLoading && <div> Loading Artist Details...</div>
      }
      {
        !isLoading && isError && <div>An error occurred while loading artist details. Please try later.</div>
      }
      {
        !isLoading && !isError && (songs && songs.length > 0) && (
          <>
            <select className='artist-songs' onChange={(e) => {onSongSelected(e)}}>
              {
                songs.map((song: SongsByArtist) => (
                  <option key={song.songId} value={song.songId}>{song.title}</option>
                ))
              }
            </select>
            <br /><br />
            <Link to={`/artist/${selectedArtistId}`} target='_blank'>Open Specific Artist Detail page</Link>
            <br /><br />
            <SongDetail selectedSongId={selectedSongId}/>
          </>
        )
      }
      {
        !isLoading && !isError && (artist && songs.length === 0) && <div>No songs by {artist?.artistName} to show!</div>
      }

    </div>
  );
}

export default ArtistDetail;
