import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, DatePicker, IconButton, Input, Select } from '../../components/ui';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

type ExpenseCategory = 'chicks' | 'feed' | 'drugs' | 'labor' | 'utilities' | 'misc';

interface CategoryOption {
  id: ExpenseCategory;
  label: string;
  icon: React.ReactNode;
}

const categories: CategoryOption[] = [
  { id: 'chicks', label: 'Chicks', icon: <Ionicons name="paw-outline" size={24} color="black" /> },
  { id: 'feed', label: 'Feed', icon: <Ionicons name="nutrition-outline" size={24} color="black" /> },
  { id: 'drugs', label: 'Drugs', icon: <Ionicons name="medkit-outline" size={24} color="black" /> },
  { id: 'labor', label: 'Labor', icon: <Ionicons name="people-outline" size={24} color="black" /> },
  { id: 'utilities', label: 'Utilities', icon: <Ionicons name="flash-outline" size={24} color="black" /> },
  { id: 'misc', label: 'Misc', icon: <Ionicons name="ellipsis-horizontal-outline" size={24} color="black" /> },
];

const batchOptions = [
  { label: 'Batch A - Broilers (Oct 2025)', value: 'Batch A - Broilers (Oct 2025)' },
  { label: 'Batch B - Layers (Nov 2025)', value: 'Batch B - Layers (Nov 2025)' },
  { label: 'Batch C - Broilers (Jan 2026)', value: 'Batch C - Broilers (Jan 2026)' },
];

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory | null>(null);
  const [selectedBatch, setSelectedBatch] = useState('Batch A - Broilers (Oct 2025)');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US'));
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    // router.back();
    router.replace('/(tabs)');
  }, []);

  const handleHelp = useCallback(() => {
    // TODO: Show help modal
    console.log('Help pressed');
  }, []);

  const handleSave = useCallback(async () => {
    if (!amount || !category) {
      // TODO: Show validation error
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Expense saved', { amount, category, selectedBatch, date, notes });
      router.back();
    } catch (error) {
      console.error('Save expense error:', error);
    } finally {
      setLoading(false);
    }
  }, [amount, category, selectedBatch, date, notes]);



  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <IconButton
            icon={<Text style={styles.closeIcon}>✕</Text>}
            onPress={handleClose}
            variant="ghost"
          />
          <Text style={styles.headerTitle}>Add Expense</Text>
          <IconButton
            icon={<Text style={styles.helpIcon}>?</Text>}
            onPress={handleHelp}
            variant="ghost"
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Amount */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>AMOUNT</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>₦</Text>
              <Input
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                containerStyle={styles.amountInput}
              />
            </View>
          </View>

          {/* Category */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>CATEGORY</Text>
              <TouchableOpacity>
                <Text style={styles.selectOneText}>Select one</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoriesGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryButton,
                    category === cat.id && styles.categoryButtonSelected,
                  ]}
                  onPress={() => setCategory(cat.id)}
                  activeOpacity={0.7}
                >
                  {typeof cat.icon === 'string' ? (
                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                  ) : (
                    <View style={styles.categoryIconContainer}>{cat.icon}</View>
                  )}
                  <Text
                    style={[
                      styles.categoryLabel,
                      category === cat.id && styles.categoryLabelSelected,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Select Batch */}
          <Select
            label="SELECT BATCH"
            value={selectedBatch}
            options={batchOptions}
            onSelect={setSelectedBatch}
          />

          {/* Date */}
          <DatePicker
            label="DATE"
            value={date}
            onChange={setDate}
          />

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>NOTES (OPTIONAL)</Text>
            <Input
              placeholder="e.g. Purchased 50 bags of starter feed from AgroStore"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              containerStyle={styles.notesInput}
            />
          </View>

          {/* Save Button */}
          <Button
            title="💾 Save Expense"
            onPress={handleSave}
            loading={loading}
            fullWidth
            disabled={!amount || !category}
          />
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.white,
  },

  closeIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },

  headerTitle: {
    ...typography.h5,
    color: colors.textPrimary,
  },

  helpIcon: {
    fontSize: 20,
    color: colors.textPrimary,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: spacing.lg,
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  sectionLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: spacing.md,
  },

  selectOneText: {
    ...typography.caption,
    color: colors.primary,
  },

  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingLeft: spacing.md,
  },

  currencySymbol: {
    ...typography.h2,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },

  amountInput: {
    flex: 1,
    marginBottom: 0,
    borderWidth: 0,
    outline: 'none',
  },

  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },

  categoryButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },

  categoryButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },

  categoryIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  categoryIconContainer: {
    marginBottom: spacing.xs,
  },

  categoryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },

  categoryLabelSelected: {
    color: colors.textPrimary,
  },



  notesInput: {
    marginBottom: 0,
  },
});
