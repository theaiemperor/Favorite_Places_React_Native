import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Place } from "../../models/place";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function PlacesList({ places }: { places: Place[] }) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  function handleClick(id: number) {
    navigation.navigate("Detail", { id: id });
  }

  if (places.length === 0) {
    return <Text style={styles.notFount}>No Places found</Text>;
  }

  return (
    <FlatList
      data={places}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onPress={() => {
            handleClick(item.id);
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  notFount: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    margin: 10,
  },
});
