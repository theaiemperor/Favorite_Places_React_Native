import { Place } from "../models/place";
import PlaceForm from "../components/Places/PlaceForm";
import { View } from "react-native";
import { updatePlace } from "../store/database";

export default function EditPlace({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  function submit(data: Place) {
    updatePlace(data).then(() => {
      navigation.navigate("Detail", { id: data.id });
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <PlaceForm submitPlace={submit} previousPlace={route.params} />
    </View>
  );
}
