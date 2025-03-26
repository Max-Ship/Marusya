import { ReactNode } from "react";
import { z } from "zod";


//Authorization
export const userSchema = z.object({
    email: z.string().email({ message: "Некорректный email" }),
    password: z.string().min(8, { message: "Пароль должен содержать минимум 8 символов" }),
    name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
    surname: z.string().min(2, { message: "Фамилия должна содержать минимум 2 символа" })
});
export type typeUser = z.infer<typeof userSchema>;

export const loginSchema = userSchema.pick({ email: true, password: true });
export type typeLogin = z.infer<typeof loginSchema>;

export const profileSchema = z.object({
    favorites: z.array(z.string()),
    surname: z.string(),
    name: z.string(),
    email: z.string().email(),
});
export type typeProfile = z.infer<typeof profileSchema>;


//Movies and genres
export const genresSchema = z.array(z.string());
export type typeGenres = z.infer<typeof genresSchema>;

export const movieIdSchema = z.object({
    id: z.string(),
});
export type typeMovieId = z.infer<typeof movieIdSchema>;

export const movieSchema = z.object({
    id: z.number(),
    title: z.string(),
    originalTitle: z.union([z.string(), z.null()]),
    language: z.string(),
    releaseYear: z.union([z.number(), z.null()]),
    releaseDate: z.union([z.string(), z.null()]),
    genres: z.array(z.string()).default([]),
    plot: z.string(),
    runtime: z.number(),
    budget: z.union([z.string(), z.null()]),
    revenue: z.union([z.string(), z.null()]),
    homepage: z.union([z.string(), z.null()]),
    status: z.union([z.string(), z.null()]),
    posterUrl: z.union([z.string(), z.null()]),
    backdropUrl: z.union([z.string(), z.null()]),
    trailerUrl: z.string(),
    trailerYouTubeId: z.string(),
    tmdbRating: z.number(),
    searchL: z.union([z.string(), z.null()]),
    keywords: z.array(z.string()).default([]),
    countriesOfOrigin: z.array(z.string()).default([]),
    languages: z.array(z.string()).default([]),
    cast: z.array(z.string()).default([]),
    director: z.union([z.string(), z.null()]),
    production: z.union([z.string(), z.null()]),
    awardsSummary: z.union([z.string(), z.null()]),
});
export type typeMovie = z.infer<typeof movieSchema>;

export const moviesSchema = z.array(movieSchema);
export type typeMovies = z.infer<typeof moviesSchema>;


export interface movieFilterParams {
    count?: number;
    page?: number;
    title?: string;
    genre?: string;
}

export interface UtilsDict {
    [key: string]: [string, string]
}

export interface MovieListProps {
    children: ReactNode;
    styleProp: string;
}

export interface LoaderProps {
    isContainer: boolean
}