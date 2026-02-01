import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from '../../components/ui/IconButton';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

interface Task {
  id: string;
  title: string;
  description?: string;
  time?: string;
  priority?: 'high' | 'routine';
  status: 'done' | 'pending';
  image?: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Evening Feed - Batch A',
    description: 'Distribute evening feed',
    time: 'Yesterday, 6:00 PM',
    priority: 'high',
    status: 'pending',
    image: '🪣',
  },
  {
    id: '2',
    title: 'Vitamin Supplements',
    description: 'Add 2 scoops to main water tank',
    time: '9:00 AM • HIGH PRIORITY',
    priority: 'high',
    status: 'pending',
    image: '💊',
  },
  {
    id: '3',
    title: 'Clean Drinkers',
    description: 'Completed at 7:45 AM',
    time: '',
    priority: 'routine',
    status: 'done',
    image: '🧹',
  },
  {
    id: '4',
    title: 'Morning Egg Collection',
    description: 'Record total count in app',
    time: '11:00 AM • ROUTINE',
    priority: 'routine',
    status: 'pending',
    image: '🥚',
  },
];

export default function DailyChecklistScreen() {
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedBatch, setSelectedBatch] = useState('Broiler Batch A');

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleSwitchBatch = useCallback(() => {
    // TODO: Show batch picker
    console.log('Switch batch pressed');
  }, []);

  const handleMarkAsDone = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'done' } : task
      )
    );
  }, []);

  const handleUndo = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'pending' } : task
      )
    );
  }, []);

  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const totalTasks = tasks.length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const missedTasks = tasks.filter((t) => t.status === 'pending' && t.priority === 'high');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon={<Text style={styles.backIcon}>←</Text>}
          onPress={handleBack}
          variant="ghost"
        />
        <Text style={styles.headerTitle}>Daily Checklist</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Batch Header */}
        <View style={styles.batchHeader}>
          <View>
            <Text style={styles.dateText}>Today, May 12</Text>
            <View style={styles.batchTitleRow}>
              <Text style={styles.batchTitle}>{selectedBatch}</Text>
              <TouchableOpacity style={styles.switchButton} onPress={handleSwitchBatch}>
                <Text style={styles.switchButtonText}>Switch ▼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Today's Progress</Text>
            <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
          <Text style={styles.progressText}>{completedTasks} of {totalTasks} tasks completed</Text>
        </View>

        {/* Missed Tasks Alert */}
        {missedTasks.length > 0 && (
          <View style={styles.missedTasksAlert}>
            <View style={styles.alertIcon}>
              <Text style={styles.alertIconText}>⚠️</Text>
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Missed Tasks</Text>
              <Text style={styles.alertMessage}>{missedTasks.length} ACTIONS NEEDED</Text>
            </View>
          </View>
        )}

        {/* Missed Tasks Section */}
        {missedTasks.length > 0 && (
          <View style={styles.section}>
            {missedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMarkAsDone={() => handleMarkAsDone(task.id)}
              />
            ))}
          </View>
        )}

        {/* Today's Checklist */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Checklist</Text>
          {tasks.filter((t) => t.priority === 'routine').map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMarkAsDone={() => handleMarkAsDone(task.id)}
              onUndo={() => handleUndo(task.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface TaskCardProps {
  task: Task;
  onMarkAsDone: () => void;
  onUndo?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, onMarkAsDone, onUndo }) => {
  const isDone = task.status === 'done';
  const isMissed = task.priority === 'high' && !isDone;

  return (
    <View style={[styles.taskCard, isMissed && styles.taskCardMissed]}>
      {isMissed && <View style={styles.overdueTag}>
        <Text style={styles.overdueText}>OVERDUE</Text>
      </View>}

      <View style={styles.taskContent}>
        <View style={styles.taskImageContainer}>
          <Text style={styles.taskImage}>{task.image}</Text>
        </View>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, isDone && styles.taskTitleDone]}>
            {task.title}
          </Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
          {task.time && <Text style={styles.taskTime}>{task.time}</Text>}
        </View>
      </View>

      {isDone ? (
        <TouchableOpacity style={styles.undoButton} onPress={onUndo}>
          <Text style={styles.undoButtonText}>↻ Undo</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.markDoneButton} onPress={onMarkAsDone}>
          <Text style={styles.markDoneButtonText}>✓ Mark as Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

TaskCard.displayName = 'TaskCard';

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
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.white,
  },

  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },

  headerTitle: {
    ...typography.h5,
    color: colors.textPrimary,
  },

  headerPlaceholder: {
    width: 40,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: spacing.lg,
  },

  batchHeader: {
    marginBottom: spacing.lg,
  },

  dateText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  batchTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  batchTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },

  switchButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.xs,
  },

  switchButtonText: {
    ...typography.captionSmall,
    color: colors.black,
    fontWeight: '700',
  },

  progressCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  progressLabel: {
    ...typography.label,
    color: colors.textPrimary,
  },

  progressPercentage: {
    ...typography.h4,
    color: colors.primary,
  },

  progressBar: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.xs,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
  },

  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  missedTasksAlert: {
    flexDirection: 'row',
    backgroundColor: colors.errorLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  alertIcon: {
    width: 32,
    height: 32,
    backgroundColor: colors.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },

  alertIconText: {
    fontSize: 18,
  },

  alertContent: {
    flex: 1,
  },

  alertTitle: {
    ...typography.label,
    color: colors.error,
    marginBottom: 2,
  },

  alertMessage: {
    ...typography.bodySmall,
    color: colors.textPrimary,
  },

  section: {
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  taskCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  taskCardMissed: {
    borderColor: colors.error,
    borderWidth: 2,
  },

  overdueTag: {
    backgroundColor: colors.error,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    marginBottom: spacing.sm,
  },

  overdueText: {
    ...typography.captionSmall,
    color: colors.white,
    fontWeight: '700',
  },

  taskContent: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },

  taskImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  taskImage: {
    fontSize: 32,
  },

  taskInfo: {
    flex: 1,
  },

  taskTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: colors.textTertiary,
  },

  taskDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  taskTime: {
    ...typography.caption,
    color: colors.textTertiary,
  },

  markDoneButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },

  markDoneButtonText: {
    ...typography.button,
    color: colors.black,
    fontSize: 14,
  },

  undoButton: {
    backgroundColor: colors.gray100,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },

  undoButtonText: {
    ...typography.button,
    color: colors.textSecondary,
    fontSize: 14,
  },
});
