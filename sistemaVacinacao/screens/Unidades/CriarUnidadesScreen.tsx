import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'CriarUnidades'>;


const CriarUnidadesScreen = ({ navigation }: Props) => {


  const [nome, setNome] = useState('');
  const [zona, setZona] = useState('URBANA');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('POSTO');
  const [saving, setSaving] = useState(false);
  const [endereco, setEndereco] = useState('');

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setZona('URBANA');
      setTelefone('');
      setTipo('POSTO');
      setEndereco('');
    }, [])
  );


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/unidades/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, zona, telefone, tipo, endereco: Number(endereco)}),
    });
    navigation.navigate('Unidades');  
    setSaving(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova unidade</Text>
      <Text style={styles.label}>Nome</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
        <Text style={styles.label}>Zona</Text>
            <Picker
            selectedValue={zona}
            onValueChange={(value) => setZona(value)}
            style={styles.input}
            >
            <Picker.Item label="Urbana" value="URBANA" />
            <Picker.Item label="Rural" value="RURAL" />
        </Picker>
        <Text style={styles.label}>Endereço</Text>
            <TextInput
              value={endereco}
              onChangeText={setEndereco}
              style={styles.input}
            />
        <Text style={styles.label}>Telefone</Text>
        <TextInput
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
        />
        <Text style={styles.label}>Tipo</Text> 
        <Picker
        selectedValue={tipo}
        onValueChange={(value) => setTipo(value)}
        style={styles.input}
        >
        <Picker.Item label="Posto de Saúde" value="POSTO" />
        <Picker.Item label="Hospita" value="HOSPITAL" />
        <Picker.Item label="Clínica" value="CLINICA" />
        </Picker>
      {saving
        ? <ActivityIndicator size="large" color="#8b8b72" />
        : <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Unidades')} />
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


export default CriarUnidadesScreen;
