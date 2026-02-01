import { Ionicons } from '@expo/vector-icons';
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
import { IconButton } from '../../components/ui/IconButton';
import { Input } from '../../components/ui/Input';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import type { SignUpData } from '../../types';

export default function SignUpScreen() {
  const [formData, setFormData] = useState<SignUpData>({
    fullName: '',
    farmName: '',
    phoneNumber: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpData, string>>>({});

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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.headerBar}>
          <IconButton
            icon={<Ionicons name="arrow-back" style={styles.backIcon} />}
            onPress={handleBack}
            variant="ghost"
          />
          <Text style={styles.headerTitle}>Sign Up</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Icon Section */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              {/* Tractor/Farm icon placeholder */}
              <View style={styles.iconPlaceholder} />
            </View>
          </View>

          {/* Header Text */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Your Farm Profile</Text>
            <Text style={styles.subtitle}>
              Start tracking your batches and profits today.
            </Text>
          </View>

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
            />

            <Input
              label="Farm Name"
              placeholder="e.g. Sunshine Poultry Farm"
              value={formData.farmName}
              onChangeText={(text) => updateField('farmName', text)}
              error={errors.farmName}
              autoCapitalize="words"
            />

            <Input
              label="Phone Number"
              type="phone"
              placeholder="801 234 5678"
              value={formData.phoneNumber}
              onChangeText={(text) => updateField('phoneNumber', text)}
              error={errors.phoneNumber}
              keyboardType="phone-pad"
              autoComplete="tel"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(text) => updateField('password', text)}
              error={errors.password}
              autoComplete="password-new"
            />

            <Button
              title="Create Account →"
              onPress={handleSignUp}
              loading={loading}
              fullWidth
              style={styles.createButton}
            />
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInPrompt}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignInPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.signInLink}>Sign In</Text>
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

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },

  headerTitle: {
    ...typography.h5,
    color: colors.textPrimary,
  },

  headerPlaceholder: {
    width: 40,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 28,
    backgroundColor: colors.primary,
  },

  header: {
    marginBottom: spacing.xl,
  },

  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },

  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  form: {
    marginBottom: spacing.md,
  },

  createButton: {
    marginTop: spacing.md,
  },

  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },

  signInPrompt: {
    ...typography.body,
    color: colors.textSecondary,
  },

  signInLink: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
});
