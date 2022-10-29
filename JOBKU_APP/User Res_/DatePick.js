import React from 'react'
import {View, Button, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, DatePickerAndroid} from 'react-native'
import DatePicker from 'react-native-date-picker'

const BirthDay  = ({route,navigation}) => {

    const [date, setDate] = React.useState(new Date())
    const [tanggal, setTanggal] = React.useState('')
    const [bulan, setBulan] = React.useState('')
    const [tahun, setTahun] = React.useState('')

    const dateValue = () => {
        setTanggal(date.getDate())
        switch (date.getMonth()) {
            case 0:
                    setBulan('Januari')
                break;
            case 1:
                    setBulan('Februari')
                break;
            case 2:
                    setBulan('Maret')
                break;
            case 3:
                    setBulan('April')
                break;
            case 4:
                    setBulan('Mei')
                break;
            case 5:
                    setBulan('Juni')
                break;
            case 6:
                    setBulan('Juli')
                break;
            case 7:
                    setBulan('Agustus')
                break; 
            case 8:
                    setBulan('September')
                break;
            case 9:
                    setBulan('Oktober')
                break;
            case 10:
                    setBulan('November')
                break;
            case 11:
                    setBulan('Desember')
                break;    
            default:
                setBulan('Datang')
                break;
        }
        setTahun(date.getFullYear())
    }

        return (
            <View>
                <DatePicker
                mode={'date'}
                date={date}
                onDateChange={setDate}
                />
                <Button title="PrintS" onPress={dateValue} />
                <Text>{tanggal}</Text>
                <Text>{bulan}</Text>
                <Text>{tahun}</Text>
            </View>
        )
}

export default BirthDay;