import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';


type Props = DrawerScreenProps<DrawerParamList, 'EditarCartoes'>;


const EditarCartoesScreen = ({ route, navigation }: Props) => {
  const { cartoes } = route.params;
  const [numero, setNumero] = useState(cartoes.numero);
  const [criacao, setCriacao] = useState(cartoes.criacao);
  const [zona, setZona] = useState(cartoes.zona);
  const [status, setStatus] = useState(cartoes.status);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    setNumero(cartoes.numero);
    setCriacao(cartoes.criacao);
    setZona(cartoes.zona);
    setStatus(cartoes.status);
  }, [cartoes]);  


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/cartoes/${cartoes.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero, criacao, zona, status}),
      }
    );
    navigation.navigate('Cartao');        
    setSaving(false);  
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Numero</Text>
      <TextInput
        value={numero}
        onChangeText={setNumero}
        style={styles.input}
      />
      <Text style={styles.label}>Criação (AAAA-MM-DD)</Text>
      <TextInput
        value={criacao}
        placeholder="Formato: AAAA-MM-DD"
        placeholderTextColor="#999"
        onChangeText={setCriacao}
        style={styles.input}
      />
      <Text style={styles.label}>Zona</Text>
            <Picker
              selectedValue={zona}
              onValueChange={(value) => setZona(value)}
              style={styles.input}
            >
              <Picker.Item label="Sul" value="SUL" />
              <Picker.Item label="Norte" value="NORTE" />
              <Picker.Item label="Leste" value="LESTE" />
              <Picker.Item label="Oeste" value="OESTE" />
            </Picker>
            <Text style={styles.label}>Status</Text>
            <Picker
              selectedValue={status}
              onValueChange={(value) => setStatus(value)}
              style={styles.input}
            >
              <Picker.Item label="Ativo" value="ATIVO" />
              <Picker.Item label="Bloqueado" value="BLOQUEADO" />
            </Picker>
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Cartao')} />
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


export default EditarCartoesScreen;
