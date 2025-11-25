import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { DrawerParamList } from '../../navigation/DrawerNavigator';


type Props = DrawerScreenProps<DrawerParamList, 'Enderecos'>;


const EnderecosScreen = ({ navigation }: Props) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text >Produtos</Text>
  </View>
);


export default EnderecosScreen;