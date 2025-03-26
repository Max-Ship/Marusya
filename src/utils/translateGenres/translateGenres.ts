import { genresList } from "./genresList";


function translateGenres(genre: string): string[] {
    const result = genresList[genre] ? genresList[genre] : [genre, ""]
    return result
}


export default translateGenres;