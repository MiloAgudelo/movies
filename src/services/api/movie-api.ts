const BASE_URL = process.env.EXPO_PUBLIC_MOVIE_DB_URL;
const TOKEN = process.env.EXPO_PUBLIC_MOVIE_DB_TOKEN;

export async function movieApi<T>(path: string): Promise<T> {
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
