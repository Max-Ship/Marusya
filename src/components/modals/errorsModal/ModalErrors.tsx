import { FC, useEffect, useState } from 'react';
import style from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { clearMovie } from '../../../store/slices/movie';
import { clearMovies } from '../../../store/slices/moviesByGenre';
import { clearGenres } from '../../../store/slices/genres';
import { clearFavorites } from '../../../store/slices/favorites';
import { clearRandomMovie } from '../../../store/slices/randomMovie';
import { clearTop10Movies } from '../../../store/slices/top10Movies';
import { clearSearch } from '../../../store/slices/searchMovies';
import { clearAuth, resetAuthForm } from '../../../store/slices/authState';


interface ModalErrorProp {
    inModal?: boolean
}


const ModalErrors: FC<ModalErrorProp> = ({ inModal }) => {
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<string[]>([]);
    const [modalError, setModalError] = useState("")

    const genresError = useAppSelector((state: RootState) => state.genres.error);
    const moviesError = useAppSelector((state: RootState) => state.movies.error);
    const movieError = useAppSelector((state: RootState) => state.movie.error);
    const favoritesError = useAppSelector((state: RootState) => state.favorites.error);
    const randomFilmError = useAppSelector((state: RootState) => state.randomFilm.error);
    const topFilmsError = useAppSelector((state: RootState) => state.topFilms.error);
    const searchError = useAppSelector((state: RootState) => state.search.error);
    const authError = useAppSelector((state: RootState) => state.auth.error);

    const isOpen = useAppSelector((state) => state.auth.isAuthModalOpen);

    useEffect(() => {
        if (!isOpen) {
            const allErrors = [
                ...(genresError ? [genresError] : []),
                ...(moviesError ? [moviesError] : []),
                ...(movieError ? [movieError] : []),
                ...(favoritesError ? [favoritesError] : []),
                ...(randomFilmError ? [randomFilmError] : []),
                ...(topFilmsError ? [topFilmsError] : []),
                ...(searchError ? [searchError] : []),
                ...(authError ? [authError] : []),
            ];

            const uniqueErrors = [...new Set(allErrors)];
            setErrors(uniqueErrors);
        } else {
            authError && setModalError(authError);
        }

    }, [genresError, moviesError, movieError, favoritesError, randomFilmError, topFilmsError, searchError, authError]);

    const handleClose = () => {
        if (errors.length === 0) return;
        setErrors([]);
        if (genresError) dispatch(clearGenres());
        if (moviesError) dispatch(clearMovies());
        if (movieError) dispatch(clearMovie());
        if (favoritesError) dispatch(clearFavorites());
        if (randomFilmError) dispatch(clearRandomMovie());
        if (topFilmsError) dispatch(clearTop10Movies());
        if (searchError) dispatch(clearSearch());
        if (authError && !isOpen) dispatch(clearAuth());
    }

    const handleResetModal = () => {
        dispatch(resetAuthForm())
        setModalError("")
    }

    if (errors.length === 0 && !modalError) return null;

    return (((errors.length > 0 && !inModal) || inModal)
        &&
        <div className={`flex flex__column ${style.modalOverlay}`}>
            <div className={`flex flex__column ${style.errorContainer}`}>
                <ul>
                    {isOpen ? (
                        <li className={style.errorText}>{modalError}</li>
                    ) : (
                        errors.map((error, index) => (
                            <li className={style.errorText} key={index}>
                                {error}
                            </li>
                        ))
                    )}
                </ul>
                <button className={style.errorBtnClose} onClick={inModal ? handleResetModal : handleClose}>Ok</button>
            </div>
        </div>
    );
};


export default ModalErrors;
