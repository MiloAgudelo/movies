import { useQuery } from "@tanstack/react-query";

import { getMovieCast } from "../api/movies.api";

export function useMovieCast(id: number) {
  return useQuery({
    queryKey: ["movie", id, "cast"],
    queryFn: () => getMovieCast(id),
    enabled: Number.isInteger(id) && id > 0,
    staleTime: 1000 * 60 * 60,
  });
}
