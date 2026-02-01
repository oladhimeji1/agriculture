import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui/Button';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function WelcomeScreen() {
  const handleGetStarted = useCallback(() => {
    router.push('/(auth)/signup');
  }, []);

  const handleLogin = useCallback(() => {
    router.push('/(auth)/login');
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        // contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollContent}>
          {/* Header with Logo and Location */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>🐔</Text>
              </View>
              <Text style={styles.brandName}>
                PoultryPro <Text style={styles.brandSuffix}>NG</Text>
              </Text>
            </View>
            <View style={styles.locationBadge}>
              <Text style={styles.locationText}>NIGERIA</Text>
            </View>
          </View>

        </View>

        {/* Hero Image */}
        <View style={styles.heroImageContainer}>
          <View style={styles.heroImagePlaceholder}>
            <Image
              source={require('../../assets/onboarding/1152.jpg')}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              transition={300}
              placeholder="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
            />
          </View>
        </View>

        <View style={styles.scrollContent}>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Manage your farm with ease and maximize your profit</Text>
          <Text style={styles.description}>
            The all-in-one solution for Nigerian poultry farmers to track batches,
            automate daily tasks, and monitor your business growth effortlessly.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <FeatureItem
            icon={<Ionicons name="layers-outline" size={22} color={colors.primary} />}
            title="Track Batches"
          />
          <FeatureItem
            icon={<Ionicons name="checkbox-outline" size={22} color={colors.primary} />}
            title="Daily Tasks"
          />
          <FeatureItem
            icon={<Ionicons name="trending-up-outline" size={22} color={colors.primary} />}
            title="Profit Analytics"
          />
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <Button
            title="Get Started →"
            onPress={handleGetStarted}
            fullWidth
            style={styles.getStartedButton}
          />
          <Button
            title="Login"
            onPress={handleLogin}
            variant="secondary"
            fullWidth
          />
        </View>

        {/* Trust Badge */}
        <Text style={styles.trustBadge}>
          Trusted by over 5,000+ Nigerian farmers
        </Text>

        </View>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
}

const FeatureItem: React.FC<FeatureItemProps> = React.memo(({ icon, title }) => {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        {icon}
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
      </View>
    </View>
  );
});

FeatureItem.displayName = 'FeatureItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: spacing.sm,   
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoCircle: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },

  logoText: {
    fontSize: 20,
  },

  brandName: {
    ...typography.h6,
    color: colors.textPrimary,
  },

  brandSuffix: {
    color: colors.primary,
    fontWeight: '700',
  },

  locationBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },

  locationText: {
    ...typography.captionSmall,
    color: colors.textPrimary,
    fontWeight: '700',
    letterSpacing: 1,
  },

  heroImageContainer: {
    alignItems: 'center',
    // marginBottom: spacing.md,
  },

  heroImagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: colors.white,
    // borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  heroEmoji: {
    fontSize: 80,
  },

  content: {
    marginBottom: spacing.xl,
  },

  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: 30,
  },

  description: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  features: {
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  featureItem: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  featureIcon: {
    width: 35,
    height: 35,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    padding: 4,
  },

  featureContent: {
    flex: 1,
    paddingTop: spacing.sm,
  },

  featureTitle: {
    ...typography.caption,
    color: colors.textPrimary,
    marginBottom: 2,
  },

  featureDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  ctaContainer: {
    marginBottom: spacing.lg,
  },

  getStartedButton: {
    marginBottom: spacing.md,
    color: colors.white,
  },

  trustBadge: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});
