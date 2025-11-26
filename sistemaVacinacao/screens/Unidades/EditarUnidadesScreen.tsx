import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';


type Props = DrawerScreenProps<DrawerParamList, 'EditarUnidades'>;


const EditarUnidadesScreen = ({ route, navigation }: Props) => {
  const { unidades } = route.params;
  const [nome, setNome] = useState(unidades.nome);
  const [zona, setZona] = useState(unidades.zona);
  const [telefone, setTelefone] = useState(unidades.telefone);
  const [tipo, setTipo] = useState(unidades.tipo);
  const [endereco, setEndereco] = useState(unidades.endereco.toString());
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    setNome(unidades.nome);
    setTelefone(unidades.telefone);
    setZona(unidades.zona);
    setTipo(unidades.tipo);
    setEndereco(unidades.endereco.toString());
  }, [unidades]);  


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/unidades/${unidades.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, zona, telefone, tipo, endereco: Number(endereco)} ),
      }
    );
    navigation.navigate('Unidades');        
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
      <Text style={styles.label}>Zona</Text>
            <Picker
              selectedValue={zona}
              onValueChange={(value) => setZona(value)}
              style={styles.input}
            >
              <Picker.Item label="Urbana" value="URBANA" />
              <Picker.Item label="Rural" value="RURAL" />
            </Picker>
    
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
      <Text style={styles.label}>Enderço</Text>
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
      <Button title="Voltar" onPress={() => navigation.navigate('Unidades')} />
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


export default EditarUnidadesScreen;
