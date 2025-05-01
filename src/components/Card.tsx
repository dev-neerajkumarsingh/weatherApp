import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {CommonText} from './CommonText';
import {
  LocationIcon,
//   WindyIcon,
//   CloudIcon,
//   RainyIcon,
//   SnowyIcon,
//   SunnyIcon,
} from '../assets';
import {windowWidth} from '../utils/Constants';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignSelf: 'center',
    width: windowWidth / 1.11,
    paddingVertical: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
    backgroundColor: 'white',
  },
});

interface CardProps {
  weatherData: any;
  location: string;
}

export const Card: React.FC<CardProps> = ({weatherData, location}) => {
  console.log('#>> weatherData :: ', JSON.stringify(weatherData));

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LocationIcon width={18} height={24} color={'red'} />
        <CommonText text={location} fontSize={20} moreStyle={{marginLeft: 5}} />
      </View>
      {weatherData?.weather_icons?.[0] && (
        <Image
          source={{uri: `${weatherData?.weather_icons?.[0]}`}}
          style={{width: 100, height: 100, marginTop: 20, alignSelf: 'center'}}
          resizeMode="contain"
        />
      )}
      {weatherData?.temperature && (
        <CommonText
          text={`${weatherData?.temperature}°C`}
          fontSize={20}
          moreStyle={{marginTop: 15, alignSelf: 'center'}}
        />
      )}
      {weatherData?.weather_descriptions?.[0] && (
        <CommonText
          text={`${weatherData?.weather_descriptions?.[0]}`}
          fontSize={20}
          moreStyle={{marginTop: 15, alignSelf: 'center'}}
        />
      )}
      <View
        style={{
          marginTop: 10,
          width: '90%',
          height: 1,
          backgroundColor: '#808080',
          marginHorizontal: 10,
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: 10
        }}>
        {weatherData?.wind_speed && (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CommonText
              text={`${weatherData?.wind_speed} km/h`}
              fontSize={16}
            />
            <CommonText
              text={`Wind Speed`}
              fontSize={12}
              moreStyle={{marginTop: 5}}
            />
          </View>
        )}
        {weatherData?.wind_speed && (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CommonText text={`${weatherData?.humidity}%`} fontSize={16} />
            <CommonText
              text={`Humidity`}
              fontSize={12}
              moreStyle={{marginTop: 5}}
            />
          </View>
        )}
      </View>
    </View>
  );
};
