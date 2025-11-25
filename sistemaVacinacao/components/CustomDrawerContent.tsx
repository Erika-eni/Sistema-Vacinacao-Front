import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/gato.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Olá, Usuário!</Text>
      </View>
      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};


const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#98c7b0',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#c74d14',
  },
  name: {
    color: '#c74d14',
    fontSize: 18,
    fontWeight: '600',
  },
});


export default CustomDrawerContent;
