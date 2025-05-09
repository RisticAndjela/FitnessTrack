import { StyleSheet } from 'react-native';
import color from '@/assets/colors/colors';

const styles = StyleSheet.create({
    centered_conatiner:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width:'80%',
      marginLeft:'10%'
    },
    centered_container_dark: {
        flex: 1,
        backgroundColor: color.DARK_GRAY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width:'50%',
        height: 50,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        margin: 5
    },
    inputContainer: {
        marginVertical: 6,
        backgroundColor: 'white',
        padding: 10,
        width: '95%' 
    }
    
});

export default styles;
