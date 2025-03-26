import style from "./style.module.scss";
import MovieInfoModule from "../../components/movieInfoModule/MovieInfoModule";
import TrailerButton from "../../components/buttons/TrailerButton";
import FavoriteButton from "../../components/buttons/FavoriteButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getMovie } from "../../store/slices/movie";
import { RootState } from "../../store/store";
import convertLanguage from "../../utils/convertLanguages/convertLanguage";
import formatBudget from "../../utils/formatBudget";
import MovieInfoBlockLoader from "../../components/loaders/movieInfo/MovieInfoLoader";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";


const MoviePage: FC = () => {
    const plug = "Неизвестно";
    const params = useParams();
    const movieId = Number(params.movieId);

    if (!movieId || isNaN(movieId)) {
        return <div>Invalid movie ID</div>;
    }

    const dispatch = useAppDispatch();
    const { movie, loading } = useAppSelector((state: RootState) => state.movie);

    useEffect(() => {
        dispatch(getMovie(movieId));
    }, [movieId]);

    if (loading) {
        return <MovieInfoBlockLoader isContainer={true} />;
    }

    return (
        movie && <div className={style.container}>
            <div className={style.movieInfoBlock}>
                <MovieInfoModule movie={movie}>
                    <TrailerButton movie={movie} />
                    <FavoriteButton movieId={`${movie.id}`} />
                </ MovieInfoModule>
            </div>
            <div className={style.movieDescription}>
                <div className={`flex flex__column ${style.description}`}>
                    <h2 className={style.description__title}>О фильме</h2>
                    <div className={`flex ${style.description__key}`}>
                        <div className={`flex ${style.description__param}`}>Язык оригинала<span className={style.description__dots} /></div>
                        <div className={style.description__value}>{convertLanguage(movie.language)}</div>
                    </div>
                    <div className={`flex ${style.description__key}`}>
                        <div className={`flex ${style.description__param}`}>Бюджет<span className={style.description__dots} /></div>
                        <div className={style.description__value}>{formatBudget(movie.budget, movie.language)}</div>
                    </div>
                    <div className={`flex ${style.description__key}`}>
                        <div className={`flex ${style.description__param}`}>Выручка<span className={style.description__dots} /></div>
                        <div className={style.description__value}>{formatBudget(movie.revenue, movie.language)}</div>
                    </div>
                    <div className={`flex ${style.description__key}`}>
                        <div className={`flex ${style.description__param}`}>Режиссёр<span className={style.description__dots} /></div>
                        <div className={style.description__value}>{movie.director || plug}</div>
                    </div>
                    <div className={`flex ${style.description__key}`}>
                        <div className={`flex ${style.description__param}`}>Продакшен<span className={style.description__dots} /></div>
                        <div className={style.description__value}>{movie.production || plug}</div>
                    </div>
                    <div className={`flex ${style.description__key}`}>
                        <div className={`flex ${style.description__param}`}>Награды<span className={style.description__dots} /></div>
                        <div className={style.description__value}>{movie.awardsSummary || plug}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default MoviePage