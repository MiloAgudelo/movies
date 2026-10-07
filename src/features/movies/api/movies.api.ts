import { movieApi } from "@/services/api/movie-api";

import type {
  TmdbCredits,
  TmdbMovie,
  TmdbMovieDetail,
  TmdbPage,
} from "../types";
import { toCast, toMovie, toMovieDetail } from "./movie.mapper";

export type MovieCategory = "now_playing" | "popular" | "top_rated" | "upcoming";

export async function getMoviesByCategory(category: MovieCategory) {
  const data = await movieApi<TmdbPage<TmdbMovie>>(`/movie/${category}`);
  return data.results.map(toMovie);
}

export async function getMovieById(id: number) {
  const movie = await movieApi<TmdbMovieDetail>(`/movie/${id}`);
  return toMovieDetail(movie);
}

export async function getMovieCast(id: number) {
  const data = await movieApi<TmdbCredits>(`/movie/${id}/credits`);
  return data.cast.map(toCast);
}
