import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

type Symptom = 'coughing' | 'diarrhea' | 'lethargy' | 'swollen-head' | 'bloody-droppings' | 'droopy-wings';

interface SymptomOption {
  id: Symptom;
  label: string;
  icon: string;
}

interface Disease {
  name: string;
  severity: 'high' | 'medium';
  description: string;
}

interface ActionStep {
  step: number;
  action: string;
}

const symptoms: SymptomOption[] = [
  { id: 'coughing', label: 'Coughing/Gasping', icon: '🤧' },
  { id: 'diarrhea', label: 'Diarrhea', icon: '💧' },
  { id: 'lethargy', label: 'Lethargy', icon: '😴' },
  { id: 'swollen-head', label: 'Swollen Head', icon: '🤕' },
  { id: 'bloody-droppings', label: 'Bloody Droppings', icon: '🩸' },
  { id: 'droopy-wings', label: 'Droopy Wings', icon: '🪽' },
];

const mockDiseases: Disease[] = [
  {
    name: 'Newcastle Disease (Possible)',
    severity: 'high',
    description: 'Coughing and respiratory distress are common indicators of Newcastle Disease in poultry. High contagion risk.',
  },
  {
    name: 'Infectious Bronchitis',
    severity: 'medium',
    description: 'Often mistaken for Newcastle, this affects breathing and may reduce egg quality in layers.',
  },
];

const mockActions: ActionStep[] = [
  {
    step: 1,
    action: 'Isolate affected birds immediately to a separate quarantine coop.',
  },
  {
    step: 2,
    action: 'Sanitize all water troughs and feeders with approved poultry disinfectant.',
  },
  {
    step: 3,
    action: 'Check batch log for the last vaccination date of the affected flock.',
  },
];

export default function SymptomCheckerScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleBack = useCallback(() => {
    router.replace('/(tabs)');
  }, []);

  const toggleSymptom = useCallback((symptomId: Symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  }, []);

  const handleAnalyze = useCallback(() => {
    if (selectedSymptoms.length > 0) {
      setShowResults(true);
    }
  }, [selectedSymptoms]);

  const handleFindVet = useCallback(() => {
    // TODO: Open veterinarian finder
    console.log('Find veterinarian pressed');
  }, []);

  const handleSaveToLog = useCallback(() => {
    // TODO: Save to batch log
    console.log('Save to batch log pressed');
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon={<Text style={styles.backIcon}>←</Text>}
          onPress={handleBack}
          variant="ghost"
        />
        <Text style={styles.headerTitle}>Symptom Checker</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!showResults ? (
          <>
            {/* Question */}
            <View style={styles.questionSection}>
              <Text style={styles.questionTitle}>What are you observing?</Text>
              <Text style={styles.questionSubtitle}>
                Select all symptoms that apply to your flock today.
              </Text>
            </View>

            {/* Symptoms Grid */}
            <View style={styles.symptomsGrid}>
              {symptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom.id}
                  style={[
                    styles.symptomButton,
                    selectedSymptoms.includes(symptom.id) && styles.symptomButtonSelected,
                  ]}
                  onPress={() => toggleSymptom(symptom.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.symptomIconContainer,
                      selectedSymptoms.includes(symptom.id) && styles.symptomIconContainerSelected,
                    ]}
                  >
                    <Text style={styles.symptomIcon}>{symptom.icon}</Text>
                  </View>
                  <Text style={styles.symptomLabel}>{symptom.label}</Text>
                  {selectedSymptoms.includes(symptom.id) && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Analyze Button */}
            <Button
              title="Analyze Symptoms"
              onPress={handleAnalyze}
              fullWidth
              disabled={selectedSymptoms.length === 0}
            />
          </>
        ) : (
          <>
            {/* Potential Causes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Potential Causes</Text>
              {mockDiseases.map((disease, index) => (
                <View
                  key={index}
                  style={[
                    styles.diseaseCard,
                    disease.severity === 'high' && styles.diseaseCardHigh,
                  ]}
                >
                  <View style={styles.diseaseHeader}>
                    <Text style={styles.diseaseIcon}>⚠️</Text>
                    <Text style={styles.diseaseName}>{disease.name}</Text>
                  </View>
                  <Text style={styles.diseaseDescription}>{disease.description}</Text>
                </View>
              ))}
            </View>

            {/* Immediate Action Steps */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Immediate Action Steps</Text>
              {mockActions.map((action) => (
                <View key={action.step} style={styles.actionCard}>
                  <View style={styles.actionNumber}>
                    <Text style={styles.actionNumberText}>{action.step}</Text>
                  </View>
                  <Text style={styles.actionText}>{action.action}</Text>
                </View>
              ))}
            </View>

            {/* CTA Buttons */}
            <Button
              title="📍 Find Local Veterinarian"
              onPress={handleFindVet}
              fullWidth
              style={styles.ctaButton}
            />
            <Button
              title="💾 Save to Batch Log"
              onPress={handleSaveToLog}
              variant="secondary"
              fullWidth
            />

            {/* Disclaimer */}
            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerIcon}>⚠️</Text>
              <Text style={styles.disclaimerText}>
                Please consult a local veterinarian for a professional diagnosis.
                This tool is for informational guidance only and does not replace
                professional veterinary care.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: spacing.lg,
  },

  questionSection: {
    marginBottom: spacing.xl,
  },

  questionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  questionSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },

  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  symptomButton: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
    position: 'relative',
  },

  symptomButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },

  symptomIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },

  symptomIconContainerSelected: {
    backgroundColor: colors.white,
  },

  symptomIcon: {
    fontSize: 32,
  },

  symptomLabel: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },

  checkmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkmarkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    ...typography.h5,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  diseaseCard: {
    backgroundColor: colors.warningLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },

  diseaseCardHigh: {
    backgroundColor: colors.errorLight,
    borderLeftColor: colors.error,
  },

  diseaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  diseaseIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },

  diseaseName: {
    ...typography.h6,
    color: colors.textPrimary,
  },

  diseaseDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  actionCard: {
    flexDirection: 'row',
    backgroundColor: colors.successLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },

  actionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  actionNumberText: {
    ...typography.label,
    color: colors.white,
  },

  actionText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },

  ctaButton: {
    marginBottom: spacing.md,
  },

  disclaimer: {
    flexDirection: 'row',
    backgroundColor: colors.warningLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },

  disclaimerIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },

  disclaimerText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
});
