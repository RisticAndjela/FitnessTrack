import { StyleSheet } from 'react-native';
import color from '@/assets/colors/colors';

const styles = StyleSheet.create({
    link_button:{
        fontSize: 20,
        textDecorationLine: 'underline',
        color: color.WHITE,
    },
    regular_button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: color.WHITE,
        fontSize: 16,
    },
});

export default styles;
