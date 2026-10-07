import { Image } from "expo-image";
import { Text, View } from "react-native";

import type { Cast } from "@/features/movies/types";

type Props = {
  actor: Cast;
};

export function ActorCard({ actor }: Props) {
  return (
    <View className="w-24 px-2">
      <View className="overflow-hidden rounded-2xl bg-zinc-800">
        <Image
          source={actor.avatar}
          contentFit="cover"
          transition={250}
          style={{ width: 80, height: 120 }}
        />
      </View>
      <Text numberOfLines={2} className="mt-2 text-sm font-semibold text-white">
        {actor.name}
      </Text>
      <Text numberOfLines={2} className="text-xs text-zinc-400">
        {actor.character}
      </Text>
    </View>
  );
}
