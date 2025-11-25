import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '@/navigation/DrawerNavigator';


type Props = DrawerScreenProps<DrawerParamList, 'Enderecos'>;


export type Enderecos = {
  id: number;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
};


const EnderecosScreen = ({ navigation }: Props) => {


  const [enderecos, setEnderecos] = useState<Enderecos[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchEnderecos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/enderecos/');
    const data = await response.json();
    setEnderecos(data);
    setLoading(false);
  };


  useFocusEffect(
    useCallback(() => {
      fetchEnderecos();
    }, [])
  );


  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/enderecos/${id}/`, {
      method: 'DELETE',
    });
    setEnderecos(prev => prev.filter(c => c.id !== id));
  };


  const renderItem = ({ item }: { item: Enderecos }) => (
    <View style={styles.card}>
      <Text style={styles.rua}>{item.rua}</Text>
      <Text style={styles.bairro}>{item.bairro}</Text>
      <Text style={styles.cidade}>{item.cidade}</Text>
      <Text style={styles.estado}>{item.estado}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditarEnderecos', { enderecos: item })}
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
      <Text style={styles.title}>Endereços</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={enderecos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('CriarEnderecos')}
    >
      <Ionicons name="add" size={28} color="#fff"  />
    </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  rua: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  bairro: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cidade: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  estado: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#4B7BE5',
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
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#E54848',
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


export default EnderecosScreen;
