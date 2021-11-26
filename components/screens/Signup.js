import React, { useState, useContext } from 'react'
import { StyledContainer, InnerContainer, 
    PageTitle, SubTitle, 
    StyledFormArea, LeftIcon,
    StyledInputLabel, StyledTextInput, 
    RightIcon, Colors, 
    StyledButton, ButtonText, 
    MessageBox} from '../../styles'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAvoidingWrapper } from '../KeyboardAvoidingWrapper';
import axios from 'axios';
import { CredentialsContext } from '../CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {brand, darkest, primary} = Colors;

const TextInputs = ({label, icon, isPassword, hidePassword, 
    setHidePassword, isDate, showDatePicker, ...props}) => {
    return(
        <View>
            <LeftIcon><Image
                style={{width: 30, height: 30}}
                source={icon}/>
            </LeftIcon>

            <StyledInputLabel style={{fontFamily: 'FuturaPTExtraBold'}}>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && 
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props}/>
                </TouchableOpacity>}
                {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Image source={hidePassword ? require('../../assets/img/icons/eye-off.png') : require('../../assets/img/icons/eye-on.png')} 
                        style={{width: 30, height: 30}}/>
                </RightIcon>
            )}
        </View>
    )
};

export const Signup = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000,0,1));
    const [dob, setDob] = useState();
    
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = () => {
        setShow(true);
    }

    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://192.168.1.8:5000/api/users/signup';
        axios
          .post(url, credentials)
          .then((res) => {
            const result = res.data;
            const { status, message, data } = result;
    
            if (status !== 'SUCCESS') {
              handleMessage(message, status);
            } else {
                // navigation.navigate('Welcome', {...data});
                persistLogin({...data}, message, status);
            }
            setSubmitting(false);
          })
          .catch((err) => {
            setSubmitting(false);
            handleMessage('An error occurred. Check your netwewrwerewrork and try again');
            console.log(err);
          });
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
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
            <StyledContainer>
                <StatusBar style='dark'/>
                <InnerContainer>
                    <PageTitle style={{fontFamily: 'FuturaPTBold'}} signup={true}>Create Account</PageTitle>
                    <SubTitle signup={true}>Fill out the details completely</SubTitle>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            style={{
                                backgroundColor: 'yellow',
                            }}
                        />
                    )}

                    <Formik
                        initialValues={{name:'', email:'', dateOfBirth:'', password:'', confirmPassword:''}}
                        onSubmit={(values, {setSubmitting}) => {

                            values = {...values, dateOfBirth: dob};

                            if (
                                values.email == '' ||
                                values.password == '' ||
                                values.name == '' ||
                                values.dateOfBirth == '' ||
                                values.confirmPassword == ''
                              ) {
                                handleMessage('Please fill in all fields');
                                setSubmitting(false);
                              } else if (values.password !== values.confirmPassword) {
                                handleMessage('Passwords do not match');
                                setSubmitting(false);
                              } else {
                                handleSignup(values, setSubmitting);
                              }
                        }}
                    >
                        {({handleBlur, handleChange, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <TextInputs 
                                    label='Full Name'
                                    icon={require('../../assets/img/icons/user.png')}
                                    placeholder='Redner Ivan Cabra'
                                    placeholderTextColor={darkest}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />

                                <TextInputs 
                                    label='E-mail Address'
                                    icon={require('../../assets/img/icons/mail.png')}
                                    placeholder='redner@gmail.com'
                                    placeholderTextColor={darkest}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType='email-address'
                                />

                                <TextInputs 
                                    label='Date of birth'
                                    icon={require('../../assets/img/icons/calendar.png')}
                                    placeholder='YYYY-MM-DD'
                                    placeholderTextColor={darkest}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dob ? dob.toDateString() : ''}
                                    isDate={true}
                                    editable={false}
                                    showDatePicker={showDatePicker}
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

                                <TextInputs 
                                    label='Confirm Password'
                                    icon={require('../../assets/img/icons/lock.png')}
                                    placeholder='* * * * *'
                                    placeholderTextColor={darkest}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}                     
                                />

                                <MessageBox type={messageType}>{message}</MessageBox>


                                {!isSubmitting && <StyledButton onPress={handleSubmit} signup={true}>
                                    <ButtonText style={{fontFamily: 'FuturaPTBold'}}>SIGN UP</ButtonText>
                                </StyledButton>} 

                                {isSubmitting && (<StyledButton disabled={true}>
                                    <ActivityIndicator size='large' color={primary}/>
                                </StyledButton>)}
                                
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>     
    )
}
