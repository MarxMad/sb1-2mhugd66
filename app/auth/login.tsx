import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    // Simulate login
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
          
          <View style={styles.inputsContainer}>
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
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button 
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Link href="/auth/register" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
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
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  button: {
    marginBottom: 24,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  signupText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  }
});