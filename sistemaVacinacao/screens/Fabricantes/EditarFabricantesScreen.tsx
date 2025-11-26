import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';


type Props = DrawerScreenProps<DrawerParamList, 'EditarFabricantes'>;


const EditarFabricantesScreen = ({ route, navigation }: Props) => {
  const { fabricantes } = route.params;
  const [nome, setNome] = useState(fabricantes.nome);
  const [cnpj, setCnpj] = useState(fabricantes.cnpj);
  const [telefone, setTelefone] = useState(fabricantes.telefone);
  const [email, setEmail] = useState(fabricantes.email);
  const [endereco, setEndereco] = useState(fabricantes.endereco.toString());
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    setNome(fabricantes.nome);
    setCnpj(fabricantes.cnpj);
    setTelefone(fabricantes.telefone);
    setEmail(fabricantes.email);
    setEndereco(fabricantes.endereco.toString());
  }, [fabricantes]);  


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/fabricantes/${fabricantes.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome, cnpj, telefone, email, endereco: Number(endereco)} ),
      }
    );
    navigation.navigate('Fabricantes');        
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
    <Text style={styles.label}>Email</Text>
    <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Text style={styles.label}>Endereco Id</Text>
    <TextInput
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#8b8b72" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      )}
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


export default EditarFabricantesScreen;
