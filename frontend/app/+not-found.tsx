import { View } from 'react-native';
import { Link, Stack } from 'expo-router';
import buttons from '@/components/styles/style-button';
import containers from '@/components/styles/style-container'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={containers.centered_container_dark}>
        <Link href={"/"} style={buttons.link_button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}
