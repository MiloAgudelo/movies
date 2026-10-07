import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { ActorCard } from "@/components/movie/ActorCard";
import { colors } from "@/constants/colors";
import { useMovieCast } from "@/features/movies/hooks/useMovieCast";

type Props = {
  movieId: number;
};

export function MovieCast({ movieId }: Props) {
  const { data: cast, isPending, isError } = useMovieCast(movieId);

  if (isError) return null;

  return (
    <View className="mt-6">
      <Text className="mb-3 px-5 text-lg font-semibold text-white">Reparto</Text>
      {isPending ? (
        <ActivityIndicator color={colors.accent} />
      ) : (
        <FlatList
          horizontal
          data={cast.slice(0, 15)}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => <ActorCard actor={item} />}
          ListEmptyComponent={
            <Text className="px-2 text-zinc-400">Sin información de reparto.</Text>
          }
        />
      )}
    </View>
  );
}
