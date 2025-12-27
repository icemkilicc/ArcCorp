import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  text: string;
  type?: 'error' | 'info' | 'success';
};

export function InlineAlert({ text, type = 'error' }: Props) {
  const style =
    type === 'success' ? styles.success : type === 'info' ? styles.info : styles.error;

  return (
    <View style={[styles.base, style]} accessibilityRole="alert">
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  text: { color: 'white', fontWeight: '600' },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
    borderColor: 'rgba(239, 68, 68, 0.45)',
  },
  info: {
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
    borderColor: 'rgba(59, 130, 246, 0.45)',
  },
  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
    borderColor: 'rgba(34, 197, 94, 0.45)',
  },
});



