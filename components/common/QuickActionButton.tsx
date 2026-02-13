import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface QuickActionButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  variant?: 'default' | 'danger';
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = React.memo(
  ({ icon, label, onPress, variant = 'default' }) => {
    const iconBgColor = variant === 'danger' ? colors.errorLight : colors.primaryLight;
    // const iconColor = variant === 'danger' ? colors.error : colors.primary;

    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: iconBgColor }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
);

QuickActionButton.displayName = 'QuickActionButton';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    minWidth: 100,
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },

  icon: {
    fontSize: 20,
  },

  label: {
    ...typography.caption,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
