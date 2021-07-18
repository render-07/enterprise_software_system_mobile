import React, { useEffect, useContext, useState } from 'react'
import { WelcomeHeader, StyledFormArea, 
    StyledButton, ButtonText, 
    SubTitleEmail, Avatar, 
    WelcomeBanner, SubTitleName,
    WelcomeBodyPanel, PageTitle, Colors } from '../../styles'
import { StatusBar } from 'expo-status-bar';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import SlidingPanel from 'react-native-sliding-up-down-panels';
import { CredentialsContext } from '../CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

const { width, height } = Dimensions.get('window');
const { darkest } = Colors;

import { LogBox } from 'react-native';

export const Welcome = ({navigation}) => {  
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        const loadFonts = async () => {
            await Font.loadAsync({
              'FuturaPTExtraBold': require('../../assets/fonts/FuturaPTExtraBold.otf'),
              'FuturaPTBold': require('../../assets/fonts/FuturaPTBold.otf'),
            }).then(() => setFontLoaded(true));
          };+
          loadFonts();
    }, [])

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {email, name, photoUrl} = storedCredentials;
    const AvatarImg = photoUrl ? {uri: photoUrl} : null;
    console.log(storedCredentials);

    const clearLogin = () => {
        AsyncStorage.removeItem('tapsmobilecredentials')
            .then(() => {
                setStoredCredentials('');
            })
            .catch(err => console.log(err));    
    }
    
    return (
        <>
            <StatusBar style='light'/>
            <View style={{flex: 1}}>                      
                <WelcomeBanner resizeMode='cover' source={AvatarImg}></WelcomeBanner>
                <SlidingPanel
                    headerLayoutHeight = {400}

                    headerLayout = {() =>
                        <View style={{width, height: 400}}>
                                 {fontLoaded ? 
                                <WelcomeHeader>
                                    <PageTitle welcome={true} style={{fontFamily: 'FuturaPTBold'}}>Welcome!</PageTitle>
                                    <Avatar resizeMode='cover' source={AvatarImg}/>
                                    <SubTitleName>{name}</SubTitleName>
                                    <SubTitleEmail>{email}</SubTitleEmail>
                                    <StyledFormArea>
                                        <StyledButton onPress={() => navigation.navigate('BarcodeScanner')}>
                                            <ButtonText style={{fontFamily: 'FuturaPTBold'}}>START SCAN</ButtonText>
                                        </StyledButton>
                                    </StyledFormArea>
                                </WelcomeHeader> 
                                 :   
                                 <WelcomeHeader>
                                    <ActivityIndicator size='large' color={darkest}/>    
                                 </WelcomeHeader> 
                                }
                        </View>
                    }
                    slidingPanelLayout = {() =>
                        <WelcomeBodyPanel style={{width, height: 500, paddingTop: 100}}>
                            {fontLoaded ? 
                                <StyledFormArea>
                                    <StyledButton welcome={true} 
                                        onPress={clearLogin}>
                                        <ButtonText style={{fontFamily: 'FuturaPTBold'}}>LOG OUT</ButtonText>
                                    </StyledButton>
                                </StyledFormArea>  
                                 :   
                                <ActivityIndicator size='large' color={darkest}/>          
                            }                           
                        </WelcomeBodyPanel>
                    }
                />
            </View>
        </>
    )
}