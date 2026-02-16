import { borderRadius, colors, spacing, typography } from '@/constants';
import { Symptom } from '@/mock/diseases';
import { diagnose } from '@/utils/diagnosis';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';

interface ActionStep {
    id: string;
    step: number;
    action: string;
}

const symptomOptions: { id: Symptom; label: string; icon: string }[] = [
    { id: 'coughing', label: 'Coughing/Gasping', icon: '🤧' },
    { id: 'sneezing', label: 'Sneezing', icon: '😮‍💨' },
    { id: 'diarrhea', label: 'Diarrhea', icon: '💧' },
    { id: 'bloody-droppings', label: 'Bloody Droppings', icon: '🩸' },
    { id: 'lethargy', label: 'Lethargy', icon: '😴' },
    { id: 'loss-of-appetite', label: 'Loss of Appetite', icon: '🍽️' },
    { id: 'swollen-head', label: 'Swollen Head', icon: '🤕' },
    { id: 'droopy-wings', label: 'Droopy Wings', icon: '🪽' },
    { id: 'nasal-discharge', label: 'Nasal Discharge', icon: '🤧' },
    { id: 'open-mouth-breathing', label: 'Open Mouth Breathing', icon: '😮' },
    { id: 'ruffled-feathers', label: 'Ruffled Feathers', icon: '🪶' },
    { id: 'poor-growth', label: 'Poor Growth', icon: '📉' },
    { id: 'reduced-egg-production', label: 'Reduced Egg Production', icon: '🥚' },
    { id: 'paralysis', label: 'Paralysis', icon: '⚠️' },
    { id: 'green-droppings', label: 'Green Droppings', icon: '🟢' },
    { id: 'eye-swelling', label: 'Eye Swelling', icon: '👁️' },
];


const actionSteps: ActionStep[] = [
    {
        id: '1',
        step: 1,
        action: 'Isolate affected birds immediately to a separate quarantine coop.',
    },
    {
        id: '2',
        step: 2,
        action: 'Sanitize all water troughs and feeders with approved poultry disinfectant.',
    },
    {
        id: '3',
        step: 3,
        action: 'Check batch log for the last vaccination date of the affected flock.',
    },
];

