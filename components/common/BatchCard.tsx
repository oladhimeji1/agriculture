import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import images from '../../assets/home/1152.jpg';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';
import type { Batch } from '../../types';

interface BatchCardProps {
  batch: Batch;
  // onPress?: () => void;
  onDetailsPress?: () => void;
  containerStyle?: ViewStyle;
}

export const BatchCard: React.FC<BatchCardProps> = React.memo(
  ({ batch, onDetailsPress, containerStyle }) => {
    const healthPercentage = ((batch.birdsLive / batch.numberOfBirds) * 100).toFixed(0);

    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={onDetailsPress}
        activeOpacity={0.7}
      >
        {/* Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Image
              source={images}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{batch.status.toUpperCase()}</Text>
          </View>
          <View style={styles.statusBadge2}>
            <Text style={styles.statusText}>{batch.createdAt.toString()}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{batch.name}</Text>

          {/* Info Row */}
          <View style={styles.infoRow}>
            <Text style={styles.ageText}>{batch.currentAge} Days Old</Text>
            <View style={styles.divider} />
            <Text style={styles.countText}>
              {batch.birdsLive} / {batch.numberOfBirds} Birds Live
            </Text>
          </View>

          <View style={styles.infoRow2}>
            <Text style={styles.ageText}>Mortality: {batch.mortality}</Text>
            <Text style={styles.ageText}>{healthPercentage}%</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${healthPercentage}%` as any },
                ]}
              />
            </View>
          </View>

          {/* Details Button */}
          {/* {onDetailsPress && (
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={onDetailsPress}
              activeOpacity={0.7}
            >
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          )} */}
        </View>
      </TouchableOpacity>
    );
  }
);

BatchCard.displayName = 'BatchCard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    cursor: 'pointer',
  },

  imageContainer: {
    position: 'relative',
    height: 150,
    backgroundColor: colors.gray100,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },

  imageEmoji: {
    fontSize: 64,
  },

  statusBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xs,
  },

  statusBadge2: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xs,
  },

  statusText: {
    ...typography.captionSmall,
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  content: {
    padding: spacing.sm,
  },

  title: {
    ...typography.h5,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  infoRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    justifyContent: 'space-between',
  },

  ageText: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  divider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gray400,
    marginHorizontal: spacing.sm,
  },

  countText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },

  progressContainer: {
    marginBottom: spacing.md,
  },

  progressBar: {
    height: 5,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.xs,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: borderRadius.xs,
  },

  detailsButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },

  detailsButtonText: {
    ...typography.button,
    color: colors.black,
    fontSize: 14,
  },
});
