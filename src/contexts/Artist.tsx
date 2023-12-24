import { createContext } from "react";
import { Artist } from "../types/Artist";

export type ArtistContext = {
    artist: Artist | null,
    updateContext: (artist: Artist) => void
}

export const defaultArtist: ArtistContext = {
    artist: null,
    updateContext: (artist: Artist) => {
        defaultArtist.artist = artist;
    }
}

export const CurrentArtistContext = createContext<ArtistContext>(defaultArtist);

