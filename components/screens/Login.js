import React, { useState, useEffect, useContext } from 'react'
import { StyledContainer, InnerContainer, 
    PageLogo, PageTitle, 
    StyledFormArea, LeftIcon, 
    StyledInputLabel, StyledTextInput, 
    RightIcon, Colors, 
    StyledButton, ButtonText, 
    MessageBox, Or,} from '../../styles'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, Keyboard, ActivityIndicator, Image, Text } from 'react-native';
import { KeyboardAvoidingWrapper } from '../KeyboardAvoidingWrapper';
import axios from 'axios';
import * as Google from 'expo-google-app-auth';
import * as Font from 'expo-font';
import { CredentialsContext } from '../CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {brand, darkest, primary} = Colors;

const TextInputs = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon><Image
                style={{width: 30, height: 30}}
                source={icon}/>
            </LeftIcon>

            <StyledInputLabel style={{fontFamily: 'FuturaPTExtraBold'}}>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Image source={hidePassword ? require('../../assets/img/icons/eye-off.png') : require('../../assets/img/icons/eye-on.png')} 
                        style={{width: 30, height: 30}}/>
                </RightIcon>
            )}
        </View>
    )
};

export const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);
    const [fontLoaded, setFontLoaded] = useState(false);

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    useEffect(() => {
        const loadFonts = async () => {
          await Font.loadAsync({
            'FuturaPTExtraBold': require('../../assets/fonts/FuturaPTExtraBold.otf'),
            'FuturaPTBold': require('../../assets/fonts/FuturaPTBold.otf'),
            'FuturaPTBookOblique': require('../../assets/fonts/FuturaPTBookOblique.otf'),
          }).then(() => setFontLoaded(true));
        };
        loadFonts();
    }, []);

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://192.168.1.8:5000/api/users/signin';
        axios
          .post(url, credentials)
          .then((res) => {
            const result = res.data;
            const { status, message, data } = result;
    
            if (status !== 'SUCCESS') {
              handleMessage(message, status);
            } else {
                handleMessage(message, status);
                // setTimeout(() => {navigation.navigate('Welcome', {...data[0]}); handleMessage(null);});
                persistLogin({...data[0]}, message, status);
            }
            setSubmitting(false);
          })
          .catch((err) => {
            setSubmitting(false);
            handleMessage('An error occurred. Check your network and try again');
            console.log(err.toJSON());
          });
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    
    const handleGoogleSignIn = () => {
        setGoogleSubmitting(true);
        const config = {
            iosClientId: `144694625770-8q8e3f75prk842an3n1sqmjpe7dp0sqj.apps.googleusercontent.com`,
            androidClientId: `144694625770-f4i61hnhh5ln6t4gg4j901jm0tv5g5ju.apps.googleusercontent.com`,
            scopes: ['profile', 'email']
        };

        Google
            .logInAsync(config)
            .then((res) => {
                const { type, user } = res;
                if (type == 'success') {
                    const {email, name, photoUrl} = user;
                    handleMessage('Google sign in successful', 'SUCCESS');
                    // setTimeout(() => {navigation.navigate('Welcome', {email, name, photoUrl}), 1000; handleMessage(null);});
                    persistLogin({email, name, photoUrl}, message, 'SUCCESS');
                } else {
                    handleMessage('Google sign in was cancelled');
                }
                setGoogleSubmitting(false);
            })
            .catch(err => {
                console.log(err);
                handleMessage('An error occured. Check your network and try again');
                setGoogleSubmitting(false);
            });
    }

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('tapsmobilecredentials', JSON.stringify(credentials))
            .then(() => {
                handleMessage(message, status);
                setStoredCredentials(credentials);
            })
            .catch (err => {
                    console.log(err);
                    handleMessage('Persisting login failed');
            });
    }

    return (
        <KeyboardAvoidingWrapper>
            {fontLoaded ? 
            <StyledContainer>
                <StatusBar style='dark'/>
                <InnerContainer>
                    <PageLogo resizeMode='cover' source={require('../../assets/img/TAPS-LOGO-1.png')}/>
                    <PageTitle style={{fontFamily: 'FuturaPTExtraBold', fontSize: 20}}>Techno-cashier Automated Product Scanner</PageTitle>
                    <Formik
                        initialValues={{email:'', password:''}}
                        onSubmit={(values, {setSubmitting}) => {
                            handleLogin(values, setSubmitting);
                        }}
                    >
                        {({handleBlur, handleChange, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <TextInputs 
                                    label='E-mail Address'
                                    icon={require('../../assets/img/icons/user.png')}
                                    placeholder='redner@gmail.com'
                                    placeholderTextColor={darkest}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType='email-address'
                                />

                                <TextInputs 
                                    label='Password'
                                    icon={require('../../assets/img/icons/lock.png')}
                                    placeholder='* * * * *'
                                    placeholderTextColor={darkest}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}                     
                                />

                                <MessageBox type={messageType} style={{fontFamily: 'FuturaPTBookOblique'}}>{message}</MessageBox>

                                {!isSubmitting && <StyledButton onPress={handleSubmit} >
                                    <ButtonText style={{fontFamily: 'FuturaPTBold'}}>LOG IN</ButtonText>
                                </StyledButton>} 

                                {isSubmitting && (<StyledButton disabled={true}>
                                    <ActivityIndicator size='large' color={primary}/>
                                </StyledButton>)}

                                <Or>OR</Or>

                                {!googleSubmitting && <StyledButton google={true} onPress={handleGoogleSignIn}>
                                        <Image source={require('../../assets/img/icons/google.png')} 
                                            style={{width: 25, height: 25, left: 20}}/>
                                        <ButtonText google={true} style={{fontFamily: 'FuturaPTBold'}}>CONTINUE WITH GOOGLE</ButtonText>
                                </StyledButton>}

                                {googleSubmitting && <StyledButton google={true} disabled={true}>
                                        <ActivityIndicator size='large' color={primary}/>
                                </StyledButton>}

                                <StyledButton google={true} onPress={() => navigation.navigate('Signup')}>
                                    <ButtonText style={{fontFamily: 'FuturaPTBold'}}>CREATE AN ACCOUNT</ButtonText>
                                </StyledButton>
                                
                            </StyledFormArea>
                        )}
                    </Formik>    
                </InnerContainer>
            </StyledContainer> 
            :  
            <StyledContainer>
                <StatusBar style='dark'/>
                <InnerContainer><ActivityIndicator size='large' color={darkest}/></InnerContainer>
            </StyledContainer>
            }    
        </KeyboardAvoidingWrapper>

    )
}
