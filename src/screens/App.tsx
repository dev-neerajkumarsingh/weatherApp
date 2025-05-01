import React from 'react';
import {useColorScheme, View, StatusBar, Pressable, Alert} from 'react-native';
import {Card} from '../components/Card';
import {SearchBox} from '../components/SearchBox';
import {Styles} from './Styles';
import {RefreshIcon} from '../assets';
import {useTryCatch} from '../utils/CommonHooks/useTryCatch';
import {WEATHER_API_KEY} from '../utils/Constants';
import {useLocationHook} from '../utils/CommonHooks/useLocation';
import {Loader} from '../components/Loader';
import axios from 'axios';

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [states, setStates] = React.useState({
    loader: false,
    data: {},
    error: '',
    searchText: '',
    currentLocation: '',
  });

  const fetchUserLocationData = async () => {
    setStates(prev => ({...prev, loader: true, error: '', searchText: ''}));
    const res = await useLocationHook.requestLocationPermission();
    //console.log('#>> res :: ', JSON.stringify(res?.data));
    if (res.data) {
      setStates(prev => ({...prev, searchText: ''}));
      fetchWeatherFromSearchData(
        `${res.data?.address?.city}, ${res.data?.address?.state}`,
      );
    } else {
      setStates(prev => ({...prev, error: '', searchText: '', loader: false}));
      Alert.alert(
        'Oops!',
        'Something wrong with location permission, please try again.',
      );
    }
  };

  React.useEffect(() => {
    fetchUserLocationData();
  }, []);

  const fetchWeatherFromSearchData = async (searchKey: string) => {
    const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${searchKey}`;
    //console.log('#>> fetchWeatherFromSearchData() => url :: ', url);
    const {data, error} = await useTryCatch(axios.get(url));
    //console.log('#>> fetchWeatherFromSearchData() => data :: ', data?.data);
    if (error) {
      setStates(prev => ({
        ...prev,
        error: '',
        loader: false,
      }));
    }
    if (data?.data?.current) {
      setStates(prev => ({
        ...prev,
        error: '',
        data: data?.data?.current,
        currentLocation: searchKey,
        loader: false,
      }));
    }
  };

  return (
    <View style={isDarkMode ? Styles.darkContainer : Styles.lightContainer}>
      <StatusBar
        translucent
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      {states.loader && <Loader visible={states.loader} />}
      <SearchBox
        value={states.searchText}
        onChangeText={(val: string) => {
          if (val === '') fetchUserLocationData();
          setStates(prev => ({...prev, searchText: val}));
        }}
        onSearch={() => {
          console.log('#>> states.searchText : ', states.searchText);
          setStates(prev => ({...prev, loader: true}));
          fetchWeatherFromSearchData(states.searchText);
        }}
      />
      {states.data && (
        <Card weatherData={states.data} location={states.currentLocation} />
      )}
      <Pressable style={Styles.btn} onPress={fetchUserLocationData}>
        <RefreshIcon
          width={30}
          height={30}
          color={isDarkMode ? '#fff' : '#000'}
        />
      </Pressable>
    </View>
  );
};
