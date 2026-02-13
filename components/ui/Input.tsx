import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  type?: 'text' | 'password' | 'phone' | 'email';
  countryCode?: string;
}

export const Input: React.FC<InputProps> = React.memo(
  ({
    label,
    error,
    leftIcon,
    rightIcon,
    containerStyle,
    type = 'text',
    countryCode = '+234',
    secureTextEntry,
    ...textInputProps
  }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
      setIsPasswordVisible((prev) => !prev);
    }, []);

    const isPassword = type === 'password';
    const isPhone = type === 'phone';
    const isEmail = type === 'email';

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
            error && styles.inputContainerError,
          ]}
        >
          {isPhone && (
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCode}>{countryCode}</Text>
            </View>
          )}

          {isEmail && (
            <View style={styles.countryCodeContainer}>
              {/* <Text style={styles.countryCode}>@</Text> */}
              <Ionicons name="mail" size={24} color={colors.primary} />
            </View>
          )}

          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          <TextInput
            style={[styles.input, isPhone && styles.phoneInput]}
            placeholderTextColor={colors.inputPlaceholder}
            secureTextEntry={isPassword && !isPasswordVisible}
            keyboardType={isPhone ? 'phone-pad' : 'default'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...textInputProps}
          />

          {isPassword && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.rightIconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color={colors.primary} />
            </TouchableOpacity>
          )}

          {rightIcon && !isPassword && (
            <View style={styles.rightIcon}>{rightIcon}</View>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },

  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: '#398a39ff',
    borderRadius: borderRadius.md,
    height: 54,
    paddingHorizontal: spacing.sm,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },

  inputContainerFocused: {
    borderColor: '#398a39ff',
    borderWidth: 2,
  },

  inputContainerError: {
    borderColor: colors.error,
  },

  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
  },

  phoneInput: {
    marginLeft: spacing.sm,
  },

  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing.xs,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },

  countryCode: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  leftIcon: {
    marginRight: spacing.sm,
  },

  rightIcon: {
    marginLeft: spacing.sm,
  },

  rightIconButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },

  eyeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  eyeIconCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  eyeIconCircleVisible: {
    backgroundColor: 'transparent',
  },

  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
