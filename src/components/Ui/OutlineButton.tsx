import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../constants/colors";

interface Props {
  icon: any | string;
  children: ReactNode;
  onPress: () => void;
  color: string;
  disable: boolean;
}

export default function OutlineButton({
  icon,
  children,
  onPress,
  color,
  disable,
}: Props) {
  return (
    <Pressable
      android_ripple={{ color }}
      disabled={disable}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedButton,
        { borderColor: color },
      ]}
    >
      <Ionicons name={icon} size={18} color={color} />
      <Text style={{ color }}>{children}</Text>
    </Pressable>
  );
}

OutlineButton.defaultProps = {
  color: colors.primary500,
  disable: false,
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 5,
    padding: 3,
    borderWidth: 2,
    borderStyle: "solid",
    flex: 1,
    height: 40,
  },
  pressedButton: {
    opacity: 0.7,
  },
});
