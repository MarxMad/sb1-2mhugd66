import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>GRAIL</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the Grail ecosystem</Text>
          
          <View style={styles.inputsContainer}>
            <Input
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <Button 
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={styles.button}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.light.primary,
    letterSpacing: 3,
  },
  formContainer: {
    backgroundColor: Colors.light.card,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.tabIconDefault,
    marginBottom: 32,
  },
  inputsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  button: {
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  loginText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  }
});