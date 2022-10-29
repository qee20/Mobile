import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Client from '../../../mysql api/client';
import {List, Divider} from 'react-native-paper';

const BantuanFAQ = ({navigation, route}) => {
  const [FAQ, setFAQ] = React.useState([]);

  const handlePress = () => setExpanded(!expanded);
  const [expanded, setExpanded] = React.useState(true);

  React.useEffect(async () => {
    navigation.addListener('focus', async () => {
      await Client.get('/faqData').then(response => {
        console.log('FAQ ', response.data);
        setFAQ(response.data);
      });
    });
  }, []);

  return (
    <ScrollView>
      {FAQ.map((faq, index) => {
        return (
          <View>
            <List.Accordion
              style={{margin: 10}}
              title={faq.pertanyaan}
              onPress={handlePress}>
              <Text ellipsizeMode="middle" style={{margin: 10}}>
                {faq.bantuan}
              </Text>
            </List.Accordion>
            <Divider style={{height: 2}} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default BantuanFAQ;
