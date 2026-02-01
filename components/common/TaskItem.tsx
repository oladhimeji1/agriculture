import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/spacing';
import { typography } from '../../constants/typography';

type TaskStatus = 'done' | 'pending';

interface TaskItemProps {
  title: string;
  status: TaskStatus;
  onToggle?: () => void;
  containerStyle?: ViewStyle;
}

export const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({ title, status, onToggle, containerStyle }) => {
    const isDone = status === 'done';

    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={onToggle}
        activeOpacity={0.7}
        disabled={!onToggle}
      >
        {/* Checkbox */}
        <View style={[styles.checkbox, isDone && styles.checkboxChecked]}>
          {isDone && <Text style={styles.checkmark}>✓</Text>}
        </View>

        {/* Title */}
        <Text
          style={[styles.title, isDone && styles.titleDone]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Status Badge */}
        <View style={[styles.statusBadge, isDone ? styles.statusDone : styles.statusPending]}>
          <Text style={[styles.statusText, isDone ? styles.statusTextDone : styles.statusTextPending]}>
            {isDone ? 'DONE' : 'PENDING'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

TaskItem.displayName = 'TaskItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },

  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },

  title: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },

  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textTertiary,
  },

  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.xs,
    marginLeft: spacing.sm,
  },

  statusDone: {
    backgroundColor: colors.successLight,
  },

  statusPending: {
    backgroundColor: colors.warningLight,
  },

  statusText: {
    ...typography.captionSmall,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  statusTextDone: {
    color: colors.success,
  },

  statusTextPending: {
    color: colors.warning,
  },
});
