import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { DrawerParamList } from '../../navigation/DrawerNavigator';


type Props = DrawerScreenProps<DrawerParamList, 'Cartao'>;


const CartoesScreen = ({ navigation }: Props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text >Cartoes</Text>
  </View>
);


export default CartoesScreen;