import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface LoaderProps {
  visible: boolean;
}

export const Loader: React.FC<LoaderProps> = ({visible = false}) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} statusBarTranslucent transparent>
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    </Modal>
  );
};
