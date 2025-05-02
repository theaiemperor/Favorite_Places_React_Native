import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({
  name,
  color,
  size,
  onPress,
}: {
  name: any;
  color: string;
  size: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: 35,
    height: 35,
  },
  pressed: {
    opacity: 0.8,
  },
});
