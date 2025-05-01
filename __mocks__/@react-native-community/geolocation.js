export default {
  getCurrentPosition: jest.fn().mockImplementation(
    success => success({coords: {latitude: 51.5074, longitude: 0.1278}}), // London coordinates
  ),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
};
