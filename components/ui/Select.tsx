import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    value: string;
    options: SelectOption[];
    onSelect: (value: string) => void;
    placeholder?: string;
    error?: string;
}

export const Select: React.FC<SelectProps> = ({
    label,
    value,
    options,
    onSelect,
    placeholder = 'Select an option',
    error,
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = useCallback((optionValue: string) => {
        onSelect(optionValue);
        setModalVisible(false);
    }, [onSelect]);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={[
                    styles.selectTrigger,
                    error && styles.selectTriggerError,
                ]}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
            >
                <Text style={[
                    styles.selectValue,
                    !selectedOption && styles.placeholder
                ]}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>{label || 'Select Option'}</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Ionicons name="close" size={24} color={colors.textPrimary} />
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    data={options}
                                    keyExtractor={(item) => item.value}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.optionItem,
                                                item.value === value && styles.optionItemSelected
                                            ]}
                                            onPress={() => handleSelect(item.value)}
                                        >
                                            <Text style={[
                                                styles.optionText,
                                                item.value === value && styles.optionTextSelected
                                            ]}>
                                                {item.label}
                                            </Text>
                                            {item.value === value && (
                                                <Ionicons name="checkmark" size={20} color={colors.primary} />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                    contentContainerStyle={styles.listContent}
                                />
                                <SafeAreaView edges={['bottom']} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        ...typography.label,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
        marginLeft: spacing.xs,
    },
    selectTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: '#398a39ff',
        borderRadius: borderRadius.md,
        height: 54,
        paddingHorizontal: spacing.md,
    },
    selectTriggerError: {
        borderColor: colors.error,
    },
    selectValue: {
        ...typography.body,
        color: colors.textPrimary,
    },
    placeholder: {
        color: colors.inputPlaceholder,
    },
    errorText: {
        ...typography.caption,
        color: colors.error,
        marginTop: spacing.xs,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    modalTitle: {
        ...typography.h6,
        color: colors.textPrimary,
    },
    listContent: {
        paddingBottom: spacing.xl,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.lg,
    },
    optionItemSelected: {
        backgroundColor: colors.primaryLight,
    },
    optionText: {
        ...typography.body,
        color: colors.textPrimary,
    },
    optionTextSelected: {
        color: colors.primary,
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: colors.borderLight,
    },
});
