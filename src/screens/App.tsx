import React from 'react';
import {useColorScheme, View, StatusBar, Pressable, Alert} from 'react-native';
import {Card} from '../components/Card';
import {SearchBox} from '../components/SearchBox';
import {Styles} from './Styles';
import {RefreshIcon, DarkModeIcon, LightModeIcon} from '../assets';
import {useTryCatch} from '../utils/CommonHooks/useTryCatch';
import {WEATHER_API_KEY} from '../utils/Constants';
import {useLocationHook} from '../utils/CommonHooks/useLocation';
import {Loader} from '../components/Loader';
import axios from 'axios';

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [states, setStates] = React.useState({
    loader: true,
    data: {},
    error: '',
    searchText: '',
    currentLocation: '',
    isDarkModeEnabled: false,
  });

  React.useEffect(() => {
    setStates(prev => ({...prev, isDarkModeEnabled: isDarkMode}));
  }, [isDarkMode]);

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

  const toggleMode = () => {
    setStates(prev => ({...prev, isDarkModeEnabled: !prev.isDarkModeEnabled}));
  };

  return (
    <View style={states.isDarkModeEnabled ? Styles.darkContainer : Styles.lightContainer}>
      <StatusBar
        translucent
        barStyle={states.isDarkModeEnabled ? 'light-content' : 'dark-content'}
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
          //console.log('#>> states.searchText : ', states.searchText);
          setStates(prev => ({...prev, loader: true}));
          fetchWeatherFromSearchData(states.searchText);
        }}
        isDarkModeEnabled={states.isDarkModeEnabled}
      />
      {states.data && (
        <Card weatherData={states.data} location={states.currentLocation} isDarkModeEnabled={states.isDarkModeEnabled} />
      )}
      <View style={Styles.floatBtnContainer}>
        <Pressable
          style={[
            Styles.btn1,
            {backgroundColor: states.isDarkModeEnabled ? '#000' : '#fff'},
          ]}
          onPress={fetchUserLocationData}>
          <RefreshIcon
            width={30}
            height={30}
            color={states.isDarkModeEnabled ? '#fff' : '#191C20'}
          />
        </Pressable>
        <Pressable
          style={[
            Styles.btn2,
            {backgroundColor: states.isDarkModeEnabled ? '#000' : '#fff'},
          ]}
          onPress={toggleMode}>
          {states.isDarkModeEnabled ? (
            <DarkModeIcon width={30} height={30} color={'#fff'} />
          ) : (
            <LightModeIcon width={30} height={30} color={'#191C20'} />
          )}
        </Pressable>
      </View>
    </View>
  );
};
