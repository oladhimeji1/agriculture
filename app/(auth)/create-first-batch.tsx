import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
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
import { IconButton } from '../../components/ui/IconButton';
import { Input } from '../../components/ui/Input';
import { RadioCard } from '../../components/ui/RadioCard';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import type { BatchData } from '../../types';

export default function CreateFirstBatchScreen() {
  const [batchData, setBatchData] = useState<Partial<BatchData>>({
    name: '',
    birdType: undefined,
    numberOfBirds: 0,
    startDate: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BatchData, string>>>({});

  const updateField = useCallback((field: keyof BatchData, value: any) => {
    setBatchData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof BatchData, string>> = {};

    if (!batchData.name?.trim()) {
      newErrors.name = 'Batch name is required';
    }

    if (!batchData.birdType) {
      newErrors.birdType = 'Please select a bird type';
    }

    if (!batchData.numberOfBirds || batchData.numberOfBirds <= 0) {
      newErrors.numberOfBirds = 'Number of birds must be greater than 0';
    }

    if (!batchData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [batchData]);

  const handleStartBatch = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Batch created successfully', batchData);
      
      // Navigate to main app using Expo Router
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Create batch error:', error);
    } finally {
      setLoading(false);
    }
  }, [validateForm, batchData]);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.headerBar}>
          <IconButton
            icon={<Text style={styles.backIcon}>←</Text>}
            onPress={handleBack}
            variant="ghost"
          />
          <Text style={styles.headerTitle}>Create First Batch</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Text */}
          <View style={styles.header}>
            <Text style={styles.title}>Start Your First Batch</Text>
            <Text style={styles.subtitle}>
              Tell us about your current flock to start tracking your poultry
              farm's performance.
            </Text>
          </View>

          {/* Batch Name */}
          <View style={styles.section}>
            <Input
              label="Batch Name"
              placeholder="e.g., June Broilers"
              value={batchData.name}
              onChangeText={(text) => updateField('name', text)}
              error={errors.name}
              autoCapitalize="words"
            />
          </View>

          {/* Bird Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Select Bird Type</Text>
            <View style={styles.birdTypeContainer}>
              <RadioCard
                label="Broilers"
                sublabel="Meat production"
                icon={<View style={styles.broilerIcon} />}
                selected={batchData.birdType === 'broilers'}
                onPress={() => updateField('birdType', 'broilers')}
                containerStyle={styles.radioCard}
              />
              <RadioCard
                label="Layers"
                sublabel="Egg production"
                icon={<View style={styles.layerIcon} />}
                selected={batchData.birdType === 'layers'}
                onPress={() => updateField('birdType', 'layers')}
                containerStyle={styles.radioCard}
              />
            </View>
            {errors.birdType && (
              <Text style={styles.errorText}>{errors.birdType}</Text>
            )}
          </View>

          {/* Number of Birds and Start Date */}
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Text style={styles.inputLabel}>Number of Birds</Text>
              <View style={styles.numberInput}>
                <Input
                  placeholder="0"
                  value={batchData.numberOfBirds?.toString() || ''}
                  onChangeText={(text) => {
                    const num = parseInt(text) || 0;
                    updateField('numberOfBirds', num);
                  }}
                  keyboardType="number-pad"
                  error={errors.numberOfBirds}
                  containerStyle={styles.numberInputContainer}
                />
              </View>
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TouchableOpacity style={styles.dateInput} activeOpacity={0.7}>
                <Text style={styles.dateText}>
                  {formatDate(batchData.startDate || new Date().toISOString())}
                </Text>
                <Text style={styles.calendarIcon}>📅</Text>
              </TouchableOpacity>
              {errors.startDate && (
                <Text style={styles.errorText}>{errors.startDate}</Text>
              )}
            </View>
          </View>

          {/* Start Button */}
          <Button
            title="Start Batch 🚀"
            onPress={handleStartBatch}
            loading={loading}
            fullWidth
            style={styles.startButton}
          />

          {/* Terms */}
          <Text style={styles.terms}>
            By starting, you agree to our terms of service for poultry management.
          </Text>
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },

  header: {
    marginBottom: spacing.xl,
  },

  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionLabel: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  birdTypeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  radioCard: {
    flex: 1,
  },

  broilerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },

  layerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray400,
  },

  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  rowItem: {
    flex: 1,
  },

  inputLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  numberInput: {
    flex: 1,
  },

  numberInputContainer: {
    marginBottom: 0,
  },

  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: borderRadius.md,
    height: 56,
    paddingHorizontal: spacing.md,
  },

  dateText: {
    ...typography.body,
    color: colors.textPrimary,
  },

  calendarIcon: {
    fontSize: 20,
  },

  startButton: {
    marginBottom: spacing.md,
  },

  terms: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },

  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
