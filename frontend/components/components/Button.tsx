import { View, Pressable, Text } from 'react-native';
import color from '@/assets/colors/colors';
import containers from '@/components/styles/style-container';
import buttons from '@/components/styles/style-button';

export enum Theme{
  Regular
}
type Props = {
  label: string;
  onPress:() => void;
  theme?: Theme;
};

export function Button({ label, onPress, theme }: Props) {
  if (theme == Theme.Regular) {
    return (
      <View
        style={[
          containers.buttonContainer,
          { borderWidth: 4, borderColor: color.ACCENT_YELLOW, borderRadius: 18 },
        ]}>
        <Pressable
          style={[buttons.regular_button, { backgroundColor: color.WHITE }]}
          onPress={() => onPress()}>
          <Text style={[buttons.buttonLabel, { color: color.DARK_GRAY }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={containers.buttonContainer}>
      <Pressable style={buttons.regular_button} onPress={() => alert('You pressed a button.')}>
        <Text style={buttons.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

