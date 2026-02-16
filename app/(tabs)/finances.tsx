import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface MetricCard {
  label: string;
  value: string;
  subvalue?: string;
  icon: string;
  status?: 'good' | 'bad';
  trend?: string;
}

interface InsightItem {
  label: string;
  value: string;
}

const mockMetrics: MetricCard[] = [
  {
    label: 'Cost per Bird',
    value: '₦ 1,600',
    subvalue: 'TARGET ₦ 1,500',
    icon: '🐔',
    status: 'bad',
  },
  {
    label: 'Mortality Rate',
    value: '4.2%',
    subvalue: 'BELOW LIMIT 21 / 500',
    icon: '❤️',
    status: 'good',
  },
  {
    label: 'Feed Efficiency (FCR)',
    value: '1.75',
    subvalue: 'STATUS Good',
    icon: '🍽️',
    status: 'good',
  },
];

const mockInsights: InsightItem[] = [
  { label: 'Initial Bird Count', value: '500' },
  { label: 'Total Feed Consumed', value: '1,250 kg' },
  { label: 'Avg. Weight at Sale', value: '2.4 kg' },
];

export default function ProfitLossSummaryScreen() {
  const [showTransactions, setShowTransactions] = useState(false);

  const handleShare = useCallback(() => {

  }, []);

  const handleExport = useCallback(() => {

  }, []);

  const handleNewEntry = useCallback(() => {
    // TODO: Navigate to add entry
    console.log('New entry pressed');
  }, []);

  const handleViewTransactions = useCallback(() => {
    setShowTransactions(true);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profit & Loss Summary</Text>
        <IconButton
          icon={<Text style={styles.shareIcon}>⤴</Text>}
          onPress={handleShare}
          variant="ghost"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Batch Info */}
        <View style={styles.batchInfo}>
          <View style={styles.batchHeader}>
            <Text style={styles.batchName}>Broiler Batch #04</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>CLOSED</Text>
            </View>
          </View>
          <Text style={styles.batchDates}>Jan 12 - Feb 28, 2024 • Completed</Text>
        </View>

        {/* Profit Card */}
        <View style={styles.profitCard}>
          <View style={styles.profitIconContainer}>
            <Text style={styles.profitIcon}>💰</Text>
          </View>
          <Text style={styles.profitLabel}>NET PROFIT ACHIEVED</Text>
          <Text style={styles.profitAmount}>₦ 450,000.00</Text>
          <View style={styles.trendBadge}>
            <Ionicons name="trending-up" size={16} color={colors.primary} />
            <Text style={styles.trendText}>+12.5% vs Batch #03</Text>
          </View>
          <Text style={styles.profitSubtext}>Projected based on current market rates</Text>

          {/* View Transactions Button */}
          <Button
            title="View All Transactions"
            onPress={handleViewTransactions}
            variant="secondary"
            fullWidth
            style={styles.transactionsButton}
          />
        </View>

        {/* Income vs Expenses */}
        <View style={styles.section}>
          <View style={styles.incomeExpenseRow}>
            <View style={styles.incomeCard}>
              <View style={styles.incomeIconContainer}>
                <Ionicons name="cash" size={16} color={colors.primary} />
              </View>
              <Text style={styles.incomeLabel}>TOTAL INCOME</Text>
              <Text style={styles.incomeAmount}>₦ 1,250,000</Text>
            </View>
            <View style={styles.expenseCard}>
              <View style={styles.expenseIconContainer}>
                <Ionicons name="cart" size={16} color={colors.primary} />
              </View>
              <Text style={styles.expenseLabel}>TOTAL EXPENSES</Text>
              <Text style={styles.expenseAmount}>₦ 800,000</Text>
            </View>
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          {mockMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={styles.metricIconContainer}>
                  <Text style={styles.metricIcon}>{metric.icon}</Text>
                </View>
                <View style={styles.metricContent}>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={styles.metricValue}>{metric.value}</Text>
                </View>
              </View>
              {metric.subvalue && (
                <View style={styles.metricSubvalue}>
                  <Text
                    style={[
                      styles.metricSubvalueText,
                      metric.status === 'good' && styles.metricSubvalueGood,
                      metric.status === 'bad' && styles.metricSubvalueBad,
                    ]}
                  >
                    {metric.subvalue}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Batch Insights */}
        <View style={styles.section}>
          <View style={styles.insightsHeader}>
            <View style={styles.sectionTitle}>
              <Ionicons name="information-circle" size={20} color={colors.textPrimary} />
              <Text style={styles.sectionTitleText}>Batch Insights</Text></View>
          </View>
          <View style={styles.insightsCard}>
            {mockInsights.map((insight, index) => (
              <View
                key={index}
                style={[
                  styles.insightRow,
                  index !== mockInsights.length - 1 && styles.insightRowBorder,
                ]}
              >
                <Text style={styles.insightLabel}>{insight.label}</Text>
                <Text style={styles.insightValue}>{insight.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Export Button */}
        <View style={styles.ctaSection}>
          <Button
            title="📥 Export Report"
            onPress={handleExport}
            variant="secondary"
            fullWidth
            style={styles.exportButton}
          />
          <Button
            title="➕ New Entry"
            onPress={handleNewEntry}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.white,
  },

  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },

  headerTitle: {
    ...typography.h6,
    color: colors.textPrimary,
  },

  shareIcon: {
    fontSize: 20,
    color: colors.textPrimary,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: spacing.md,
    paddingTop: spacing.sm,
  },

  batchInfo: {
    marginBottom: spacing.md,
  },

  batchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  batchName: {
    ...typography.h4,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },

  statusBadge: {
    backgroundColor: colors.gray300,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.xs,
  },

  statusText: {
    ...typography.captionSmall,
    color: colors.textPrimary,
    fontWeight: '700',
  },

  batchDates: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  profitCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  profitIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: colors.white,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  profitIcon: {
    fontSize: 32,
  },

  profitLabel: {
    ...typography.labelSmall,
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },

  profitAmount: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },

  trendIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },

  trendText: {
    ...typography.bodySmall,
    color: colors.success,
    fontWeight: '700',
  },

  profitSubtext: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  transactionsButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    color: colors.white,
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  sectionTitleText: {
    ...typography.h6,
    color: colors.textPrimary,
    // marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },

  incomeExpenseRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  incomeCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
  },

  incomeIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.successLight,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },

  incomeIcon: {
    fontSize: 20,
  },

  incomeLabel: {
    ...typography.captionSmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  incomeAmount: {
    ...typography.h6,
    color: colors.textPrimary,
  },

  expenseCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
  },

  expenseIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.errorLight,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },

  expenseIcon: {
    fontSize: 20,
  },

  expenseLabel: {
    ...typography.captionSmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  expenseAmount: {
    ...typography.h6,
    color: colors.textPrimary,
  },

  metricCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metricIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  metricIcon: {
    fontSize: 24,
  },

  metricContent: {
    flex: 1,
  },

  metricLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  metricValue: {
    ...typography.h5,
    color: colors.textPrimary,
  },

  metricSubvalue: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  metricSubvalueText: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  metricSubvalueGood: {
    color: colors.success,
  },

  metricSubvalueBad: {
    color: colors.error,
  },

  insightsHeader: {
    marginBottom: spacing.md,
  },

  insightsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },

  insightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },

  insightRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  insightLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },

  insightValue: {
    ...typography.h6,
    color: colors.textPrimary,
  },

  ctaSection: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },

  exportButton: {
    flex: 1,
  },
});
