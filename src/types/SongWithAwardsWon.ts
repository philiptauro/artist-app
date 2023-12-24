import { Award } from "./Award";
import { AwardsWon } from "./AwardsWon";
import { Song } from "./Song";

export type SongWithAwardsWon = Song & {
    awards: (Award & AwardsWon)[]
}