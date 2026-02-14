import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    title,
    onPress,
    variant = 'primary',
    size = 'large',
    disabled = false,
    loading = false,
    icon,
    fullWidth = false,
    style,
    textStyle,
  }) => {
    const isDisabled = disabled || loading;

    return (
      <TouchableOpacity
        style={[
          styles.base,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === 'primary' ? colors.textOnPrimary : colors.primary}
            size="small"
          />
        ) : (
          <>
            {icon && <>{icon}</>}
            <Text
              style={[
                styles.baseText,
                styles[`${variant}Text`],
                styles[`${size}Text`],
                textStyle,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.gray100,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Sizes
  large: {
    height: 56,
    paddingHorizontal: spacing.xl,
  },
  medium: {
    height: 48,
    paddingHorizontal: spacing.lg,
  },
  small: {
    height: 40,
    paddingHorizontal: spacing.md,
  },

  // States
  disabled: {
    opacity: 0.5,
  },

  fullWidth: {
    width: '100%',
  },

  // Text Styles
  baseText: {
    ...typography.button,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.white,
  },

  largeText: {
    ...typography.button,
  },
  mediumText: {
    ...typography.buttonSmall,
  },
  smallText: {
    ...typography.buttonSmall,
  },
});
