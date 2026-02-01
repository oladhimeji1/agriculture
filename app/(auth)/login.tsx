import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [biometryType, setBiometryType] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    phoneNumber?: string;
    password?: string;
  }>({});

  const validateForm = useCallback(() => {
    const newErrors: typeof errors = {};

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [phoneNumber, password]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Login successful', { phoneNumber, password });
      
      // Navigate to main app using Expo Router
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }, [validateForm, phoneNumber, password]);

  const handleSignUpPress = useCallback(() => {
    router.push('/(auth)/signup');
  }, []);

  const handleForgotPassword = useCallback(() => {
    // TODO: Implement forgot password flow
    console.log('Forgot password pressed');
  }, []);

  const handleBiometricLogin = useCallback(async () => {
    try {
      // Check if hardware supports biometrics
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Biometric hardware not available');
        return;
      }

      // Check if biometrics are enrolled
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('No biometrics found', 'Please set up Face ID or Touch ID');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with biometrics',
        fallbackLabel: 'Use passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false, // allows passcode
      });

      if (result.success) {
        console.log('Biometric authentication successful');

        // 👉 Your login logic here
        // loginUser();
      }
    } catch (error) {
      console.log('Biometric error:', error);
    }
  }, []);

  useEffect(() => {
    LocalAuthentication.supportedAuthenticationTypesAsync().then(types => {
      if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        setBiometryType('face');
      } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setBiometryType('fingerprint');
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <View style={styles.logoInner}>
                {/* Placeholder for chicken icon */}
                <View style={styles.logoPlaceholder} />
              </View>
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Manage your batches and track profits
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Phone Number"
              type="phone"
              placeholder="803 XXX XXXX"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                if (errors.phoneNumber) {
                  setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                }
              }}
              error={errors.phoneNumber}
              keyboardType="phone-pad"
              autoComplete="tel"
            />

            <View style={styles.passwordContainer}>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
                error={errors.password}
                autoComplete="password"
              />
              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.forgotText}>Forgot?</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.signInButton}
            />
          </View>

          {/* Quick Access */}
          <View style={styles.quickAccess}>
            <Text style={styles.biometricText}>
            {biometryType === 'face' ? 'Use Face ID' : 'Use Touch ID'}
          </Text>
            <TouchableOpacity
              style={styles.biometricButton}
              onPress={handleBiometricLogin}
              activeOpacity={0.7}
            >
              <View style={styles.biometricIcon}>
                {/* Fingerprint icon placeholder */}
                <View style={styles.fingerprintPlaceholder} />
              </View>
              <Text style={styles.biometricText}>Use Touch ID</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpPrompt}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUpPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
  },

  header: {
    marginBottom: spacing.xl,
  },

  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },

  form: {
    marginBottom: spacing.xl,
  },

  passwordContainer: {
    position: 'relative',
  },

  forgotButton: {
    position: 'absolute',
    top: spacing.sm,
    right: 0,
  },

  forgotText: {
    ...typography.labelSmall,
    color: colors.primary,
  },

  signInButton: {
    marginTop: spacing.lg,
  },

  quickAccess: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  quickAccessLabel: {
    ...typography.captionSmall,
    color: colors.textTertiary,
    letterSpacing: 1,
    marginBottom: spacing.md,
  },

  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  biometricIcon: {
    width: 24,
    height: 24,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  fingerprintPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  biometricText: {
    ...typography.body,
    color: colors.textPrimary,
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signUpPrompt: {
    ...typography.body,
    color: colors.textSecondary,
  },

  signUpLink: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
});
