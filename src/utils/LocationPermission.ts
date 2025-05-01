import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {LOCATION_PERMISSION_STATUS} from './Constants';

export async function requestAndroidLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return PermissionsAndroid.RESULTS.GRANTED;
    } else {
      console.log('location permission denied', granted);
      if (LOCATION_PERMISSION_STATUS) {
        Alert.alert(
          'Permission Denied',
          'Please go to your app settings and enable location permission.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('cancel press'),
            },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return granted;
      }
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function checkIosLocationPermision() {
  try {
    // await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
    //   console.log(result)
    // });
    const permission = check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(async result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            return RESULTS.UNAVAILABLE;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            const res = await request(
              PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            ).then(result => {
              return result;
            });
            console.log(res);
            return res;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            return RESULTS.LIMITED;
          case RESULTS.GRANTED:
            return result;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            return RESULTS.BLOCKED;
        }
      })
      .catch((error: any) => {
        // â€¦
      });
    return permission;
  } catch (e) {}
}

export async function checkAndroidLocationPermision() {
  try {
    const permission = check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(async result => {
        console.log('#. result ::>> ', result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            // return RESULTS.UNAVAILABLE;
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            // return RESULTS.DENIED;
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            // return RESULTS.LIMITED;
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            // return result;
            console.log('The permission is allowed: ', result);
            break;
          case RESULTS.BLOCKED:
            // return RESULTS.BLOCKED;
            console.log('The permission is denied and not requestable anymore');
            break;
        }
        return result;
      })
      .catch(error => {
        console.error('#. LocationPermission error :: ', error);
      });
    return permission;
  } catch (e) {}
}

export async function permissionCheck() {
  let permission =
    Platform.OS == 'ios'
      ? await checkIosLocationPermision()
      : await checkAndroidLocationPermision();
  return permission;
}
