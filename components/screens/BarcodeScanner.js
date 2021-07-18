import React, { useState, useEffect } from 'react';
import { Text, Dimensions, StyleSheet, Image, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { StyledContainer, StyledButton,
   ButtonText, ExtraText} from '../../styles'

const { width } = Dimensions.get('window')
const qrSize = width * 0.7

export const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
  }, []);

  const sendData = ({ type, data }) => {
    // const url = 'http://192.168.1.30:4000/api/item/addData';

    // const newItem = {
    //   itemName: 'Air Booster',
    //   quantity: 91,
    //   price: 4999.99,
    //   categoryID: '213213213',
    //   supplierID: 'sdfsdfsdfsddfsd'
    // };

    // axios
    //   .post(url, newItem)
    //   .then((res) => {
    //     const result = res.data;
    //     const { status, message, data } = result;  
    //     setScanned(true);

    //     Alert.alert(
    //         "Item Purchased!",
    //         // `Bar code with type ${type} and data ${data} has been scanned!`
    //         'Thank you for shopping!',
    //         [
    //           { text: "OK"}
    //         ],
    //         { cancelable: true }
    //     )
    //   })
    //   .catch((err) => {
    //     console.log(err.toJSON());
    //   });

    axios
        .post(`http://192.168.1.30:4000/api/item/itempurchase/${data}`)
        .then((res) => {
          setScanned(true);
          Alert.alert(
            "Item Purchased!",
            // `Bar code with type ${type} and data ${data} has been scanned!`
            `You purchase ${data}. Thank you for shopping!`,
            [
              { text: "OK"}
            ],
            { cancelable: true }
          )
        }).catch((err) => {
            console.log(err.toJSON());
        });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <StyledContainer style={{justifyContent: 'center', }}>
      {!scanned && <Image source={require('../../assets/img/icons/qr.png')}
        style={{width: qrSize, height: qrSize, zIndex: 1, marginTop: '20%',
        marginBottom: '20%', marginLeft: '10%', marginRight: '10%'}}/>}
      {!scanned && <ExtraText 
        style={{zIndex: 1, marginLeft: '25%', marginRight: '25%'}}
        onPress={() => setScanned(true)}>Cancel</ExtraText>}
      <BarCodeScanner
        barcodes
        onBarCodeScanned={scanned ? undefined : sendData}
        style={StyleSheet.absoluteFillObject}/>

      {scanned && 
        <StyledButton onPress={() => setScanned(false)}>
          <ButtonText style={{fontFamily: 'FuturaPTBold'}}>TAP TO SCAN AGAIN</ButtonText>
        </StyledButton>}
    </StyledContainer>
  ); 
}
