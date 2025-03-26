import { movieIdSchema, moviesSchema, typeMovies } from "../types/types";
import API from "./url";


export const fetchFavorites = async (): Promise<typeMovies> => {
    try {
        const response = await API.get('/favorites');
        return moviesSchema.parse(response.data);
    } catch (error: any) {
        console.error("Ошибка при получении избранных фильмов:", error);
        throw error;
    }
};

export const addFavoriteMovie = async (movieId: string): Promise<void> => {
    try {
        movieIdSchema.parse({ id: movieId });

        const formData = new URLSearchParams();
        formData.append('id', movieId);

        await API.post('/favorites', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    } catch (error: any) {
        console.error(`Ошибка при добавлении фильма с ID ${movieId} в избранное:`, error);
        throw error;
    }
};

export const deleteFavoriteMovie = async (movieId: string): Promise<void> => {
    try {
        movieIdSchema.parse({ id: movieId });
        await API.delete(`/favorites/${movieId}`)
        console.log(`Фильм с ID ${movieId} успешно удален из избранное`);
    } catch (error: any) {
        console.error("Ошибка при удалении фильма из избранного:", error);
        throw error;
    }
}
