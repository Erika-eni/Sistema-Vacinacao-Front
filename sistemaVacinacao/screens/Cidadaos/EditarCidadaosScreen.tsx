import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

console.log(">>> COMPONENTE EDITAR FOI CARREGADO");
type Props = DrawerScreenProps<DrawerParamList, 'EditarCidadaos'>;


const EditarCidadaosScreen = ({ route, navigation }: Props) => {
  const { cidadaos } = route.params;
  const [nome, setNome] = useState(cidadaos.nome);
  const [cpf, setcpf] = useState(cidadaos.cpf);
  const [nascimento, setnascimento] = useState(cidadaos.nascimento);
  const [idade, setidade] = useState(cidadaos.idade.toString());
  const [endereco, setEndereco] = useState(cidadaos.endereco.join(','));
  const [cartao, setCartao] = useState(cidadaos.cartao.toString());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(cidadaos.nome);
    setcpf(cidadaos.cpf);
    setnascimento(cidadaos.nascimento);
    setidade(cidadaos.idade.toString());
    setEndereco(cidadaos.endereco.toString());
    setCartao(cidadaos.cartao.toString());
  }, [cidadaos]);  


  const handleSave = async () => {
    setSaving(true);
    const enderecosArray = endereco
      .split(',')
      .map(v => Number(v.trim()))
      .filter(v => !isNaN(v));
    const res = await fetch(
      `http://localhost:8000/cidadaos/${cidadaos.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome, cpf, nascimento, idade: Number(idade), endereco: enderecosArray, cartao: Number(cartao)} ),
      }
    );
    navigation.navigate('Cidadaos');        
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
    <Text style={styles.label}>Idade</Text>
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
      {saving ? (
        <ActivityIndicator size="large" color="#8b8b72" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      )}
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


export default EditarCidadaosScreen;
