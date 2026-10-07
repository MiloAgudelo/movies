export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  rating: number;
  poster: string | null;
  backdrop: string | null;
}

export interface CompleteMovie extends Movie {
  genres: string[];
  runtime: number | null;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  avatar: string | null;
}
