import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface RadioCardProps {
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export const RadioCard: React.FC<RadioCardProps> = React.memo(
  ({ label, sublabel, icon, selected, onPress, containerStyle }) => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          selected && styles.containerSelected,
          containerStyle,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {icon && (
          <View style={[styles.iconContainer, selected && styles.iconContainerSelected]}>
            {icon}
          </View>
        )}

        <Text style={[styles.label, selected && styles.labelSelected]}>
          {label}
        </Text>

        {sublabel && (
          <Text style={[styles.sublabel, selected && styles.sublabelSelected]}>
            {sublabel}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

RadioCard.displayName = 'RadioCard';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    minHeight: 140,
  },

  containerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  iconContainerSelected: {
    backgroundColor: colors.white,
  },

  label: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  labelSelected: {
    color: colors.textPrimary,
    fontWeight: '700',
  },

  sublabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  sublabelSelected: {
    color: colors.textSecondary,
  },
});
