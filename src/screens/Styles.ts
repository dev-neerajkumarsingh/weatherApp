import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const Styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#191C20',
  },
  btn: {
    position: 'absolute',
    bottom: 25,
    right: 15,
    width: 56,
    height: 56,
    borderRadius: 27,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
});
