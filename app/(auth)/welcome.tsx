import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { borderRadius, spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AUTO_ADVANCE_DELAY = 6000; // 4 seconds per slide

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: any;
  type?: 'image' | 'video';
  floatingElements: Array<{
    icon: string;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    delay: number;
  }>;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Your Daily Farm Assistant',
    description: 'Never miss a task with smart daily to-dos and timely notification reminders tailored to your farm operations.',
    image: require('../../assets/onboarding/1.mp4'), // Replace with slide1.jpg
    type: 'video',
    floatingElements: [
      { icon: 'notifications-outline', top: 80, right: 40, delay: 0 },
      { icon: 'checkmark-circle-outline', top: 180, left: 30, delay: 200 },
      { icon: 'time-outline', bottom: 200, right: 50, delay: 400 },
      { icon: 'calendar-outline', bottom: 120, left: 40, delay: 600 },
    ],
  },
  {
    id: 2,
    title: 'Track Every Expense',
    description: 'Monitor your weekly and monthly expenses with detailed insights. Know exactly where your money goes and maximize profits.',
    image: require('../../assets/onboarding/2.mp4'), // Replace with slide2.mp4
    type: 'video',
    floatingElements: [
      { icon: 'analytics-outline', top: 100, left: 35, delay: 0 },
      { icon: 'cash-outline', top: 160, right: 40, delay: 200 },
      { icon: 'trending-up-outline', bottom: 180, left: 45, delay: 400 },
      { icon: 'wallet-outline', bottom: 140, right: 35, delay: 600 },
    ],
  },
  // {
  //   id: 3,
  //   title: 'Expert Tips & Guidance',
  //   description: 'Get professional advice on improving animal health, crop yields, and smart recommendations for feeds and fertilizers.',
  //   image: require('../../assets/onboarding/3.mp4'), // Replace with slide3.mp4
  //   type: 'video',
  //   floatingElements: [
  //     { icon: 'leaf-outline', top: 90, right: 45, delay: 0 },
  //     { icon: 'water-outline', top: 170, left: 35, delay: 200 },
  //     { icon: 'sunny-outline', bottom: 190, right: 40, delay: 400 },
  //     { icon: 'nutrition-outline', bottom: 130, left: 50, delay: 600 },
  //   ],
  // },
  {
    id: 4,
    title: 'Manage Sales & Delivery',
    description: 'Track sales, coordinate deliveries, and grow your agricultural business with powerful tools built for Nigerian farmers.',
    image: require('../../assets/onboarding/4.mp4'), // Replace with slide4.jpg
    type: 'video',
    floatingElements: [
      { icon: 'cart-outline', top: 85, left: 40, delay: 0 },
      { icon: 'car-outline', top: 165, right: 35, delay: 200 },
      { icon: 'receipt-outline', bottom: 185, left: 45, delay: 400 },
      { icon: 'trending-up', bottom: 125, right: 50, delay: 600 },
    ],
  },
];

