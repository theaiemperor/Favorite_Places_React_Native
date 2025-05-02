import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "../../constants/colors";
import ImagePicker from "../NativeFunctions/ImagePicker";
import LocationPicker from "../NativeFunctions/LocationPicker";
import OutlineButton from "../Ui/OutlineButton";
import { Place } from "../../models/place";
import { coordinatesToAddress } from "../../Utility/MapUtil";
import { mapObject } from "../../constants/Types";

interface Props {
  submitPlace: (data: Place) => void;
  previousPlace?: Place;
}

export default function PlaceForm({ submitPlace, previousPlace }: Props) {
  const [title, setTile] = useState(previousPlace?.title || "");
  const [takenImage, setTakenImage] = useState(previousPlace?.imageUri || "");
  const [location, setLocation] = useState<mapObject>(
    previousPlace?.location || { longitude: null, latitude: null }
  );
  const [disableButton, setDisableButton] = useState(false);

  async function submitData() {
    if (
      title !== "" ||
      takenImage !== "" ||
      (location.longitude && location.latitude)
    ) {
      setDisableButton(true);

      let address = "";
      if (location.longitude && location.latitude) {
        address = await coordinatesToAddress(location);
      }
      const data = new Place(
        previousPlace?.id || 0,
        title,
        takenImage,
        address,
        location
      );
      submitPlace(data);
    } else {
      Alert.alert("Empty Data", "Please complete at lease one from above.");
    }
    setDisableButton(false);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Title</Text>

        <TextInput
          value={title}
          onChangeText={setTile}
          style={styles.input}
          placeholder="Enter Place Name"
        />

        <View style={styles.imagePicker}>
          <ImagePicker takenImage={takenImage} setTakenImage={setTakenImage} />
        </View>

        <View style={styles.locationPicker}>
          <LocationPicker location={location} setLocation={setLocation} />
        </View>

        <View style={styles.save}>
          <OutlineButton
            icon="save"
            onPress={submitData}
            color="#80b66e"
            disable={disableButton}
          >
            Save to your place
          </OutlineButton>
        </View>
      </View>
    </ScrollView>
  );
}

PlaceForm.defaultProps = {
  previousPlace: {
    title: "",
    imageUri: "",
    location: { latitude: null, longitude: null },
    address: "",
    id: Math.random().toString(),
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    flex: 1,
  },
  title: {
    color: colors.primary50,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.primary50,
    borderRadius: 3,
    paddingHorizontal: 5,
    minHeight: 30,
  },
  imagePicker: {
    marginVertical: 10,
  },
  locationPicker: {
    paddingVertical: 5,
  },
  save: {
    marginTop: 20,
  },
});
