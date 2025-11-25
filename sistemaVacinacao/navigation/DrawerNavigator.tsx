import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '@/screens/HomeScreen';
import AgendamentosScreen from '@/screens/Agendamentos/AgendamentosScreen';
import CartoesScreen from '@/screens/Cartoes/CartoesScreen';
import CidadaosScreen from '@/screens/Cidadaos/CidadaosScreen';
import EnderecosScreen from '@/screens/Enderecos/EditarEnderecosScreen';
import FabricantesScreen from '@/screens/Fabricantes/FabricantesScreen';


export type DrawerParamList = {
    Vacinas: undefined;
    Agendamentos: undefined;
    Cartao: undefined;
    Cidadaos: undefined;
    Enderecos: undefined;
    Fabricantes: undefined;
    Funcionarios: undefined;
    Unidades: undefined;
    Home: undefined;
};


const Drawer = createDrawerNavigator<DrawerParamList>();


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#59372d',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#f0f0da', width: 250 },
        headerStyle: { backgroundColor: '#98c7b0' },
        headerTintColor: '#59372d',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Agendamentos"
        component={AgendamentosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          title: 'Agendamentos',
        }}
      />
      <Drawer.Screen
        name="Enderecos"
        component={EnderecosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          title: 'Endereços',
        }}
      />
      <Drawer.Screen
        name="Fabricantes"
        component={FabricantesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="pin-outline" size={size} color={color} />,
          title: 'Fabricantes',
        }}
      />  
      <Drawer.Screen
        name="Cidadaos"
        component={CidadaosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="person-add-outline" size={size} color={color} />,
          title: 'Cidadãos',
        }}
      />  
      <Drawer.Screen
        name="Cartao"
        component={CartoesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size} color={color} />,
          title: 'Cartões',
        }}
      />
    </Drawer.Navigator>  
  );
};


export default DrawerNavigator;


