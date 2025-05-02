import { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { PermissionStatus } from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import OutlineButton from "../Ui/OutlineButton";
import { mapObject } from "../../constants/Types";

interface Props {
  location: mapObject;
  setLocation: (data: mapObject) => void;
}

export default function LocationPicker({ location, setLocation }: Props) {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const navigation = useNavigation<NativeStackNavigationProp<{ Map: any }>>();
  const isFocused = useIsFocused();
  const route = useRoute<any>();

  async function verifyPermissions() {
    if (!locationPermissionInformation) {
      return false;
    } else if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } else if (
      locationPermissionInformation.status === PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Permission Not Granted",
        "Give access to your current location."
      );
      return false;
    } else return true;
  }

  async function locationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;
    const location = await getCurrentPositionAsync();
    setLocation(location.coords);
  }

  function mapHandler() {
    navigation.navigate("Map", {
      readOnly: false,
      navigateScreen: route.name,
    });
  }

  useEffect(() => {
    if (isFocused && route.params) {
      if (route.params.location) {
        setLocation(route.params.location as mapObject);
        return;
      }

      setLocation(route.params as mapObject);
    }
  }, [isFocused, route]);

  return (
    <View style={styles.container}>
      {location.latitude !== null && location.longitude !== null && (
        <MapView
          style={styles.mapPreview}
          scrollEnabled={false}
          initialRegion={{
            latitude: location.latitude as number,
            longitude: location.longitude as number,
            latitudeDelta: 0.8499,
            longitudeDelta: 0.2824,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude as number,
              longitude: location.longitude as number,
            }}
          />
        </MapView>
      )}

      <View style={styles.buttonContainer}>
        <OutlineButton icon="location" onPress={locationHandler}>
          Current Location
        </OutlineButton>

        <Text style={styles.orText}>Or</Text>

        <OutlineButton icon="map" onPress={mapHandler}>
          Pick from Map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  mapPreview: {
    width: "100%",
    height: 200,
  },
  orText: {
    fontSize: 20,
    color: "white",
  },
});
