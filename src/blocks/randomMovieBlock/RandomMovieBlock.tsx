import AboutMovieButton from "../../components/buttons/AboutMovieButton";
import FavoriteButton from "../../components/buttons/FavoriteButton";
import RefreshRandomMovieButton from "../../components/buttons/RefreshRandomMovieButton";
import TrailerButton from "../../components/buttons/TrailerButton";
import MovieInfoBlockLoader from "../../components/loaders/movieInfo/MovieInfoLoader";
import MovieInfoModule from "../../components/movieInfoModule/MovieInfoModule";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRandomMovie } from "../../store/slices/randomMovie";
import { RootState } from "../../store/store";
import { FC, useEffect } from 'react';


const RandomMovieBlock: FC = () => {
    const dispatch = useAppDispatch();
    const { movie, loading } = useAppSelector((state: RootState) => state.randomFilm);

    useEffect(() => {
        dispatch(getRandomMovie());
    }, []);

    if (loading) {
        return <MovieInfoBlockLoader isContainer={false} />;
    }

    return (
        movie && <MovieInfoModule movie={movie}>
            <TrailerButton movie={movie} />
            <AboutMovieButton movieId={`${movie.id}`} />
            <FavoriteButton movieId={`${movie.id}`} />
            <RefreshRandomMovieButton />
        </MovieInfoModule>
    );
};


export default RandomMovieBlock;