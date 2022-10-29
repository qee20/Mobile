import React from 'react';
import { View, Text, TextInput , StyleSheet } from 'react-native';

const FormInput = (props) => {
    const {placeholder, label, editable, keyboardType} = props
    return(
        <>
            <Text style={{fontWeight : 'bold', marginLeft : 5, marginTop : 5}}>{label}</Text>
            <TextInput {...props} placeholder={placeholder} style={style.input} />
        </>
    )
}

export default FormInput;

const style = StyleSheet.create({
    input : {
        borderBottomWidth : 1.5,
        borderColor : '#7371E6',
        marginLeft : '5%',
        marginRight : '5%',
        marginBottom : 5
    }
})