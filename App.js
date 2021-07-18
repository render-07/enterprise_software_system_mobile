import React, {useState} from 'react';
import { RootStack } from './components/Navigators/RootStack';
import AppLoading  from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('tapsmobilecredentials')
      .then((res) => {
        if (res != null) {
          setStoredCredentials(JSON.parse(res));
        }
        else{
          setStoredCredentials(null); 
        }
      })
      .catch(err => console.log(err));
  }

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />)
  }
  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <RootStack/>
    </CredentialsContext.Provider>
  );
}
