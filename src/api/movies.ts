import { genresSchema, movieFilterParams, movieSchema, moviesSchema, typeGenres, typeMovie, typeMovies } from "../types/types";
import API from "./url";


const buildMovieUrl = (params: movieFilterParams): string => {
    const url = new URL('/movie', 'https://example.com');
    if (params.count !== undefined) {
        url.searchParams.append('count', String(params.count));
    }
    if (params.page !== undefined) {
        url.searchParams.append('page', String(params.page));
    }
    if (params.title !== undefined) {
        url.searchParams.append('title', params.title);
    }
    if (params.genre !== undefined) {
        url.searchParams.append('genre', params.genre);
    }
    return url.pathname + url.search;
};

export const fetchMovies = async (filters: movieFilterParams): Promise<typeMovies> => {
    try {
        const url = buildMovieUrl(filters);
        const response = await API.get(url);
        return moviesSchema.parse(response.data);
    } catch (error: any) {
        console.error("Ошибка при получении фильмов с фильтрацией:", error);
        throw error;
    }
};

export const fetchTop10Movies = async (): Promise<typeMovies> => {
    try {
        const response = await API.get('/movie/top10');
        return moviesSchema.parse(response.data);
    } catch (error: any) {
        console.error("Ошибка при получении топ-10 фильмов:", error);
        throw error;
    }
};

export const fetchMovieById = async (movieId: number): Promise<typeMovie> => {
    try {
        const response = await API.get(`/movie/${movieId}`);
        return movieSchema.parse(response.data);
    } catch (error: any) {
        console.error(`Ошибка при получении фильма с ID ${movieId}:`, error);
        throw error;
    }
};

export const fetchGenres = async (): Promise<typeGenres> => {
    try {
        const response = await API.get('/movie/genres');
        return genresSchema.parse(response.data);
    } catch (error: any) {
        console.error("Ошибка при получении списка жанров:", error);
        throw error;
    }
};

export const fetchRandomMovie = async (): Promise<typeMovie> => {
    try {
        const response = await API.get('/movie/random');
        return movieSchema.parse(response.data);
    } catch (error: any) {
        console.error("Ошибка при получении случайного фильма:", error);
        throw error;
    }
};
