import type { CastMember, CompleteMovie, Movie } from "@/types/movie";
import type {
  TMDBCastMember,
  TMDBMovie,
  TMDBMovieDetail,
} from "@/features/movies/types/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const imageUrl = (path: string | null, size: "w185" | "w500" | "original") =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const mapTMDBMovie = (movie: TMDBMovie): Movie => ({
  id: movie.id,
  title: movie.title,
  description: movie.overview,
  releaseDate: movie.release_date,
  rating: movie.vote_average,
  poster: imageUrl(movie.poster_path, "w500"),
  backdrop: imageUrl(movie.backdrop_path, "original"),
});

export const mapTMDBMovieDetail = (movie: TMDBMovieDetail): CompleteMovie => ({
  ...mapTMDBMovie(movie),
  genres: movie.genres.map((genre) => genre.name),
  runtime: movie.runtime,
});

export const mapTMDBCastMember = (actor: TMDBCastMember): CastMember => ({
  id: actor.id,
  name: actor.name,
  character: actor.character,
  avatar: imageUrl(actor.profile_path, "w185"),
});
