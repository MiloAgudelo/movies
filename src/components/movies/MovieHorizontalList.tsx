import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { MoviePoster } from "@/components/movies/MoviePoster";
import { colors } from "@/constants/colors";
import type { Movie } from "@/features/movies/types";

type Props = {
  title: string;
  movies: Movie[];
};

export function MovieHorizontalList({ title, movies }: Props) {
  const router = useRouter();

  if (!movies.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MoviePoster
            movie={item}
            smallPoster
            onPress={() => router.push(`/movie/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },
  list: {
    paddingHorizontal: 8,
  },
});
