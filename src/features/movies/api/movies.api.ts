import type {
  TMDBCredits,
  TMDBMovie,
  TMDBMovieDetail,
  TMDBPage,
} from "@/features/movies/types/tmdb";
import { movieApi } from "@/services/api/movie-api";

import {
  mapTMDBCastMember,
  mapTMDBMovie,
  mapTMDBMovieDetail,
} from "./movie.mapper";

export type MovieCategory = "now_playing" | "popular" | "top_rated" | "upcoming";

export async function getMoviesByCategory(category: MovieCategory) {
  const data = await movieApi<TMDBPage<TMDBMovie>>(`/movie/${category}`);
  return data.results.map(mapTMDBMovie);
}

export async function getMovieById(id: number) {
  const movie = await movieApi<TMDBMovieDetail>(`/movie/${id}`);
  return mapTMDBMovieDetail(movie);
}

export async function getMovieCast(id: number) {
  const data = await movieApi<TMDBCredits>(`/movie/${id}/credits`);
  return data.cast.map(mapTMDBCastMember);
}
