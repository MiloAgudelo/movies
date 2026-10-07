export type Movie = {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  rating: number;
  poster: string | null;
  backdrop: string | null;
};

export type MovieDetail = Movie & {
  genres: string[];
  runtime: number | null;
};

export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type TmdbMovieDetail = TmdbMovie & {
  genres: { id: number; name: string }[];
  runtime: number | null;
};

export type TmdbPage<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type Cast = {
  id: number;
  name: string;
  character: string;
  avatar: string | null;
};

export type TmdbCast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type TmdbCredits = {
  id: number;
  cast: TmdbCast[];
};
