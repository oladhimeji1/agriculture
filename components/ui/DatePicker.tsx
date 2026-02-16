import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useCallback, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface DatePickerProps {
    label?: string;
    value: string; // Expected format: YYYY-MM-DD
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    label,
    value,
    onChange,
    placeholder = 'YYYY-MM-DD',
    error,
}) => {
    const [show, setShow] = useState(false);

    // Parse current value or use today
    const dateValue = value ? new Date(value) : new Date();
    // Ensure it's a valid date, otherwise fallback to today
    const date = isNaN(dateValue.getTime()) ? new Date() : dateValue;

    const handleNativeChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
        // On Android, the picker closes after selection
        if (Platform.OS === 'android') {
            setShow(false);
        }

        if (selectedDate) {
            // Format to YYYY-MM-DD
            const formattedDate = selectedDate.toISOString().split('T')[0];
            onChange(formattedDate);
        }
    }, [onChange]);

    const togglePicker = () => setShow(prev => !prev);

    // On web, we check Platform.OS which might correctly identify browser environment in some Expo setups
    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                {label && <Text style={styles.label}>{label}</Text>}
                <View style={[styles.inputWrapper, error && styles.inputError]}>
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        style={{
                            width: '100%',
                            height: 54,
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            fontFamily: 'inherit',
                            fontSize: 16,
                            color: colors.textPrimary,
                            padding: '0 16px',
                        }}
                    />
                    <View style={styles.iconContainer}>
                        <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
                    </View>
                </View>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
                style={[styles.inputWrapper, error && styles.inputError]}
                onPress={togglePicker}
                activeOpacity={0.7}
            >
                <Text style={[styles.displayValue, !value && styles.placeholder]}>
                    {value || placeholder}
                </Text>
                <View style={styles.iconContainer}>
                    <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
                </View>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleNativeChange}
                />
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}
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
    inputWrapper: {
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
    inputError: {
        borderColor: colors.error,
    },
    displayValue: {
        ...typography.body,
        color: colors.textPrimary,
    },
    placeholder: {
        color: colors.inputPlaceholder,
    },
    iconContainer: {
        marginLeft: spacing.sm,
    },
    errorText: {
        ...typography.caption,
        color: colors.error,
        marginTop: spacing.xs,
    },
});
