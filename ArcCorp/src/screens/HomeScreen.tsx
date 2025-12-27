import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, Text } from 'react-native-paper';

import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation, route }: Props) {
  const { message } = route.params;

  function onLogout() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Hoş geldiniz
      </Text>

      <Card mode="outlined" style={styles.card}>
        <Card.Title title="Backend Mesajı" />
        <Card.Content>
          <Text variant="titleMedium" style={styles.message}>
            {message}
          </Text>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={onLogout} style={styles.logout}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0b1220',
    justifyContent: 'center',
  },
  title: { color: 'white', textAlign: 'center', marginBottom: 16, fontWeight: '700' },
  card: { borderRadius: 16, backgroundColor: 'white' },
  message: { marginTop: 4 },
  logout: { marginTop: 16 },
});



