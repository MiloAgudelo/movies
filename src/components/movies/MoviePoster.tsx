import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

import { colors } from "@/constants/colors";
import type { Movie } from "@/features/movies/types";

type Props = {
  movie: Pick<Movie, "id" | "poster" | "title">;
  smallPoster?: boolean;
  onPress?: () => void;
};

export function MoviePoster({ movie, smallPoster = false, onPress }: Props) {
  const width = smallPoster ? 95 : 170;
  const height = smallPoster ? 140 : 250;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${movie.title}`}
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Image
        source={movie.poster}
        contentFit="cover"
        transition={250}
        style={[styles.image, { width, height }]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
});
