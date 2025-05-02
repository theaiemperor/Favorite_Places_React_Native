import { useEffect, useState } from "react";
import { Place } from "../models/place";
import { fetchDetails, remove } from "../store/database";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import OutlineButton from "../components/Ui/OutlineButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function PlaceDetails({ route }: { route: any }) {
  const [place, setPlace] = useState<Place>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<{ Map: any; AllPlaces: any; "Edit Place": any }>
    >();

  useEffect(() => {
    const id = route.params.id;

    async function getDetail() {
      const data = await fetchDetails(id);
      if (data === null) {
        Alert.alert(
          "Place Not Found",
          "The Place you are looking for is not found."
        );
        navigation.navigate("AllPlaces");
      } else {
        setPlace(data);
      }
    }

    getDetail();
  }, [route]);

  function mapHandler() {
    navigation.navigate("Map", {
      ...place?.location,
      readOnly: true,
    });
  }

  function editHandler() {
    navigation.navigate("Edit Place", { ...place });
  }

  function deleteHandler(id: number) {
    remove(id).then(() => {
      navigation.navigate("AllPlaces");
    });
  }

  return (
    <>
      {place && (
        <View style={[styles.container]}>
          <View style={styles.dataContainer}>
            <View>
              {place.imageUri === "" ? (
                <Text style={[styles.imageText, styles.border, styles.image]}>
                  There is not any image to preview
                </Text>
              ) : (
                <Image source={{ uri: place.imageUri }} style={styles.image} />
              )}
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {place.title || "----- Not added ------"}
              </Text>
              <Text style={styles.address}>
                {place.address || "----- Not added -----"}
              </Text>
            </View>
          </View>

          <View>
            <View style={styles.editActions}>
              <OutlineButton
                icon="trash"
                onPress={() => deleteHandler(place.id)}
                color="#e36c6c"
              >
                Delete Place
              </OutlineButton>

              <OutlineButton icon="create" onPress={editHandler}>
                Edit Place
              </OutlineButton>
            </View>
            {place.address !== "" && (
              <View style={styles.mapButton}>
                <OutlineButton icon="map" onPress={mapHandler}>
                  View on map
                </OutlineButton>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: "3%",
    gap: 10,
    height: "95%",
  },
  dataContainer: {
    flex: 1,
    backgroundColor: colors.primary50,
    borderRadius: 10,
  },
  imageText: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    alignSelf: "center",
    verticalAlign: "middle",
    padding: 10,
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  border: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderStyle: "solid",
  },
  textContainer: {
    marginVertical: 10,
    padding: 10,
    paddingBottom: 20,
    flex: 2,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  address: {
    fontSize: 20,
    padding: 5,
  },
  editActions: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginVertical: 10,
  },
  mapButton: {
    height: 50,
    marginVertical: 20,
  },
});
