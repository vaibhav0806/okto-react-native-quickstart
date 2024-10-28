import React, {useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {GoogleSignin, User} from '@react-native-community/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from "@env";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
});

// Define the props type for GoogleSignInButton
interface GoogleSignInButtonProps {
  onSignInSuccess: (userInfo: User | null) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({onSignInSuccess}) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const onSignIn = () => {
    GoogleSignin.hasPlayServices()
      .then(() => GoogleSignin.signIn())
      .then((response) => {
        console.log('Sign-in successful! User info:', response); // Log the user info
        setUserInfo(response);
        onSignInSuccess(response); // Pass the user info to the parent component
      })
      .catch((err) => {
        console.error('Error during sign-in:', err); // Handle error
      });
  };

  const onSignOut = () => {
    GoogleSignin.signOut()
      .then(() => {
        setUserInfo(null);
        onSignInSuccess(null); // Clear user info on sign-out
      })
      .catch((err) => {
        console.error('Error during sign-out:', err); // Handle error
      });
  };

  return userInfo ? (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, {`${userInfo.user.givenName} ${userInfo.user.familyName}`}
      </Text>
      <Button title="Sign out" onPress={onSignOut} />
    </View>
  ) : (
    <Button title="Sign in with Google" onPress={onSignIn} />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
});

export default GoogleSignInButton;