import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../../models/place";

interface Props {
  place: Place;
  onPress: () => void;
}

export default function PlaceItem({ place, onPress }: Props) {
  function addressWrapper(address: string, wrapLength = 80) {
    if (address.length < wrapLength) {
      return address;
    } else {
      return address.slice(0, wrapLength) + "...";
    }
  }

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#9daee7" }}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.imageContainer}>
        {place.imageUri === "" ? (
          <Text style={[styles.imageText, styles.image]}>No Image</Text>
        ) : (
          <Image source={{ uri: place.imageUri }} style={styles.image} />
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {place.title || "----- Not added ------"}
        </Text>
        <Text numberOfLines={3} style={styles.address}>
          {addressWrapper(place.address) || "----- Not added -----"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    margin: 5,
    backgroundColor: "#5d87e3",
    height: 90,
  },
  pressed: {
    opacity: 0.8,
  },
  imageContainer: {
    width: 90,
    height: 75,
    borderRadius: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 3,
  },
  imageText: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "solid",
    fontSize: 25,
  },
  textContainer: {
    marginHorizontal: 5,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 7,
  },
  address: {
    fontStyle: "italic",
    width: "65%",
  },
});
