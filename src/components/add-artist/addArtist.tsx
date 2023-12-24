import { FormEvent, useRef, useState } from 'react';
import './addArtist.css';
import { Link, useNavigate } from 'react-router-dom';
import { generateURL } from '../../constants/urls';

function AddArtist() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [artistName, setArtistName] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>(today);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    await (await fetch(generateURL('create_artist', {
      "var_artistName": artistName,
      "var_nationality": nationality,
      "var_birthDate": birthDate,
    }))).json()
      .then((c: { message: string }) => {
        const isConfirmed = window.confirm(`Successfully added - ${artistName}. Do you wish to add another artist?`)
        if(!isConfirmed) {
          navigate('/');
        } else {
          setArtistName('');
          setNationality('');
          setBirthDate(today);
        }
      }).catch((_err) => {
        alert(`An error occurred while adding the artist - ${artistName}`);
      }).finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className="add-artist">
      <Link to="/">Back</Link>
      <form onSubmit={(e) => onSubmit(e)} id="add-artist-form">
        <label>
          Artist Name:
          <input type="text" name="artistName" value={artistName} required onChange={(e) => { setArtistName(e.currentTarget.value) }} />
        </label>
        <label>
          Nationality:
          <input type="text" name="nationality" value={nationality} required onChange={(e) => { setNationality(e.currentTarget.value) }} />
        </label>
        <label>
          Date of Birth:
          <input type="date" id="birthDate" value={birthDate} name="birthDate" required max={today}
          onChange={(e) => { setBirthDate(e.currentTarget.value) }} />
        </label>
        <button type="submit" disabled={isLoading}>Add Artist</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
}

export default AddArtist;
