import type { Movie, MovieDetail, TmdbMovie, TmdbMovieDetail } from "../types";

const IMAGE_URL = "https://image.tmdb.org/t/p";

export function toImageUrl(path: string | null, size: "w185" | "w500" | "original") {
  return path ? `${IMAGE_URL}/${size}${path}` : null;
}

export function toMovie(movie: TmdbMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    releaseDate: movie.release_date,
    rating: movie.vote_average,
    poster: toImageUrl(movie.poster_path, "w500"),
    backdrop: toImageUrl(movie.backdrop_path, "original"),
  };
}

export function toMovieDetail(movie: TmdbMovieDetail): MovieDetail {
  return {
    ...toMovie(movie),
    genres: movie.genres.map((genre) => genre.name),
    runtime: movie.runtime,
  };
}
