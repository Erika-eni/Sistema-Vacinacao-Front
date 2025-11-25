import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '@/screens/HomeScreen';
import AgendamentosScreen from '@/screens/Agendamentos/AgendamentosScreen';
import CartoesScreen from '@/screens/Cartoes/CartoesScreen';
import CidadaosScreen from '@/screens/Cidadaos/CidadaosScreen';
import EnderecosScreen, { Enderecos } from '@/screens/Enderecos/EnderecosScreen';
import FabricantesScreen from '@/screens/Fabricantes/FabricantesScreen';
import FuncionariosScreen from '@/screens/Funcionarios/FuncionariosScreen';
import UnidadesScreen from '@/screens/Unidades/UnidadesScreen';
import VacinasScreen from '@/screens/Vacinas/VacinasScreen';
import CriarEnderecosScreen from '@/screens/Enderecos/CriarEnderecosScreen';
import EditarEnderecosScreen from '@/screens/Enderecos/EditarEnderecosScreen';



export type DrawerParamList = {
    Vacinas: undefined;
    Agendamentos: undefined;
    Cartao: undefined;
    Cidadaos: undefined;
    Enderecos: undefined;
    EditarEnderecos: {enderecos: Enderecos};
    CriarEnderecos:undefined;
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
        name="Vacinas"
        component={VacinasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="eyedrop-outline" size={size} color={color} />,
          title: 'Vacinas',
        }}
      />
      <Drawer.Screen
        name="Unidades"
        component={UnidadesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="trail-sign-outline" size={size} color={color} />,
          title: 'Unidades',
        }}
      /> 
      <Drawer.Screen
        name="Enderecos"
        component={EnderecosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="golf-outline" size={size} color={color} />,
          title: 'Endereços',
        }}
      />
      <Drawer.Screen
        name="CriarEnderecos"
        component={CriarEnderecosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Departamentos' }}
      />
      <Drawer.Screen
        name="EditarEnderecos"
        component={EditarEnderecosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar departamento' }}
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
        name="Funcionarios"
        component={FuncionariosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          title: 'Funcionarios',
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


