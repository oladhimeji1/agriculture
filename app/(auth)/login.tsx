import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
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

interface LoginData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});

  const updateField = useCallback((field: keyof LoginData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof LoginData, string>> = {};

    // if (!formData.email.trim()) {
    //   newErrors.email = 'Email is required';
    // } else if (formData.email.length < 10) {
    //   newErrors.email = 'Enter a valid email';
    // }

    // if (!formData.password.trim()) {
    //   newErrors.password = 'Password is required';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // console.log('Login successful', formData);

      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }, [validateForm, formData]);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleSignUpPress = useCallback(() => {
    router.push('/(auth)/signup');
  }, []);

  const handleForgotPassword = useCallback(() => {
    // TODO: Navigate to forgot password screen
    console.log('Forgot password pressed');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#35a35d" />

      {/* Gradient Background */}
      <LinearGradient
        colors={['#35a35dff', '#2d8a4f', '#35a35dff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            {/* Back Button */}
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#ffffff" />
            </TouchableOpacity>

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Logo and Title Section */}
              <View style={styles.headerSection}>
                <View style={styles.logoContainer}>
                  <View style={styles.logoCircle}>
                    <Text style={styles.logoEmoji}>🐔</Text>
                  </View>
                </View>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>
              </View>

              {/* White Card */}
              <View style={styles.card}>
                {/* Form */}
                <View style={styles.form}>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="johndoe@example.com"
                    value={formData.email}
                    onChangeText={(text) => updateField('email', text)}
                    error={errors.email}
                    keyboardType="email-address"
                    autoComplete="email"
                    style={styles.input}
                  />

                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChangeText={(text) => updateField('password', text)}
                    error={errors.password}
                    autoComplete="password"
                    style={styles.input}
                  />

                  {/* Forgot Password */}
                  <TouchableOpacity
                    onPress={handleForgotPassword}
                    style={styles.forgotPasswordContainer}
                  >
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <Button
                    title="Sign In"
                    onPress={handleLogin}
                    loading={loading}
                    fullWidth
                    style={styles.loginButton}
                  />

                  {/* Sign Up Link */}
                  <View style={styles.signUpContainer}>
                    <Text style={styles.signUpPrompt}>Don't have an account? </Text>
                    <TouchableOpacity
                      onPress={handleSignUpPress}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.signUpLink}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Divider */}
                  <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Or</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  <View style={styles.socialButtonContainer}>
                    {/* Social Login Buttons */}
                    <TouchableOpacity style={styles.socialButton}>
                      <Ionicons name="logo-google" size={20} color="#DB4437" />
                      {/* <Text style={styles.socialButtonText}>Continue with Google</Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                      <Ionicons name="logo-apple" size={20} color="#000000" />
                      {/* <Text style={styles.socialButtonText}>Continue with Apple</Text> */}
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gradientBackground: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    marginTop: spacing.xs,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },

  headerSection: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl * 1.5,
  },

  logoContainer: {
    marginBottom: spacing.lg,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },

  logoEmoji: {
    fontSize: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: spacing.xs,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },

  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },

  form: {
    width: '100%',
  },

  input: {
    width: '100%',
    height: '100%',
  },

  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
    marginTop: -spacing.xs,
  },

  forgotPasswordText: {
    ...typography.body,
    color: '#35a35dff',
    fontSize: 14,
    fontWeight: '600',
  },

  loginButton: {
    backgroundColor: '#35a35dff',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md + 2,
    marginBottom: spacing.lg,
    shadowColor: '#35a35dff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },

  dividerText: {
    ...typography.body,
    color: colors.textTertiary,
    marginHorizontal: spacing.md,
    fontSize: 14,
  },

  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },

  socialButtonText: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  signUpPrompt: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
  },

  signUpLink: {
    ...typography.body,
    color: '#35a35dff',
    fontWeight: '700',
    fontSize: 14,
  },
});