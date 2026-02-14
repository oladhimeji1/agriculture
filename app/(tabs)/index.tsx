import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertCard } from '../../components/common/AlertCard';
import { BatchCard } from '../../components/common/BatchCard';
import { QuickActionButton } from '../../components/common/QuickActionButton';
import { TaskItem } from '../../components/common/TaskItem';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import { mockBatch, mockTasks } from '../../mock/mock';



export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: Fetch fresh data from API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleTaskToggle = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'done' ? 'pending' : 'done' }
          : task
      )
    );
  }, []);

  const handleAddExpense = useCallback(() => {
    router.replace('/(expenses)/add-expense');
  }, []);

  const handleLogMortality = useCallback(() => {
    // TODO: Navigate to log mortality modal/screen
    console.log('Log mortality pressed');
  }, []);

  const handleSolveIssue = useCallback(() => {
    // TODO: Navigate to symptom checker
    console.log('Solve issue pressed');
  }, []);

  const handleBatchDetails = useCallback(() => {
    // router.replace('/(expenses)/');
    router.replace('/(health)/symptom-checker');
  }, []);

  const handleViewAllTasks = useCallback(() => {
    // TODO: Navigate to full task list
    console.log('View all tasks pressed');
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👨‍🌾</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>Farm Dashboard</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Alert */}
        <AlertCard
          type="critical"
          title="CRITICAL ALERT"
          message="High temperature (34°C) in Pen 1"
        />

        {/* Active Batch */}
        <BatchCard
          batch={mockBatch}
          onDetailsPress={handleBatchDetails}
        />

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionButton
              icon="💰"
              label="Add Expense"
              onPress={handleAddExpense}
            />
            <QuickActionButton
              icon="☠️"
              label="Log Mortality"
              onPress={handleLogMortality}
              variant="danger"
            />
            <QuickActionButton
              icon="🔍"
              label="Solve Issue"
              onPress={handleSolveIssue}
            />
          </View>
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity onPress={handleViewAllTasks}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {tasks.slice(0, 4).map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              status={task.status}
              onToggle={() => handleTaskToggle(task.id)}
            />
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },

  avatarText: {
    fontSize: 24,
  },

  headerTitle: {
    ...typography.h5,
    color: colors.textPrimary,
  },

  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  notificationIcon: {
    fontSize: 20,
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  sectionTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  viewAllText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },

  quickActionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  bottomSpacer: {
    height: spacing.xl,
  },
});
