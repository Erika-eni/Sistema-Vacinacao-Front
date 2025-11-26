import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Funcionarios'>;


export type Funcionarios = {
  id: number;
  nome: string;
  cpf: string;
  cargo: string;
  registro: string;
  unidade: number;
};


const FuncionariosScreen = ({ navigation }: Props) => {


  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchFuncionarios = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/funcionarios/');
    const data = await response.json();
    setFuncionarios(data);
    setLoading(false);
  };


  useFocusEffect(
    useCallback(() => {
      fetchFuncionarios();
    }, [])
  );


  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/funcionarios/${id}/`, {
      method: 'DELETE',
    });
    setFuncionarios(prev => prev.filter(c => c.id !== id));
  };


  const renderItem = ({ item }: { item: Funcionarios }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.cpf}>Id: {item.id}</Text>
      <Text style={styles.cpf}>{item.cpf}</Text>
      <Text style={styles.cargo}>{item.cargo}</Text>
      <Text style={styles.registro}>{item.registro}</Text>
      <Text style={styles.unidade}>Unidade ID: {item.unidade}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditarFuncionarios', { funcionarios: item })}
      >
      <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
      <Text style={styles.editText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Funcionarios</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={funcionarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('CriarFuncionarios')}
    >
      <Ionicons name="add" size={28} color="#f0f0da"  />
    </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0da',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#59382d',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#59382d',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#59382d',
  },
  cpf: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cargo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  registro: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  unidade: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#9ac6b1',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: {
    color: '#fff',
    fontWeight: '500'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#8b8b72',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#c74e16',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
    alignSelf: 'flex-end'
  },
});


export default FuncionariosScreen;
