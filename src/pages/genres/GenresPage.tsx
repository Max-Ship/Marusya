import style from './style.module.scss';
import GenreCard from '../../components/genreCard/GenreCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { getGenres } from '../../store/slices/genres';
import GenresLoader from '../../components/loaders/genres/GenresLoader';
import { FC, useEffect } from 'react';
import MovieList from '../../components/movieList/MovieList';


const GenresPage: FC = () => {
    const dispatch = useAppDispatch();
    const { genres, loading } = useAppSelector((state: RootState) => state.genres);

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    if (loading) {
        return <GenresLoader />;
    }

    return (
        <div className={style.container}>
            <div className={`flex ${style.genresPage}`}>
                <h1 className={style.genresPage__title}>Жанры фильмов</h1>
                <MovieList styleProp={`${style.genresPage__genresFlex}`}>
                    {genres.map((genre, index) => (
                        <li className={style.genresPage__genreCard} key={index}>
                            <GenreCard genre={genre} />
                        </li>
                    ))}
                </MovieList>
            </div>
        </div>
    );
};


export default GenresPage;
