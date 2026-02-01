import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/spacing';

interface IconButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  icon: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'ghost';
  style?: ViewStyle;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = React.memo(
  ({
    onPress,
    icon,
    size = 'medium',
    variant = 'default',
    style,
    disabled = false,
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.base,
          styles[size],
          styles[variant],
          disabled && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {icon}
      </TouchableOpacity>
    );
  }
);

IconButton.displayName = 'IconButton';

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },

  // Sizes
  small: {
    width: 32,
    height: 32,
  },
  medium: {
    width: 40,
    height: 40,
  },
  large: {
    width: 48,
    height: 48,
  },

  // Variants
  default: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  disabled: {
    opacity: 0.5,
  },
});
