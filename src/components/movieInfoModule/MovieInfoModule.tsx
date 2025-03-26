import style from "./style.module.scss";
import styleRatingProps from "./styleRatingProps.module.scss";
import Rating from '../rating/Rating';
import formatRuntime from "../../utils/formatTime";
import { typeMovie } from "../../types/types";
import { FC, ReactNode } from 'react';
import generateDefaultPosterUrl from "../../utils/generateDefaultPosterUrl";


interface MovieInfoModuleProps {
    movie: typeMovie | null;
    children: ReactNode[];
}

const MovieInfoModule: FC<MovieInfoModuleProps> = ({ movie, children }) => {
    return (
        movie && <div className={`flex ${style.movie__container}`}>
            <div className={`flex flex__column ${style.movie__leftBlock}`}>
                <div className={`flex ${style.movie__descr}`}>
                    <Rating styleProps={`${styleRatingProps.rating}`} rating={`${movie.tmdbRating}`} />
                    <p className={style.movie__descrText}>{movie.releaseYear}</p>
                    <p className={style.movie__descrText}>{movie.genres.join(", ")}</p>
                    <p className={style.movie__descrText}>{movie.runtime && formatRuntime(movie.runtime)}</p>
                </div>

                <h1 className={style.movie__title}>{movie.title}</h1>
                <p className={style.movie__plot}>{movie.plot}</p>

                <div className={`flex ${style.movie__wrapButton} ${children.length === 4 ? style.trailerMain : style.trailerMovie}`}>
                    {children}
                </div>
            </div>
            <div className={`flex flex__column ${style.movie__rightBlock}`}>
                <img src={movie.backdropUrl ? movie.backdropUrl : generateDefaultPosterUrl(680, 552, movie.title)} alt="" />
            </div>
        </div>
    );
};


export default MovieInfoModule;