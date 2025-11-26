import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'CriarFuncionarios'>;


const CriarFuncionariosScreen = ({ navigation }: Props) => {


  const [nome, setNome] = useState('');
  const [cpf, setCpf]  = useState('');
  const [cargo, setCargo] = useState('ENFERMEIRO');
  const [registro, setRegistro] = useState('');
  const [saving, setSaving] = useState(false);
  const [unidade, setUnidade] = useState('');

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setCpf('');
      setCargo('ENFERMEIRO');
      setRegistro('');
      setUnidade('');
    }, [])
  );


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/funcionarios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf, cargo, registro, unidade: Number(unidade)}),
    });
    navigation.navigate('Funcionarios');  
    setSaving(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Funcionário</Text>
      <Text style={styles.label}>Nome</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
      <Text style={styles.label}>Cpf</Text>
            <TextInput
              value={cpf}
              onChangeText={setCpf}
              style={styles.input}
            />
        <Text style={styles.label}>Tipo</Text> 
            <Picker
                selectedValue={cargo}
                onValueChange={(value) => setCargo(value)}
                style={styles.input}
                >
                <Picker.Item label="Enfermeiro" value="ENFERMEIRO" />
                <Picker.Item label="Médico" value="MEDICO" />
                <Picker.Item label="Administrativo" value="ADMINISTRATIVO" />
                <Picker.Item label="Outro" value="OUTROS" />
            </Picker>
        <Text style={styles.label}>Registro</Text>
        <TextInput
            value={registro}
            onChangeText={setRegistro}
            style={styles.input}
        />
        <Text style={styles.label}>Unidade</Text>
                    <TextInput
                      value={unidade}
                      onChangeText={setUnidade}
                      style={styles.input}
                    />
      {saving
        ? <ActivityIndicator size="large" color="#8b8b72" />
        : <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Funcionarios')} />
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


export default CriarFuncionariosScreen;
