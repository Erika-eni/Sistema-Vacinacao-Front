import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';


type Props = DrawerScreenProps<DrawerParamList, 'EditarEnderecos'>;


const EditarEnderecosScreen = ({ route, navigation }: Props) => {
  const { enderecos } = route.params;
  const [rua, setRua] = useState(enderecos.rua);
  const [bairro, setBairro] = useState(enderecos.bairro);
  const [cidade, setCidade] = useState(enderecos.cidade);
  const [estado, setEstado] = useState(enderecos.estado);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    setRua(enderecos.rua);
    setBairro(enderecos.bairro);
    setCidade(enderecos.cidade);
    setEstado(enderecos.estado);
  }, [enderecos]);  


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/enderecos/${enderecos.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rua, bairro, cidade, estado  }),
      }
    );
    navigation.navigate('Enderecos');        
    setSaving(false);  
  };


  return (
    <View style={styles.container}>
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
        style={styles.input}
      />
      <Text style={styles.label}>Cidade</Text>
      <TextInput
        value={cidade}
        onChangeText={setCidade}
        style={styles.input}
      />
      <Text style={styles.label}>Estado</Text>
      <TextInput
        value={estado}
        onChangeText={setEstado}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#8b8b72" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      )}
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


export default EditarEnderecosScreen;
