import React from 'react'
import { Modal, View, TextInput, Button, Text} from "react-native"

export const QuantityInput = ({ header, value, onTextChange, onSubmit, visible, toggle }) => {
    return (
      <Modal visible={visible} transparent={true} style={{justifyContent:'center'}}>
        <View
          style={{
            height: 140,
            padding: 20,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginTop: '75%',
          }}>
          <Text style={{marginBottom: 10}}>{header}</Text>
          <TextInput
            value={value}
            onChangeText={onTextChange}
            placeholder={'Enter quantity'}
            keyboardType='number-pad'
            style={{marginBottom: 10}}
          />

          <View style={{ flexDirection:"row", justifyContent:'center' }}>
            <View style={{ marginHorizontal: 10, marginTop: 5}}>
              <Button title="ok" onPress={onSubmit} style={{width: '10px'}}/>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 5}}>
              <Button title="close" onPress={toggle} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };