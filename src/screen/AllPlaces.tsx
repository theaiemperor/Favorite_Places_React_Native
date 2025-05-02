import { View } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { Place } from "../models/place";
import { useIsFocused } from "@react-navigation/native";
import { fetchData } from "../store/database";

export default function AllPlaces({ route }: { route: any }) {
  const [placesList, setPlacesList] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchData();
      setPlacesList(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={placesList} />;
}
