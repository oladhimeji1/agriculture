import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface QuickActionButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  variant?: 'default' | 'danger';
  containerStyle?: ViewStyle;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = React.memo(
  ({ icon, label, onPress, variant = 'default', containerStyle }) => {
    const iconBgColor = variant === 'danger' ? colors.errorLight : colors.primaryLight;
    const iconColor = variant === 'danger' ? colors.error : colors.primary;

    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
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
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },

  icon: {
    fontSize: 24,
  },

  label: {
    ...typography.caption,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
