import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';


type Props = DrawerScreenProps<DrawerParamList, 'EditarFuncionarios'>;


const EditarFuncionariosScreen = ({ route, navigation }: Props) => {
  const { funcionarios } = route.params;
  const [nome, setNome] = useState(funcionarios.nome);
  const [cpf, setCpf] = useState(funcionarios.cpf);
  const [cargo, setCargo] = useState(funcionarios.cargo);
  const [registro, setRegistro] = useState(funcionarios.registro);
  const [unidade, setUnidade] = useState(funcionarios.unidade.toString());
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    setNome(funcionarios.nome);
    setCpf(funcionarios.cpf);
    setCargo(funcionarios.cargo);
    setRegistro(funcionarios.registro);
    setUnidade(funcionarios.unidade.toString());
  }, [funcionarios]);  


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/funcionarios/${funcionarios.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome, cpf, cargo, registro, unidade: Number(unidade)} ),
      }
    );
    navigation.navigate('Funcionarios');        
    setSaving(false);  
  };


  return (
    <View style={styles.container}>
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
      <Text style={styles.label}>Cargo</Text>
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
      {saving ? (
        <ActivityIndicator size="large" color="#8b8b72" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      )}
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
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});


export default EditarFuncionariosScreen;
