import styled from 'styled-components';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

// colors
export const Colors = {
    // primary: '#FFFFFF',
    // secondary: '#DBFFEF',
    // tertiary: '#1F2937',
    // darkLight: '#6A8076',
    // brand: '#00989b',
    // green: '#00989b',
    // red: '#EF4444',
    // darkest: '#6A8076',
    primary: '#FFFFFF',
    secondary: '#00989D',
    tertiary: '#DCDEDD',
    darkLight: '#99A2A1',
    brand: '#00989D',
    //green: '#00989D',
    red: '#EF4444',
    darkest: '#6A8076',
}

const { primary, secondary, tertiary, darkLight, brand, red, darkest } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${primary};
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const WelcomeBanner = styled.Image`
    height: 70%;
    min-width: 100%
    position: absolute;
    zIndex: 0;
    top: 0;
    width: 100%;
    align-items: center;
`;

export const WelcomeHeader = styled(InnerContainer)`
    borderTopLeftRadius: 50px;
    borderTopRightRadius: 50px;
    background-color: ${primary};
    zIndex: 2;
    elevation: 5;
`;

export const WelcomeBodyPanel = styled(InnerContainer)`
    background-color: ${primary};
    zIndex: 2;
    elevation: 5;
`;

export const PageLogo = styled.Image`
    width: 200px;
    height: 200px;
`;

export const Avatar = styled.Image`
    width: 110px;
    height: 110px;
    margin: auto;
    border-radius: 55px;
    border-width: 4px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const PageTitle = styled.Text`
    font-size: 15px;
    text-align: center;
    color: ${darkest};
    margin-bottom: 30px;
    margin-top: -40px;

    ${(props) => props.signup && `
        font-size: 35px;
        text-align: left;
        width: 90%;
        margin-top: 10px;
        margin-bottom: 10px;
        color: ${brand};
    `}

    ${(props) => props.welcome && `
        font-size: 37px;
        text-align: left;
        width: 90%;
        margin-top: 17px;
        margin-left: 50px;
    `}
`;

export const SubTitle = styled.Text`
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    letter-spacing: 1px;
    color: ${darkest};

    ${(props) => props.signup && `
        text-align: left;
        width: 90%;
        font-weight: bold;
        margin-top: 0px;
        margin-bottom: 30px;
    `}
    
    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}
`;

export const SubTitleName = styled.Text`
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${darkest};
`;

export const SubTitleEmail = styled.Text`
    font-size: 15px;
    margin-top: 10px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${brand};
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: #fff;
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 30px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${darkest};
    borderWidth: 1;
    borderColor: #00989b;
`;

export const StyledInputLabel = styled.Text`
    color: ${darkest};
    font-size: 15px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    background-color: ${brand};
    justify-content: center;
    border-radius: 30px;
    height: 60px;
    align-items: center;
    margin: 0px 65px 0px 65px;

    ${(props) => props.google && `
        background-color: ${brand};
        flex-direction: row;
        justify-content: center;
        margin: 5px 5px 0 5px;
        height: 50px;
    `}

    ${(props) => props.welcome && `
        background-color: ${red};
    `}

    ${(props) => props.signup && `
        margin-top: 0px;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;
    
    ${(props) => props.google && `
        padding: 25px;
    `}
`;

export const MessageBox = styled.Text`
    text-align: center;
    font-size: 15px;
    color: ${(props) => props.type == 'SUCCESS' ? brand : red};
    margin-bottom: 10px;
`;

export const Or = styled.Text`
    text-align: center;
    font-size: 13px;
    margin: 5px 0 5px 0;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    color: ${primary};
    text-align: center;
    font-size: 20px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`;

