import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {AuthContext} from '../contexts';
import ProfileImage from '../components/ProfileImage';
import AppText from '../components/App/Text';
import {ProfileIcon} from '../components/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fetchOpenAIContent} from '../api';
import {GOOGLE_BUSINESS_SCOPE, WEB_CLIENT_ID} from '@env';

console.log(WEB_CLIENT_ID)
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  scopes: [GOOGLE_BUSINESS_SCOPE],
});

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  const [isAutomated, setIsAutomated] = useState(false);
  const [placeId, setPlaceId] = useState('');
  const user = useContext(AuthContext);
  const handleChangeAutomated = value => {
    setIsAutomated(value);
  };

  const googleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      let accountID = await getAccount(tokens.accessToken);
      let locationID = await getLocation(tokens.accessToken);
      fetchBusinessInfo(tokens.accessToken, accountID, locationID);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available');
      } else {
        console.log('Error:', error);
      }
    }
  };

  const revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
    } catch (error) {
      console.error(error);
    }
  };

  const getAccount = async (accessToken) => {
    try {
      const response = await fetch(
        `https://mybusinessaccountmanagement.googleapis.com/v1/accounts`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ContentType: 'application/json',
          },
        },
      );
      return response.id;
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const getLocation = async (accessToken) => {
    try {
      const response = await fetch(
        `https://mybusinessaccountmanagement.googleapis.com/v1/locations`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ContentType: 'application/json',
          },
        },
      );
      return response.id;
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const fetchBusinessInfo = async (accessToken, accountID, locationID) => {
    try {
      const response = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${accountID}/locations/${locationID}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ContentType: 'application/json',
          },
        },
      );
      console.log(response);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top + 59}]}>
      <View style={{alignItems: 'center'}}>
        <ProfileImage size={105} uri={user.picture} style={{marginBottom: 8}} />
        <AppText size={22}>
          {user.firstName} {user.lastName}
        </AppText>
        <AppText
          color="#8083A3"
          size={14}
          weight={400}
          style={{marginBottom: 70}}>
          {user.email}{' '}
        </AppText>
      </View>

      <TouchableOpacity style={styles.card}>
        <ProfileIcon style={{marginRight: 11}} />
        <AppText>Account information</AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={googleAuth}>
        <ProfileIcon style={{marginRight: 11}} />
        <AppText>Google Business Profile</AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={revokeAccess}>
        <ProfileIcon style={{marginRight: 11}} />
        <AppText>Team Members</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    height: 56,
    width: '100%',
    borderRadius: 14,
    // shadowColor: '#999BA8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
    alignSelf: 'stretch',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
});

export default ProfileScreen;
