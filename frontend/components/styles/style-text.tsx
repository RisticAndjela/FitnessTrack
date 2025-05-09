import { StyleSheet } from 'react-native';
import color from '@/assets/colors/colors';

const styles = StyleSheet.create({
    header:{
        color:color.ACCENT_YELLOW,
        fontSize:36,
        fontWeight:'bold',
        padding:10
    },
    error_right:{
        alignSelf:'flex-end',
        color: 'red',
        marginBottom: 10
    }
});

export default styles;
