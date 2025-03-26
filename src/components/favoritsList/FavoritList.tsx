import style from "./style.module.scss";
import ButtonClose from "../buttonClose/ButtonClose";
import MovieCard from "../movieCard/MovieCard";
import MovieList from "../movieList/MovieList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteFavoriteMovieAsync, fetchFavoritesAsync } from "../../store/slices/favorites";
import generateDefaultPosterUrl from "../../utils/generateDefaultPosterUrl";
import ListLoader from "../loaders/listLoader/ListLoader";
import { FC, memo, useEffect } from "react";


const FavoritsList: FC = memo(() => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchFavoritesAsync());
    }, [dispatch]);

    const favorites = useAppSelector((state) => state.favorites.favorites);
    const loading = useAppSelector((state) => state.favorites.loading);


    if (loading === 'pending') {
        return <ListLoader />;
    }

    const handleDeleteFavorite = async (movieId: string) => {
        await dispatch(deleteFavoriteMovieAsync(movieId)).unwrap();
        await dispatch(fetchFavoritesAsync()).unwrap();

    };

    return (
        <MovieList styleProp={style.listCardFavorite}>
            {favorites?.map(movie => (
                <li className={style.favoritesCardMovie} key={movie.id}>
                    <ButtonClose style={style.favoritesBtnDel} onClose={async () => await handleDeleteFavorite(movie.id.toString())} />
                    <MovieCard movieId={movie.id.toString()} posterUrl={movie.posterUrl ? movie.posterUrl : generateDefaultPosterUrl(224, 336, movie.title)} movieTitle={movie.title} />
                </li>
            ))}
        </MovieList>
    )
});


export default FavoritsList;