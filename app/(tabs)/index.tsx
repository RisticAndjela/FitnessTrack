import { View } from "react-native";
import {Button,Theme} from '@/components/Button';

export default function Home() {
    return ( 
    <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button theme={Theme.Regular} label="button" onPress={Function}/>
      </View>
      );
}