import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login';
import { Signup } from '../screens/Signup';
import { Welcome } from '../screens/Welcome';
import { BarcodeScanner } from '../screens/BarcodeScanner';
import { Colors } from '../../styles'

import { CredentialsContext } from '../CredentialsContext';

const Stack = createStackNavigator();
const {tertiary, primary} = Colors;

export const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyled: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: primary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 10
                            }  
                        }}
                        initialRouteName='Login'
                        >
                        {storedCredentials ?
                            <>
                                <Stack.Screen options={{headerTintColor: primary}}name='Welcome' component={Welcome}/> 
                                <Stack.Screen name='BarcodeScanner' component={BarcodeScanner}/>   
                            </> 
                            :    
                            <>
                                <Stack.Screen name='Login' component={Login}/>
                                <Stack.Screen name='Signup' component={Signup}/>   
                            </>
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    )
}

