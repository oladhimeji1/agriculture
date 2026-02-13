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
import type { SignUpData } from '../../types';

export default function SignUpScreen() {
  const [formData, setFormData] = useState<SignUpData>({
    fullName: '',
    farmName: '',
    phoneNumber: '',
    password: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpData, string>>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const updateField = useCallback((field: keyof SignUpData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof SignUpData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData.farmName.trim()) {
      newErrors.farmName = 'Farm name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSignUp = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Sign up successful', formData);

      // Navigate to onboarding using Expo Router
      router.push('/(auth)/create-first-batch');
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  }, [validateForm, formData]);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleSignInPress = useCallback(() => {
    router.push('/(auth)/login');
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
                <Text style={styles.title}>Create an Account</Text>
              </View>

              {/* White Card */}
              <View style={styles.card}>
                {/* Form */}
                <View style={styles.form}>
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChangeText={(text) => updateField('fullName', text)}
                    error={errors.fullName}
                    autoComplete="name"
                    autoCapitalize="words"
                    style={styles.input}
                  />

                  <Input
                    label="Farm Name"
                    placeholder="e.g. Sunshine Poultry Farm"
                    value={formData.farmName}
                    onChangeText={(text) => updateField('farmName', text)}
                    error={errors.farmName}
                    autoCapitalize="words"
                    style={styles.input}
                  />

                  <Input
                    label="Email Address"
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChangeText={(text) => updateField('password', text)}
                    error={errors.password}
                    autoComplete="password-new"
                    style={styles.input}
                  />

                  {/* Terms Checkbox */}
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setAcceptedTerms(!acceptedTerms)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                      {acceptedTerms && (
                        <Ionicons name="checkmark" size={16} color="#ffffff" />
                      )}
                    </View>
                    <Text style={styles.checkboxLabel}>
                      I agree to the terms & conditions
                    </Text>
                  </TouchableOpacity>

                  <Button
                    title="Create Account"
                    onPress={handleSignUp}
                    loading={loading}
                    fullWidth
                    style={styles.createButton}
                    disabled={!acceptedTerms}
                  />

                  {/* Sign In Link */}
                  <View style={styles.signInContainer}>
                    <Text style={styles.signInPrompt}>Already have an account? </Text>
                    <TouchableOpacity
                      onPress={handleSignInPress}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.signInLink}>Log In</Text>
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
    paddingBottom: 0,
  },

  headerSection: {
    alignItems: 'center',
    // paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },

  logoContainer: {
    marginBottom: spacing.sm,
  },

  logoCircle: {
    width: 60,
    height: 60,
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

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#35a35dff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },

  checkboxChecked: {
    backgroundColor: '#35a35dff',
    borderColor: '#35a35dff',
  },

  checkboxLabel: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
  },

  createButton: {
    backgroundColor: '#35a35dff',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md + 2,
    marginBottom: spacing.md,
    shadowColor: '#35a35dff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.sm,
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

  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  signInPrompt: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
  },

  signInLink: {
    ...typography.body,
    color: '#35a35dff',
    fontWeight: '700',
    fontSize: 14,
  },
});