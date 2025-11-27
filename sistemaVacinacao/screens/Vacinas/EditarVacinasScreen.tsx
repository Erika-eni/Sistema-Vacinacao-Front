import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';


type Props = DrawerScreenProps<DrawerParamList, 'EditarVacinas'>;


const EditarVacinasScreen = ({ route, navigation }: Props) => {
  const { vacinas } = route.params;
  const [nome, setNome] = useState(vacinas.nome);
  const [doses, setDoses] = useState(vacinas.doses);
  const [intervaloDias, setIntervaloDias] = useState(vacinas.intervaloDias);
  const [doenca, setDoenca] = useState(vacinas.doenca);
  const [fabricante, setFabricantes] = useState(vacinas.fabricante.toString());
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    setNome(vacinas.nome);
    setDoses(vacinas.doses);
    setIntervaloDias(vacinas.intervaloDias);
    setDoenca(vacinas.doenca);
    setFabricantes(vacinas.fabricante.toString());
  }, [vacinas]);  


  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/vacinas/${vacinas.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome, doses: Number(doses), intervaloDias: Number(intervaloDias), doenca, fabricante: Number(fabricante)} ),
      }
    );
    navigation.navigate('Vacinas');        
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
    <Text style={styles.label}>Doses</Text>
      <TextInput
        value={doses}
        onChangeText={setDoses}
        style={styles.input}
      />
      <Text style={styles.label}>Intervalo de dias</Text>
      <TextInput
        value={intervaloDias}
        onChangeText={setIntervaloDias}
        style={styles.input}
      />
    <Text style={styles.label}>Doenca</Text>
    <TextInput
        value={doenca}
        onChangeText={setDoenca}
        style={styles.input}
      />
      <Text style={styles.label}>Fabricante Id</Text>
    <TextInput
        value={fabricante}
        onChangeText={setFabricantes}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#8b8b72" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#9ac6b1" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Vacinas')} />
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


export default EditarVacinasScreen;
