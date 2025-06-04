import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import Colors from '@/constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          style
        ]}
        placeholderTextColor={Colors.light.tabIconDefault}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    color: Colors.light.text,
  },
  inputError: {
    borderColor: Colors.light.error,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 12,
    marginTop: 4,
  },
});