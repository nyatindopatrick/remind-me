import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import Todo from "./components/Todo";

const LOCATION_TASK_NAME = "background-location-task";

const App = () => {
    const [region, setRegion] = useState(null);
    const [error, setError] = useState('');
    const mapRef = useRef(null);

    const getLocationAsync = async () => {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            enableHighAccuracy: true,
            distanceInterval: 1,
            timeInterval: 5000
        });

        return Location.watchPositionAsync(
            {
                enableHighAccuracy: true,
                distanceInterval: 1,
                timeInterval: 10000
            },
            newLocation => {
                let { coords } = newLocation;
                let newRegion = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.045,
                    longitudeDelta: 0.045
                };
                setRegion(newRegion);
            },
            error => console.log(error)
        );
    };

    useEffect(() => {
        const askPermission = async () => {
            const { status } = await Location.requestBackgroundPermissionsAsync();

            if (status === "granted") {
                getLocationAsync();
            } else {
                setError("Locations services needed");
            }
            // userId = (await AsyncStorage.getItem("userId")) || "none";
            // userName = (await AsyncStorage.getItem("userName")) || "none";
        };

        askPermission();
    }, []);

    const handleRegionChange = (newRegion) => {
        console.log(newRegion);
    };

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={region}
                showsCompass={true}
                showsUserLocation={true}
                rotateEnabled={true}
                ref={mapRef}
                style={{ flex: 1 }}
                onRegionChangeComplete={handleRegionChange}
            />
            <Todo/>
        </View>
    );
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.log(error);
        return;
    }
    if (data) {
        const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;
        // const userId = (await AsyncStorage.getItem("userId")) || "none";

        // axios({
        //     method: "POST",
        //     url: "http://000.000.0.000/phpServer/ajax.php",
        //     data: {
        //         action: "saveLocation",
        //         userId: userId,
        //         lat,
        //         long
        //     }
        // });
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

export default App;