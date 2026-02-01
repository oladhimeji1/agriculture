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
import type { Batch } from '../../types';

// Mock data - replace with actual API data
const mockBatch: Batch = {
  id: '1',
  name: 'Broilers Batch A',
  birdType: 'broilers',
  numberOfBirds: 500,
  birdsLive: 492,
  startDate: '2025-10-01',
  currentAge: 22,
  mortality: 8,
  status: 'active',
  createdAt: '2025-10-01',
  updatedAt: '2025-10-23',
};

const mockTasks = [
  { id: '1', title: 'Refill water troughs', status: 'done' as const },
  { id: '2', title: 'Morning feed distribution', status: 'pending' as const },
  { id: '3', title: 'Check brooding temperature', status: 'pending' as const },
  { id: '4', title: 'Biosecurity foot dip refresh', status: 'pending' as const },
];

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
    // TODO: Navigate to add expense modal/screen
    console.log('Add expense pressed');
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
    // TODO: Navigate to batch details
    console.log('Batch details pressed');
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
    marginBottom: spacing.md,
  },

  sectionTitle: {
    ...typography.h6,
    color: colors.textPrimary,
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
