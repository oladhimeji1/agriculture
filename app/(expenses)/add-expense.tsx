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
  { id: 'chicks', label: 'Chicks', icon: '🐣' },
  { id: 'feed', label: 'Feed', icon: '🌾' },
  { id: 'drugs', label: 'Drugs', icon: '💊' },
  { id: 'labor', label: 'Labor', icon: '👷' },
  { id: 'utilities', label: 'Utilities', icon: '⚡' },
  { id: 'misc', label: 'Misc', icon: '📦' },
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

  const handleBatchSelect = useCallback(() => {
    // TODO: Show batch picker
    console.log('Select batch pressed');
  }, []);

  const handleDateSelect = useCallback(() => {
    // TODO: Show date picker
    console.log('Select date pressed');
  }, []);

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
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>SELECT BATCH</Text>
            <TouchableOpacity style={styles.selectButton} onPress={handleBatchSelect}>
              <Text style={styles.selectButtonText}>{selectedBatch}</Text>
              <Text style={styles.selectButtonIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Date */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>DATE</Text>
            <TouchableOpacity style={styles.dateButton} onPress={handleDateSelect}>
              <Text style={styles.dateButtonText}>{date}</Text>
              <Text style={styles.dateButtonIcon}>📅</Text>
            </TouchableOpacity>
          </View>

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

  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: spacing.md,
  },

  selectButtonText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },

  selectButtonIcon: {
    ...typography.body,
    color: colors.textSecondary,
  },

  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: spacing.md,
  },

  dateButtonText: {
    ...typography.body,
    color: colors.textPrimary,
  },

  dateButtonIcon: {
    fontSize: 20,
  },

  notesInput: {
    marginBottom: 0,
  },
});
