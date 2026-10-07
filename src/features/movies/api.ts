import type {
  Movie,
  MovieDetail,
  TmdbMovie,
  TmdbMovieDetail,
  TmdbPage,
} from "./types";

const BASE_URL = process.env.EXPO_PUBLIC_MOVIE_DB_URL;
const TOKEN = process.env.EXPO_PUBLIC_MOVIE_DB_TOKEN;
const IMAGE_URL = "https://image.tmdb.org/t/p";

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

function imageUrl(path: string | null, size: "w500" | "original") {
  return path ? `${IMAGE_URL}/${size}${path}` : null;
}

function toMovie(movie: TmdbMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    releaseDate: movie.release_date,
    rating: movie.vote_average,
    poster: imageUrl(movie.poster_path, "w500"),
    backdrop: imageUrl(movie.backdrop_path, "original"),
  };
}

export async function getMoviesByCategory(category: MovieCategory) {
  const data = await tmdbFetch<TmdbPage<TmdbMovie>>(`/movie/${category}`);
  return data.results.map(toMovie);
}

export async function getMovieById(id: number): Promise<MovieDetail> {
  const movie = await tmdbFetch<TmdbMovieDetail>(`/movie/${id}`);
  return {
    ...toMovie(movie),
    genres: movie.genres.map((genre) => genre.name),
    runtime: movie.runtime,
  };
}
