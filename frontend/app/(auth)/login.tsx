import { useState } from 'react';
import { View, TextInput, Text, Alert } from 'react-native';
import { Button, Theme } from '@/components/components/Button';
import containers from '@/components/styles/style-container';
import texts from '@/components/styles/style-text';
import { Register } from './register'; 
import axios from 'axios';
import { useAuth } from '@/context/authContext';

export default function LogIn() {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    username: '',
    password: '',
    type: 'Regular',
  });

  const [showRegister, setShowRegister] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage(''); 
      const res = await axios.post('http://localhost:8080/users/login', {
        username: form.username,
        password: form.password,
      });
      console.log("logged in");
      login();
      
      Alert.alert('Success', `Welcome, ${res.data.first_name}!`);
    } catch (err: any) {
      console.error('Login error:', err.message);
      const message = err.response?.data?.error || 'Login failed';
      setErrorMessage(message);
    }
  };
  

  if (showRegister) {
    return <Register goBack={() => setShowRegister(false)} />;
  }

  return (
    <View style={containers.centered_conatiner}>
      <Text style={texts.header}>WELCOME BACK!</Text>
      {errorMessage !== '' && (
        <Text style={texts.error_right}>{errorMessage}</Text>
      )}
      <TextInput
        placeholder="Username"
        value={form.username}
        onChangeText={(val) => handleChange('username', val)}
        style={containers.inputContainer}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(val) => handleChange('password', val)}
        style={containers.inputContainer}
      />

      <Button label="Log In" theme={Theme.Regular} onPress={handleSubmit} />
      <Text>You don't have an account? </Text>
      <Button label="Register now!" theme={Theme.Link} onPress={() => setShowRegister(true)} />
    </View>
  );
}
