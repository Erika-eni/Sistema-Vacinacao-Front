import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';


type Props = DrawerScreenProps<DrawerParamList, 'CriarCidadaos'>;


const CriarCidadaosScreen = ({ navigation }: Props) => {


  const [nome, setNome] = useState('');
  const [cpf, setcpf]  = useState('');
  const [nascimento, setnascimento] = useState('');
  const [idade, setidade] = useState('');
  const [saving, setSaving] = useState(false);
  const [endereco, setEndereco] = useState('');
  const [cartao, setCartao] = useState('');

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setcpf('');
      setnascimento('');
      setidade('');
      setEndereco('');
      setCartao('');
    }, [])
  );


  const handleSave = async () => {
    setSaving(true);
    const enderecosArray = endereco
      .split(',')
      .map(v => Number(v.trim()))
      .filter(v => !isNaN(v));
    const res = await fetch('http://localhost:8000/cidadaos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nome, cpf, nascimento, idade: Number(idade), endereco: enderecosArray, cartao: Number(cartao)} ),
    });
    navigation.navigate('Cidadaos');  
    setSaving(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Cidadão</Text>
       <Text style={styles.label}>Nome</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
          <Text style={styles.label}>cpf</Text>
            <TextInput
              value={cpf}
              onChangeText={setcpf}
              style={styles.input}
            />
          <Text style={styles.label}>nascimento (AAAA-MM-DD)</Text>
          <TextInput
              value={nascimento}
              placeholder="Formato: AAAA-MM-DD"
              placeholderTextColor="#999"
              onChangeText={setnascimento}
              style={styles.input}
            />
          <Text style={styles.label}>idade </Text>
          <TextInput
              value={idade}
              onChangeText={setidade}
              style={styles.input}
            />
            <Text style={styles.label}>Endereco (IDs separados por vírgula)</Text>
          <TextInput
              value={endereco}
              onChangeText={setEndereco}
              style={styles.input}
            />
        <Text style={styles.label}>Cartão Id</Text>
          <TextInput
              value={cartao}
              onChangeText={setCartao}
              style={styles.input}
            />
      {saving
        ? <ActivityIndicator size="large" color="#8b8b72" />
        : <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Cidadaos')} />
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


export default CriarCidadaosScreen;
