import { StyleSheet } from 'react-native';
import color from '@/assets/colors/colors';

const styles = StyleSheet.create({
    centered_conatiner:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    centered_container_dark: {
        flex: 1,
        backgroundColor: color.DARK_GRAY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    
});

export default styles;