export default function HealthProblemSolver() {
    const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
    const [step, setStep] = useState<'symptoms' | 'results'>('symptoms');
    const scrollRef = useRef<ScrollView>(null);

    const results = useMemo(() => {
        if (selectedSymptoms.length === 0) return [];
        return diagnose(selectedSymptoms);
    }, [selectedSymptoms]);

    const handleBack = useCallback(() => {
        if (step === 'results') {
            setStep('symptoms');
        } else {
            router.back();
        }
    }, [step]);

    const toggleSymptom = useCallback((symptomId: Symptom) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptomId)
                ? prev.filter(id => id !== symptomId)
                : [...prev, symptomId]
        );
    }, []);


    const handleAnalyze = useCallback(() => {
        if (selectedSymptoms.length > 0) {
            setStep('results');
            scrollRef.current?.scrollTo({ y: 0, animated: true });
        }
    }, [selectedSymptoms]);

    const handleFindVet = useCallback(() => {
        Alert.alert('Feature coming soon');
    }, []);

    const handleSaveToBatchLog = useCallback(() => {
        Alert.alert('Feature coming soon');
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <IconButton
                    icon={<Ionicons name="chevron-back" style={styles.backIcon} />}
                    onPress={handleBack}
                    variant="ghost"
                />
                <Text style={styles.headerTitle}>Health & Problem Solver</Text>
                <View style={styles.headerPlaceholder} />
            </View>

            <ScrollView
                ref={scrollRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {step === 'symptoms' && (
                    <>
                        {/* Question Section */}
                        <View style={styles.questionSection}>
                            <Text style={styles.questionTitle}>What are you observing?</Text>
                            <Text style={styles.questionSubtitle}>
                                Select all symptoms that apply to your flock today.
                            </Text>
                        </View>

                        {/* Symptoms Grid */}
                        <View style={styles.symptomsGrid}>
                            {symptomOptions.map((symptom) => {
                                const isSelected = selectedSymptoms.includes(symptom.id);
                                return (
                                    <TouchableOpacity
                                        key={symptom.id}
                                        style={[
                                            styles.symptomButton,
                                            isSelected && styles.symptomButtonSelected,
                                        ]}
                                        onPress={() => toggleSymptom(symptom.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View
                                            style={[
                                                styles.symptomIconContainer,
                                                isSelected && styles.symptomIconContainerSelected,
                                            ]}
                                        >
                                            <Text style={styles.symptomIcon}>{symptom.icon}</Text>
                                        </View>
                                        <Text style={styles.symptomLabel}>{symptom.label}</Text>
                                        {isSelected && (
                                            <View style={styles.checkmark}>
                                                <Text style={styles.checkmarkText}>✓</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Analyze Button */}
                        <Button
                            title="Analyze Symptoms"
                            onPress={handleAnalyze}
                            fullWidth
                            disabled={selectedSymptoms.length === 0}
                            style={styles.ctaButton}
                        />
                    </>
                )}

                {step === 'results' && (
                    <>
                        {/* Selected Symptoms Tags */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Selected Symptoms</Text>
                            <View style={styles.symptomsTagsContainer}>
                                {selectedSymptoms.map(id => {
                                    const symptom = symptomOptions.find(s => s.id === id);
                                    return (
                                        <View key={id} style={styles.symptomTag}>
                                            <Text style={styles.symptomTagText}>
                                                {symptom?.icon} {symptom?.label}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>

                        {/* Potential Causes */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Potential Causes</Text>

                            {results.map((disease) => (
                                <View
                                    key={disease.id}
                                    style={[
                                        styles.diseaseCard,
                                        disease.severity === 'high' && styles.diseaseCardHigh,
                                    ]}
                                >
                                    <View style={styles.diseaseHeader}>
                                        <Text style={styles.diseaseIcon}>⚠️</Text>
                                        <Text style={styles.diseaseName}>{disease.name}</Text>
                                    </View>

                                    <Text style={styles.diseaseDescription}>
                                        {disease.description}
                                    </Text>

                                    {/* Confidence Bar */}
                                    <View style={{ marginTop: spacing.sm }}>
                                        <Text
                                            style={{
                                                ...typography.caption,
                                                color: colors.textSecondary,
                                                marginBottom: 4,
                                            }}
                                        >
                                            Confidence: {disease.confidence}%
                                        </Text>
                                        <View
                                            style={{
                                                height: 6,
                                                backgroundColor: colors.gray200,
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: `${disease.confidence}%`,
                                                    height: '100%',
                                                    backgroundColor:
                                                        disease.severity === 'high'
                                                            ? colors.error
                                                            : colors.warning,
                                                }}
                                            />
                                        </View>
                                    </View>

                                    {disease.urgency === 'vet-now' && (
                                        <View
                                            style={{
                                                marginTop: spacing.sm,
                                                padding: spacing.sm,
                                                backgroundColor: colors.errorLight,
                                                borderRadius: borderRadius.sm,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...typography.bodySmall,
                                                    color: colors.error,
                                                    fontWeight: '700',
                                                }}
                                            >
                                                ⚠️ Veterinary attention required immediately!
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>

                        {/* Immediate Action Steps */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Immediate Action Steps</Text>

                            {actionSteps.map((action) => (
                                <View key={action.id} style={styles.actionCard}>
                                    <View style={styles.actionNumber}>
                                        <Text style={styles.actionNumberText}>{action.step}</Text>
                                    </View>
                                    <Text style={styles.actionText}>{action.action}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Action Buttons */}
                        <Button
                            title="🩺 Find Local Veterinarian"
                            onPress={handleFindVet}
                            fullWidth
                            style={styles.ctaButton}
                        />
                        <Button
                            title="📋 Save to Batch Log"
                            onPress={handleSaveToBatchLog}
                            variant="secondary"
                            fullWidth
                            style={styles.ctaButton}
                        />

                        {/* Disclaimer */}
                        <View style={styles.disclaimer}>
                            <Text style={styles.disclaimerIcon}>ℹ️</Text>
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
    symptomsTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
    },
    symptomTag: {
        backgroundColor: colors.gray100,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        borderColor: colors.gray200,
    },
    symptomTagText: {
        ...typography.caption,
        color: colors.textPrimary,
        fontWeight: '500',
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