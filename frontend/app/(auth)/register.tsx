import { useState } from 'react';
import { View, TextInput, Alert, Text } from 'react-native';
import { Button, Theme } from '@/components/components/Button';
import containers from '@/components/styles/style-container';
import texts from '@/components/styles/style-text';
import axios from 'axios';

type Props = {
  goBack: () => void;
};

export function Register({ goBack }: Props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    type: 'Regular',
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage(''); 
      const res = await axios.post('http://localhost:8080/users', form);
      Alert.alert('Success', `User created with ID: ${res.data.user_id}`);
    } catch (err: any) {
      console.error('Registration error:', err.message);
      const message = err.response?.data?.error || 'Failed to register user';
      setErrorMessage(message);
    }
  };
  

  return (
    <View style={containers.centered_conatiner}>
      <Text style={texts.header}>REGISTRATION!</Text>
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
      <TextInput
        placeholder="First Name"
        value={form.first_name}
        onChangeText={(val) => handleChange('first_name', val)}
        style={containers.inputContainer}
      />
      <TextInput
        placeholder="Last Name"
        value={form.last_name}
        onChangeText={(val) => handleChange('last_name', val)}
        style={containers.inputContainer}
      />

      <Button label="Register" theme={Theme.Regular} onPress={handleSubmit} />
      <Button label="Back to login" theme={Theme.Link} onPress={goBack} />

    </View>
  );
}
