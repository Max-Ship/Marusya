import style from "./style.module.scss";
import MovieList from '../../components/movieList/MovieList';
import MovieCard from '../../components/movieCard/MovieCard';
import { RootState } from '../../store/store';
import { getTop10Movies } from '../../store/slices/top10Movies';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import generateDefaultPosterUrl from '../../utils/generateDefaultPosterUrl';
import ListLoader from "../../components/loaders/listLoader/ListLoader";
import { FC, useEffect } from 'react';


interface RatingProps {
    number: string;
}

const LabelTopMovie: FC<RatingProps> = ({ number }) => {
    return (
        <div className={`flex flex_column ${style.labelTop}`}>
            {number}
        </div>
    )
}

const Top10MoviesBlock: FC = () => {
    const dispatch = useAppDispatch();
    const { movies, loading } = useAppSelector((state: RootState) => state.topFilms);

    useEffect(() => {
        dispatch(getTop10Movies());
    }, [dispatch]);

    if (loading) {
        return <ListLoader />
    }

    return (
        <div className={`flex flex__column ${style.top}`}>
            <h2 className={style.topTitle}>Топ 10 фильмов</h2>
            <MovieList styleProp={style.topList}>
                {movies.map((movie, index) => (
                    <li className={style.topCardMovie} key={movie.id}>
                        <LabelTopMovie number={String(index + 1)} />
                        <MovieCard movieId={`${movie.id}`} movieTitle={movie.title} posterUrl={movie.posterUrl ? movie.posterUrl : generateDefaultPosterUrl(224, 336, movie.title)} />
                    </li>
                ))}
            </MovieList>
        </div>
    );
};

export default Top10MoviesBlock;