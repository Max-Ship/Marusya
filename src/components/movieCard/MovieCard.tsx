import style from './style.module.scss';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';


interface MovieCardProps {
    movieId: string;
    posterUrl: string;
    movieTitle: string;
}

const MovieCard: FC<MovieCardProps> = memo(({ movieId, posterUrl, movieTitle }) => {
    return (
        <Link className={`flex ${style.card}`} to={`/movies/${movieId}`}>
            <img src={posterUrl} alt={movieTitle} className={style.cardPoster} title={movieTitle} />
        </Link >
    );
});


export default MovieCard;
