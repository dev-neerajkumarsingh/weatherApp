import {Platform, Alert, PermissionsAndroid, Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  LOCATION_PERMISSION_STATUS as initialLocationPermissionStatus,
  MAPS_ENDPOINT,
} from '../Constants';
import {
  permissionCheck,
  requestAndroidLocationPermission,
} from '../LocationPermission';
import {RESULTS} from 'react-native-permissions';
import {useTryCatch} from './useTryCatch';
import axios from 'axios';

export const useLocationHook = {
  requestLocationPermission: async () => {
    const getAddressBasedOnLatLong = async (lat: number, lon: number) => {
      const url = `${MAPS_ENDPOINT}${lat}&lon=${lon}`;
      const {data, error} = await useTryCatch(axios.get(url));

      if (error) return {error: error?.message, data: null};
      if (data?.data) return {error: null, data: data?.data};

      return {error: 'Unknown error', data: null};
    };

    let locationPermissionStatus = initialLocationPermissionStatus;

    try {
      const getCurrentLocation = () =>
        new Promise<{lat: number; lon: number}>((resolve, reject) => {
          Geolocation.getCurrentPosition(
            pos => {
              const lat = pos.coords.latitude;
              const lon = pos.coords.longitude;
              resolve({lat, lon});
            },
            error => {
              reject(error.message);
            },
            {
              enableHighAccuracy: false,
              timeout: 15000,
              maximumAge: 10000,
            },
          );
        });

      if (Platform.OS === 'android') {
        let granted: any = await permissionCheck();

        if (granted === RESULTS.DENIED && !locationPermissionStatus) {
          granted = await requestAndroidLocationPermission();
          locationPermissionStatus = true;
        } else if (granted === RESULTS.DENIED && locationPermissionStatus) {
          Alert.alert(
            'Permission Denied',
            'Please go to your app settings and enable location permission.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
          return {error: 'Permission denied', data: null};
        }

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const {lat, lon} = await getCurrentLocation();
          return await getAddressBasedOnLatLong(lat, lon);
        }
      }

      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        const {lat, lon} = await getCurrentLocation();
        return await getAddressBasedOnLatLong(lat, lon);
      }
    } catch (err: any) {
      return {error: err?.toString?.() ?? 'Unknown error', data: null};
    }

    return {error: 'Location not retrieved', data: null};
  },
};