export default function WelcomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressAnims = useRef(slides.map(() => new Animated.Value(0))).current;
  const floatingAnims = useRef(
    slides.map((slide) =>
      slide.floatingElements.map(() => ({
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(0),
        scale: new Animated.Value(0.1),
      }))
    )
  ).current;

  const timerRef = useRef<number | null>(null);

  const isLastSlide = currentIndex === slides.length - 1;
  const currentSlide = slides[currentIndex];

  // We use the current slide's image as the video source
  const videoPlayer = useVideoPlayer(currentSlide.type === 'video' ? currentSlide.image : null, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const startFloatingAnimations = useCallback((slideIndex: number) => {
    slides[slideIndex].floatingElements.forEach((_, elemIndex) => {
      const anim = floatingAnims[slideIndex][elemIndex];

      // Reset
      anim.translateY.setValue(0.7);
      anim.opacity.setValue(0);
      anim.scale.setValue(0.9);

      // Entrance animation
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 900,
          delay: slides[slideIndex].floatingElements[elemIndex].delay,
          useNativeDriver: true,
        }),
        Animated.spring(anim.scale, {
          toValue: 1,
          tension: 50,
          friction: 1,
          delay: slides[slideIndex].floatingElements[elemIndex].delay,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Floating loop animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim.translateY, {
              toValue: -55,
              duration: 2000 + elemIndex * 200,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: 0,
              duration: 2000 + elemIndex * 200,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    });
  }, [floatingAnims]);

  const startProgressAnimation = useCallback((index: number) => {
    progressAnims[index].setValue(0);
    Animated.timing(progressAnims[index], {
      toValue: 1,
      duration: AUTO_ADVANCE_DELAY,
      useNativeDriver: false,
    }).start();
  }, [progressAnims]);

  const goToNextSlide = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleGetStarted();
    }
  }, [currentIndex]);

  const handleSkip = useCallback(() => {
    router.push('/(auth)/login');
  }, []);

  const handleGetStarted = useCallback(() => {
    router.push('/(auth)/login');
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!isLastSlide) {
      timerRef.current = setTimeout(goToNextSlide, AUTO_ADVANCE_DELAY);
      startProgressAnimation(currentIndex);
      startFloatingAnimations(currentIndex);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else {
      startFloatingAnimations(currentIndex);
    }
  }, [currentIndex, isLastSlide, goToNextSlide, startProgressAnimation, startFloatingAnimations]);

  return (
    <LinearGradient
      colors={currentSlide.type === 'video' ? ['#ffffff', '#ffffff'] : ['#35a35d23', '#ffffff']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {slides.map((_, index) => (
            <View key={index} style={styles.progressBarWrapper}>
              <View style={styles.progressBarBackground} />
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width:
                      index < currentIndex
                        ? '100%'
                        : index === currentIndex
                          ? progressAnims[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          })
                          : '0%',
                  },
                ]}
              />
            </View>
          ))}
        </View>

        {/* Header Navigation */}
        <View style={styles.header}>
          {currentIndex > 0 ? (
            <TouchableOpacity
              onPress={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.backButton} />
          )}

          {!isLastSlide && (
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Slide Content */}
        <View style={styles.slideContainer}>
          {/* Image Container with Floating Elements */}
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              {currentSlide.type === 'video' ? (
                <VideoView
                  player={videoPlayer}
                  style={styles.slideImage}
                  contentFit="cover"
                  allowsFullscreen={false}
                  allowsPictureInPicture={false}
                  nativeControls={false}
                />
              ) : (
                <Image
                  source={currentSlide.image}
                  style={styles.slideImage}
                  contentFit="cover"
                  transition={300}
                />
              )}
            </View>

            {/* Floating Elements */}
            {currentSlide.floatingElements.map((element, index) => {
              const anim = floatingAnims[currentIndex][index];
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.floatingElement,
                    {
                      top: element.top,
                      left: element.left,
                      right: element.right,
                      bottom: element.bottom,
                      opacity: anim.opacity,
                      transform: [
                        { translateY: anim.translateY },
                        { scale: anim.scale },
                      ],
                    },
                  ]}
                >
                  <Ionicons name={element.icon as any} size={28} color={colors.primary} />
                </Animated.View>
              );
            })}
          </View>

          {/* Text Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.description}>{currentSlide.description}</Text>
          </View>
        </View>

        {/* Bottom CTA */}
        <View style={styles.bottomContainer}>
          {isLastSlide ? (
            <TouchableOpacity
              onPress={handleGetStarted}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>Get Started</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={goToNextSlide} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff', // Warm cream background
  },

  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.xs,
  },

  progressBarWrapper: {
    flex: 1,
    height: 3,
    position: 'relative',
  },

  progressBarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#E5DDD1',
    borderRadius: 2,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  skipButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },

  skipText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },

  slideContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  imageContainer: {
    height: 380,
    marginBottom: spacing.xl,
    position: 'relative',
  },

  imageWrapper: {
    width: 280,
    height: 280,
    alignSelf: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },

  slideImage: {
    width: 300,
    height: 300,
  },

  floatingElement: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  contentContainer: {
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },

  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },

  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
    paddingHorizontal: spacing.sm,
  },

  bottomContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },

  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
  },

  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
    backgroundColor: colors.primary,
  },

  nextButtonText: {
    ...typography.button,
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  nextIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});