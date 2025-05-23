import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import {colors, spacingX, spacingY} from '@/constants/theme';
import {verticalScale} from '@/utils/styling';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';

const welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* login button & image */}
        <View>
          <TouchableOpacity style={styles.loginButton}>
            <Typo fontWeight={'500'}> Sign in</Typo>
          </TouchableOpacity>
          <Animated.Image
            entering={FadeIn.duration(1000)}
            source={require('../../assets/images/welcome.png')}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          {/* Sombra falsa hacia arriba */}
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.15)', // sombra fuerte
              'rgba(255, 255, 255, 0.1)', // intermedio
              'transparent', // completamente transparente
            ]}
            locations={[0, 0.3, 1]} // 30% fuerte, luego disipa hasta 100%
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={{
              position: 'absolute',
              top: -40,
              // bottom: verticalScale(95), // altura del footer
              left: 0,
              right: 0,
              height: 40,
              zIndex: 2,
            }}
          />

          <Animated.View
            entering={FadeInDown.duration(1200).springify().damping(12)}
            style={{alignItems: 'center'}}
          >
            <Typo size={20} fontWeight={'800'}>
              Always take control
            </Typo>
            <Typo size={20} fontWeight={'800'}>
              of your finances
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1200)
              .delay(200)
              .springify()
              .damping(12)}
            style={{alignItems: 'center', gap: 2}}
          >
            <Typo size={17} color={colors.textLight}>
              Finances must be arranged to set a better
            </Typo>
            <Typo size={17} color={colors.textLight}>
              lifestyle in future
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1200)
              .delay(400)
              .springify()
              .damping(12)}
            style={styles.buttonContainer}
          >
            {/* button */}
            <Button>
              <Typo size={22} color={colors.neutral900} fontWeight={'600'}>
                Get Started
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: '100%',
    height: verticalScale(300),
    alignSelf: 'center',
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: 'flex-end',
    marginRight: spacingX._20,
  },
  footer: {
    position: 'relative',
    backgroundColor: colors.neutral900,
    alignItems: 'center',
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: '#ffffff',
    elevation: 22,
    // shadowOffset: {width: 0, height: -10},
    // shadowRadius: 25,
    // shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacingX._25,
  },
});
