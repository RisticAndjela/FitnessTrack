import { View } from "react-native";
import { Button, Theme } from '@/components/components/Button';
import containers from '@/components/styles/style-container';
import axios from 'axios';

const apiCall = () => {
  axios.get('http://localhost:8080').then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('API Error:', error.message);
    });
};

export default function Home() {
  return ( 
    <View style={containers.centered_conatiner}>
      <Button theme={Theme.Regular} label="Call API" onPress={apiCall} />
    </View>
  );
}
