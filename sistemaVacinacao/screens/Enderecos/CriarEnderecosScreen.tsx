import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';


type Props = DrawerScreenProps<DrawerParamList, 'CriarEnderecos'>;


const CriarEnderecosScreen = ({ navigation }: Props) => {


  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [saving, setSaving] = useState(false);


  useFocusEffect(
    useCallback(() => {
      setRua('');
      setBairro('');
      setCidade('');
      setEstado('');
    }, [])
  );


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/enderecos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rua,bairro,cidade,estado }),
    });
    navigation.navigate('Enderecos');  
    setSaving(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo endereço</Text>
      <Text style={styles.label}>Rua</Text>
      <TextInput
        value={rua}
        onChangeText={setRua}
        style={styles.input}
      />
      <Text style={styles.label}>Bairro</Text>
      <TextInput
        value={bairro}
        onChangeText={setBairro}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Text style={styles.label}>Cidade</Text>
      <TextInput
        value={cidade}
        onChangeText={setCidade}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Text style={styles.label}>Estado</Text>
      <TextInput
        value={estado}
        onChangeText={setEstado}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      {saving
        ? <ActivityIndicator size="large" color="#8b8b72" />
        : <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Enderecos')} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'center' },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});


export default CriarEnderecosScreen;
