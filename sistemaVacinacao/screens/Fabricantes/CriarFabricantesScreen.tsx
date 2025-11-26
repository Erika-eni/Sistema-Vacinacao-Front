import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'CriarFabricantes'>;


const CriarFabricantesScreen = ({ navigation }: Props) => {


  const [nome, setNome] = useState('');
  const [cnpj, setCnpj]  = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [endereco, setEndereco] = useState('');

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setCnpj('');
      setTelefone('');
      setEmail('');
      setEndereco('');
    }, [])
  );


  const handleSave = async () => {
    setSaving(true);
    console.log({
    nome,
    cnpj,
    telefone,
    email,
    endereco: Number(endereco),
  });
    const res = await fetch('http://localhost:8000/fabricantes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nome, cnpj, telefone, email, endereco: Number(endereco)}),
    });
    navigation.navigate('Fabricantes');  
    setSaving(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Fabricante</Text>
       <Text style={styles.label}>Nome</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
          <Text style={styles.label}>Cnpj</Text>
            <TextInput
              value={cnpj}
              onChangeText={setCnpj}
              style={styles.input}
            />
          <Text style={styles.label}>Telefone</Text>
          <TextInput
              value={telefone}
              onChangeText={setTelefone}
              style={styles.input}
            />
          <Text style={styles.label}>Email </Text>
          <TextInput
              value={email}
              placeholder="Formato: @ e .com"
              placeholderTextColor="#999"
              onChangeText={setEmail}
              style={styles.input}
            />
            <Text style={styles.label}>Endereco Id</Text>
          <TextInput
              value={endereco}
              onChangeText={setEndereco}
              style={styles.input}
            />
      {saving
        ? <ActivityIndicator size="large" color="#8b8b72" />
        : <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Fabricantes')} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffffff'
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


export default CriarFabricantesScreen;
