import style from "./style.module.scss"
// import MovieList from "../../components/movieList/MovieList";
import MovieCard from "../../components/movieCard/MovieCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import generateDefaultPosterUrl from "../../utils/generateDefaultPosterUrl";
import translateGenres from "../../utils/translateGenres/translateGenres";
import { getMoviesByGenre } from "../../store/slices/moviesByGenre";
import { fetchMovies } from "../../api/movies";
import { typeMovies } from "../../types/types";
import BtnLoader from "../../components/loaders/btnLoader/BtnLoader";
import GenresMoviesLoader from "../../components/loaders/genreMovies/GenresMoviesLoader";
import { FC, memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList";



const FilmsByGenrePage: FC = () => {
    const params = useParams();
    const genreVolue = params.genre;

    const [renderMoves, setRenderMovies] = useState<typeMovies>([])
    const [page, setPage] = useState(1);
    const count = 30;
    const [hasMorePages, setHasMorePages] = useState<boolean>(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const dispatch = useAppDispatch();
    const { movies, loading } = useAppSelector((state: RootState) => state.movies);

    if (!genreVolue) {
        return <div>Invalid genreVolue</div>;
    }

    useEffect(() => {
        dispatch(getMoviesByGenre({ genre: genreVolue }));
    }, [genreVolue]);

    useEffect(() => {
        const sortedMovies = [...movies].sort((a, b) => b.tmdbRating - a.tmdbRating);
        setRenderMovies(sortedMovies);
    }, [movies]);

    const handleShowMore = async () => {
        setIsFetchingMore(true);
        const nextPage = page + 1;
        setPage(nextPage);
        const response = await fetchMovies({ genre: genreVolue, page: nextPage, count });
        await setRenderMovies((prevMovies) => [...prevMovies, ...response]);
        setHasMorePages(response.length === count);
        setIsFetchingMore(false);
    };

    if (loading) {
        return <GenresMoviesLoader />;
    }

    return (
        <div className={style.container}>
            <div className={`flex flex__column ${style.genreMovie}`}>
                <h1 className={`flex ${style.genreMovie__title}`}>
                    <Link className={`flex ${style.genreMovie__linkBack}`} to={"/genres"}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs>
                                <clipPath id="clip1_809">
                                    <rect id="icon / chevron" rx="0.000000" width="39.000000" height="39.000000" transform="translate(0.500000 0.500000)" fill="white" fillOpacity="0" />
                                </clipPath>
                            </defs>
                            <rect id="icon / chevron" rx="0.000000" width="39.000000" height="39.000000" transform="translate(0.500000 0.500000)" fill="currentColor" fillOpacity="0" />
                            <g clipPath="url(#clip1_809)">
                                <path id="Vector" d="M18.04 20L26.29 28.25L23.93 30.6L13.33 20L23.93 9.39L26.29 11.75L18.04 20Z" fill="currentColor" fillOpacity="1.000000" fillRule="nonzero" />
                            </g>
                        </svg>
                    </Link>
                    {translateGenres(genreVolue)[0]}
                </h1>
                <MovieList styleProp={style.genreMovie__listByGenre}>
                    {renderMoves.map(movie => (
                        <li className={style.genreMovie__card} key={movie.id}>
                            <MovieCard movieId={`${movie.id}`} movieTitle={movie.title} posterUrl={movie.posterUrl ? movie.posterUrl : generateDefaultPosterUrl(224, 336, movie.title)} />
                        </li>
                    ))}
                </MovieList>
                {hasMorePages && (
                    <button className={`${style.genreMovie__moreMovie} ${style.btnPaddingUI}`} onClick={handleShowMore} disabled={isFetchingMore}>
                        {isFetchingMore && <BtnLoader />}
                        Показать ещё
                    </button>
                )}
            </div>
        </div>
    )
}


export default memo(FilmsByGenrePage);