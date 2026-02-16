import { dailyTasks } from '@/mock/mock';
import { Task } from '@/types';
import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';



export default function DailyChecklistScreen() {
  const [tasks, setTasks] = useState(dailyTasks);
  const [selectedBatch, setSelectedBatch] = useState('Broiler Batch A');


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
    <View style={[styles.taskCard, isMissed && styles.taskCardMissed, task.priority === 'high' && { backgroundColor: '#fff5f5' }]}>
      {/* }

      <View style={styles.tagContainer}>
        <View style={styles.priorityTag}>
          <Text style={styles.priorityText}>{task.priority === 'high' ? 'HIGH PRIORITY' : 'ROUTINE'}</Text>
        </View>

        <View style={styles.statusTag}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>
      </View> */}

      <View style={styles.taskContent}>
        <View style={styles.taskImageContainer}>
          <Image
            source={task.image}
            style={styles.taskImage}
            contentFit="cover"
            transition={300}
          />
        </View>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, isDone && styles.taskTitleDone]}>
            {task.title}
          </Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
          {task.time !== '' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={styles.taskTime}>{task.time}</Text>
              <Text style={[styles.priorityText, task.priority === 'high' && { color: colors.error }]}>
                • {task.priority === 'high' ? 'HIGH PRIORITY' : 'ROUTINE'}
              </Text>
              {isMissed && <Text style={styles.overdueText}>• OVERDUE</Text>}
            </View>
          )}

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
      </View>

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
    padding: spacing.md,
    paddingTop: spacing.sm,
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
    ...typography.h6,
    color: colors.primary,
  },

  progressBar: {
    height: 5,
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
    padding: spacing.sm,
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
    ...typography.captionSmall,
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
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  taskCardMissed: {
    borderColor: colors.error,
    borderWidth: 1,
  },

  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  overdueTag: {
    backgroundColor: colors.error,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    marginBottom: spacing.sm,
  },

  priorityTag: {
    backgroundColor: colors.warning,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    marginBottom: spacing.sm,
  },

  priorityText: {
    ...typography.captionSmall,
    color: colors.white,
    fontWeight: '700',
  },

  statusTag: {
    backgroundColor: colors.success,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    marginBottom: spacing.sm,
  },

  statusText: {
    ...typography.captionSmall,
    color: colors.white,
    fontWeight: '700',
  },

  overdueText: {
    ...typography.captionSmall,
    color: colors.error,
    fontWeight: '700',
  },

  taskContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // marginBottom: spacing.md,
  },

  taskImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  taskImage: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  markDoneButtonText: {
    ...typography.button,
    color: colors.white,
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
