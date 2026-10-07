import type {
  TmdbCredits,
  TmdbMovie,
  TmdbMovieDetail,
  TmdbPage,
} from "../types";
import { toCast, toMovie, toMovieDetail } from "./movie.mapper";

const BASE_URL = process.env.EXPO_PUBLIC_MOVIE_DB_URL;
const TOKEN = process.env.EXPO_PUBLIC_MOVIE_DB_TOKEN;

export type MovieCategory = "now_playing" | "popular" | "top_rated" | "upcoming";

async function tmdbFetch<T>(path: string): Promise<T> {
  if (!BASE_URL || !TOKEN) {
    throw new Error(
      "Faltan EXPO_PUBLIC_MOVIE_DB_URL o EXPO_PUBLIC_MOVIE_DB_TOKEN en .env",
    );
  }

  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${BASE_URL}${path}${separator}language=es-MX`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB respondió ${response.status} en ${path}`);
  }

  return response.json();
}

export async function getMoviesByCategory(category: MovieCategory) {
  const data = await tmdbFetch<TmdbPage<TmdbMovie>>(`/movie/${category}`);
  return data.results.map(toMovie);
}

export async function getMovieById(id: number) {
  const movie = await tmdbFetch<TmdbMovieDetail>(`/movie/${id}`);
  return toMovieDetail(movie);
}

export async function getMovieCast(id: number) {
  const data = await tmdbFetch<TmdbCredits>(`/movie/${id}/credits`);
  return data.cast.map(toCast);
}
