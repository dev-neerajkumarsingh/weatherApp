import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  StatusBar,
  Platform,
  Pressable,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { SearchIcon } from '../assets/index';
import {windowWidth} from '../utils/Constants';

type ContainerStyles = {
  container: (isDarkMode: boolean) => StyleProp<ViewStyle>;
};

// Create a function to generate the styles
const createContainerStyles = (
  isDarkMode: boolean,
): StyleProp<ViewStyle | TextStyle> => ({
  backgroundColor: isDarkMode ? '#191C20' : Colors.white,
  //   borderColor: isDarkMode ? 'gray' : Colors.black,
  color: isDarkMode ? Colors.white : Colors.black,
});

const containerStyles: ContainerStyles = {
  container: (isDarkMode: boolean) => createContainerStyles(isDarkMode),
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 70 : (StatusBar.currentHeight ?? 10) + 20,
    alignSelf: 'center',
    width: windowWidth / 1.11,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

interface SearchBoxProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  isDarkModeEnabled: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({value, onChangeText, onSearch, isDarkModeEnabled}) => {
  return (
    <View style={[styles.container, containerStyles.container(isDarkModeEnabled)]}>
      <TextInput
        style={{width: '83%', backgroundColor: isDarkModeEnabled ? '#191C20' : Colors.white, marginLeft: 5, color: isDarkModeEnabled ? Colors.white : Colors.black}}
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter City Name"
        placeholderTextColor={'#808080'}
      />
      <Pressable testID="get-weather-button" style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}} onPress={onSearch}>
        <SearchIcon width={18} height={18} color={isDarkModeEnabled ? Colors.white : Colors.black} />
      </Pressable>
    </View>
  );
};
