import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { typeMovie } from '../types/types';


export const selectFavorites = (state: RootState) => state.favorites.favorites;

export const isMovieInFavorites = createSelector(
    selectFavorites,
    (_, movieId: number) => movieId,
    (favorites, movieId) => favorites?.find((movie: typeMovie) => movie.id === movieId) !== undefined
);