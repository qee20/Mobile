import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const FormSubmitButton = ({title, onPress}) => {
    return(
        <TouchableOpacity   onPress={onPress} style={styles.container}>
            <Text style={{fontSize : 18, color : '#fff'}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default FormSubmitButton;

const styles = StyleSheet.create({
    container : {
        height : 45,
        backgroundColor : '#7371E6',
        justifyContent : 'center',
        alignItems : 'center',
        margin: 1,
        borderRadius : 5,
        margin : 10
    }
})
