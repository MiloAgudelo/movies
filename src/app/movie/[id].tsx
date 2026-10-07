import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useMovie } from "@/features/movies/hooks/useMovie";

export default function MovieDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: movie, isPending, isError } = useMovie(Number(id));

  if (isPending) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </Screen>
    );
  }

  if (isError || !movie) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.errorText}>No se pudo cargar la película</Text>
          <Pressable onPress={() => router.back()} style={styles.button}>
            <Text style={styles.buttonText}>Volver</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  const year = movie.releaseDate?.slice(0, 4);
  const details = [
    year,
    movie.runtime ? `${movie.runtime} min` : null,
    movie.genres.join(", "),
  ].filter(Boolean);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={movie.backdrop ?? movie.poster}
        contentFit="cover"
        transition={250}
        style={styles.backdrop}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Volver"
        onPress={() => router.back()}
        style={[styles.backButton, { top: insets.top + 8 }]}
      >
        <SymbolView
          name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
          tintColor={colors.text}
          size={24}
        />
      </Pressable>

      <View style={styles.content}>
        <Image
          source={movie.poster}
          contentFit="cover"
          transition={250}
          style={styles.poster}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>★ {movie.rating.toFixed(1)}</Text>
        {details.length > 0 && (
          <Text style={styles.details}>{details.join(" · ")}</Text>
        )}

        <Text style={styles.sectionTitle}>Sinopsis</Text>
        <Text style={styles.description}>
          {movie.description || "Sin sinopsis disponible."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    textAlign: "center",
    color: colors.text,
  },
  button: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: colors.accentStrong,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    fontWeight: "600",
    color: colors.text,
  },
  backdrop: {
    width: "100%",
    height: 250,
    backgroundColor: colors.surface,
  },
  backButton: {
    position: "absolute",
    left: 16,
    borderRadius: 999,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 8,
  },
  content: {
    marginTop: -60,
    paddingHorizontal: 20,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  title: {
    marginTop: 16,
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
  },
  rating: {
    marginTop: 8,
    color: colors.accent,
  },
  details: {
    marginTop: 4,
    color: colors.textMuted,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  description: {
    marginTop: 8,
    lineHeight: 24,
    color: colors.textMuted,
  },
});
