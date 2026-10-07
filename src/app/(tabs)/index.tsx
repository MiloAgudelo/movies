import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { MainSlideshow } from "@/components/movies/MainSlideshow";
import { MovieHorizontalList } from "@/components/movies/MovieHorizontalList";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useMovies } from "@/features/movies/hooks/useMovies";

export default function HomeScreen() {
  const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } =
    useMovies();

  if (nowPlayingQuery.isPending) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.loadingText}>Cargando películas...</Text>
        </View>
      </Screen>
    );
  }

  if (nowPlayingQuery.isError) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.errorTitle}>No pudimos cargar las películas.</Text>
          <Text style={styles.errorText}>
            Revisa tu conexión y la configuración de TMDB.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Text style={styles.title}>Películas App</Text>
      <MainSlideshow movies={nowPlayingQuery.data} />
      <MovieHorizontalList title="Populares" movies={popularQuery.data ?? []} />
      <MovieHorizontalList
        title="Mejor calificadas"
        movies={topRatedQuery.data ?? []}
      />
      <MovieHorizontalList
        title="Próximamente"
        movies={upcomingQuery.data ?? []}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 12,
    color: colors.textMuted,
  },
  errorTitle: {
    textAlign: "center",
    fontSize: 18,
    color: colors.text,
  },
  errorText: {
    marginTop: 8,
    textAlign: "center",
    color: colors.textMuted,
  },
  title: {
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
  },
});
