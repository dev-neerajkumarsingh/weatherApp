import React from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type TextSizeStyles = {
  text: (color: string, fontSize: number) => StyleProp<TextStyle>;
};

// Create a function to generate the styles
const createTextSizeStyles = (
  color: string,
  fontSize: number,
): StyleProp<TextStyle> => ({
  color: color,
  fontSize: fontSize,
  lineHeight: fontSize + 5,
});

const styles: TextSizeStyles = {
  text: (color: string, fontSize: number) =>
    createTextSizeStyles(color, fontSize),
};

interface CommonTextProps {
  text: string;
  fontSize: number;
  moreStyle?: StyleProp<TextStyle>;
  isDarkModeEnabled: boolean;
}

export const CommonText: React.FC<CommonTextProps> = ({
  text = '',
  fontSize = 16,
  moreStyle = {},
  isDarkModeEnabled = false,
}) => {
  return (
    <Text
      style={[
        styles.text(isDarkModeEnabled ? Colors.white : Colors.black, fontSize),
        moreStyle,
      ]}>
      {text}
    </Text>
  );
};
