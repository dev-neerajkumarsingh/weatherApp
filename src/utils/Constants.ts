import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const WEATHER_API_KEY = 'dcba12927750dec5ae9b4a837cd72886';
export const MAPS_ENDPOINT = "https://nominatim.openstreetmap.org/reverse?format=json&lat=";

export let LOCATION_PERMISSION_STATUS = false;
