import style from './style.module.scss';
import translateGenres from '../../utils/translateGenres/translateGenres';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import generateDefaultPosterUrl from '../../utils/generateDefaultPosterUrl';


interface GenreCardProps {
    genre: string;
}

const GenreCard: FC<GenreCardProps> = memo(({ genre }) => {
    const [genreTitle, srcGenrePoster] = translateGenres(genre)

    return (
        <Link className={`flex ${style.genreCard}`} to={`/genres/${genre}`}>
            <div className={style.genreCard__posterWrap}>
                <img src={srcGenrePoster ? srcGenrePoster : generateDefaultPosterUrl(290, 220, genreTitle)} alt={`Poster for genre`} className={style.genreCard__poster} />
            </div>

            <div className={style.genreCard__genre}>{genreTitle}</div>
        </Link>
    );
});


export default GenreCard;
