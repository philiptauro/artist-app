import { useEffect, useState } from 'react';
import './songDetail.css';
import { generateURL } from '../../constants/urls';
import { SongWithAwardsWon } from '../../types/SongWithAwardsWon';
import { Award } from '../../types/Award';

type SongDetailsProps = {
  selectedSongId?: number;
}

function SongDetail(props: SongDetailsProps) {
  const { selectedSongId } = props
  const [songDetail, setSongDetail] = useState<SongWithAwardsWon | undefined>(undefined);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (selectedSongId) {
      (async () => {
        setIsLoading(true);
        setSongDetail(undefined);
        await (await fetch(generateURL('songs_with_awards_won', { 'var_songId': props.selectedSongId?.toString() || '' }))).json()
          .then((songs_with_awards_won: SongWithAwardsWon) => {
            setSongDetail(songs_with_awards_won);
          }).catch(() => {
            setIsError(true);
          }).finally(() => {
            setIsLoading(false);
          });
      })()
    }
    console.log('selectedSongId', selectedSongId);
  }, [selectedSongId]);
  return (<>
    {
      isLoading && <div> Loading Song Details...</div>
    }
    {
      !isLoading && isError && <div>An error occurred while loading song detail. Please try later.</div>
    }
    {
      !isLoading && !isError && (
        <div className="song-detail">
          <div className="song-detail-lyrics" dangerouslySetInnerHTML={{ __html: songDetail?.lyrics?.replace(/\n/g, "<br />") ?? '' }} />
          <div className="song-detail-others">
            {!!songDetail?.releaseDate &&
              <>
                <br />
                <div className='song-detail-release'>
                  <span className='song-detail-key'>Release Date: </span>
                  <span className='song-detail-value'>
                    {new Date(songDetail?.releaseDate?.toString()).toLocaleDateString('en-CA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </>
            }
            <br />
            <div className='song-detail-composers'>
              <span className='song-detail-key'>Composers: </span>
              <span className='song-detail-value'>{songDetail?.composers ?? '-'}</span>
            </div>
            <br />
            <div className='song-detail-producers'>
              <span className='song-detail-key'>Producers: </span>
              <span className='song-detail-value'>{songDetail?.producers ?? '-'}</span>
            </div>
            {!!songDetail?.awards && songDetail.awards.length > 0 && (
              <>
                <br />
                <div className='song-detail-awards'>
                  <span className='song-detail-key'>Awards:</span>
                  {
                    songDetail?.awards.map((award: Award, index) => (<div key={index} className='song-detail-value'>{award.awardName} - {award.organization} - {award.year}</div>))
                  }
                </div>
              </>)}
          </div>
        </div>
      )}
  </>
  );
}

export default SongDetail;
