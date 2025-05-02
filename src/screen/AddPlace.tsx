import { Alert, View } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/place";
import { insert } from "../store/database";

export default function AddPlace({ navigation }: { navigation: any }) {
  function submitPlace(data: Place) {
    insert(data)
      .then((item) => {
        navigation.navigate("AllPlaces", {
          ...data,
          id: item,
        });
      })
      .catch((_) => {
        Alert.alert(
          "Place not added",
          "Due to some problem your place is not added. please try again."
        );
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <PlaceForm submitPlace={submitPlace} />
    </View>
  );
}
