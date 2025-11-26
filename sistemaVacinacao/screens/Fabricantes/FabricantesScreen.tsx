import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Fabricantes'>;


export type Fabricantes = {
  id: number;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: number;
};


const FabricantesScreen = ({ navigation }: Props) => {


  const [fabricantes, setFabricantes] = useState<Fabricantes[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchFabricantes = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/fabricantes/');
    const data = await response.json();
    setFabricantes(data);
    setLoading(false);
  };


  useFocusEffect(
    useCallback(() => {
      fetchFabricantes();
    }, [])
  );


  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/fabricantes/${id}/`, {
      method: 'DELETE',
    });
    setFabricantes(prev => prev.filter(c => c.id !== id));
  };


  const renderItem = ({ item }: { item: Fabricantes }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.cnpj}>Id: {item.id}</Text>
      <Text style={styles.cnpj}>{item.cnpj}</Text>
      <Text style={styles.telefone}>{item.telefone}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.endereco}>Endereco ID: {item.endereco}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditarFabricantes', { fabricantes: item })}
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
      <Text style={styles.title}>Fabricantes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#9ac6b1" />
      ) : (
        <FlatList
          data={fabricantes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('CriarFabricantes')}
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
  cnpj: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  telefone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  endereco: {
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


export default FabricantesScreen;
