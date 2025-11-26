import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'CriarCartoes'>;


const CriarCartoesScreen = ({ navigation }: Props) => {


  const [numero, setNumero] = useState('');
  const [criacao, setCriacao] = useState('');
  const [zona, setZona] = useState('SUL');
  const [status, setStatus] = useState("ATIVO");
  const [saving, setSaving] = useState(false);


  useFocusEffect(
    useCallback(() => {
      setNumero('');
      setCriacao('');
      setZona('');
      setStatus('ATIVO');
    }, [])
  );


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/cartoes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero, criacao, zona, status}),
    });
    navigation.navigate('Cartao');  
    setSaving(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Cartão</Text>
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
      {saving
        ? <ActivityIndicator size="large" color="#8b8b72" />
        : <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      }
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


export default CriarCartoesScreen;
