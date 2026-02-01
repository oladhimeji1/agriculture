import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing, borderRadius } from '../../constants/spacing';
import { typography } from '../../constants/typography';

type AlertType = 'critical' | 'weather' | 'info';

interface AlertCardProps {
  type: AlertType;
  title: string;
  message: string;
  containerStyle?: ViewStyle;
}

export const AlertCard: React.FC<AlertCardProps> = React.memo(
  ({ type, title, message, containerStyle }) => {
    const alertConfig = getAlertConfig(type);

    return (
      <View style={[styles.container, { backgroundColor: alertConfig.bgColor }, containerStyle]}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: alertConfig.iconBgColor }]}>
            <Text style={styles.icon}>{alertConfig.icon}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.label, { color: alertConfig.labelColor }]}>
              {title}
            </Text>
            <Text style={styles.message} numberOfLines={2}>
              {message}
            </Text>
          </View>
        </View>
      </View>
    );
  }
);

AlertCard.displayName = 'AlertCard';

function getAlertConfig(type: AlertType) {
  switch (type) {
    case 'critical':
      return {
        icon: '⚠️',
        bgColor: colors.errorLight,
        iconBgColor: colors.white,
        labelColor: colors.error,
      };
    case 'weather':
      return {
        icon: '☀️',
        bgColor: colors.warningLight,
        iconBgColor: colors.white,
        labelColor: colors.warning,
      };
    case 'info':
      return {
        icon: 'ℹ️',
        bgColor: colors.infoLight,
        iconBgColor: colors.white,
        labelColor: colors.info,
      };
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },

  icon: {
    fontSize: 18,
  },

  content: {
    flex: 1,
  },

  label: {
    ...typography.labelSmall,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },

  message: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    lineHeight: 20,
  },
});
