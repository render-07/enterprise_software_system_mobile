import React, { useState, useEffect, useContext } from 'react'
import { GetStartedStyledContainer, 
    InnerContainer,GetStartedLogo,GetStartedTitle, StyledButton, ButtonText, GetStartedLogoView} from '../../styles'
import { LogBox, View } from 'react-native';
import * as Font from 'expo-font';

export const GetStarted = ({navigation}) => {

    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        const loadFonts = async () => {
            await Font.loadAsync({
              'FuturaPTBold': require('../../assets/fonts/FuturaPTBold.otf'),
            }).then(() => setFontLoaded(true));
          };
          loadFonts();
    }, [])


    return (
        <GetStartedStyledContainer>
            <InnerContainer>
                <View style={{marginTop: 200}}>
                    <GetStartedLogoView style={{elevation: 5}} >
                        <GetStartedLogo resizeMode='cover' source={require('../../assets/img/TAPS-LOGO-WITH-BG.png')}/>
                    </GetStartedLogoView>
                    <GetStartedTitle style={{fontFamily: 'FuturaPTBold'}}>Shop safely.</GetStartedTitle>
                    <StyledButton getStarted={true} onPress={() => navigation.navigate('Login')}>
                        <ButtonText google={true} style={{fontFamily: 'FuturaPTBold'}}>GET STARTED</ButtonText>
                    </StyledButton>
                </View>
            </InnerContainer>
        </GetStartedStyledContainer>
    )
}