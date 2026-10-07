import { useQuery } from "@tanstack/react-query";

import { getMovieById } from "../api";

export function useMovie(id: number) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
    enabled: Number.isInteger(id) && id > 0,
    staleTime: 1000 * 60 * 60,
  });
}
