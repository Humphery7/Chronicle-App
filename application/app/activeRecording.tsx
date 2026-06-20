import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const GOLD = '#d4a017';
const PAGE_BG = '#0f0f1c';
const BUTTON_BG = '#222233';

type Props = {
  onClose: () => void;
};

export default function ActiveRecordingScreen({ onClose }: Props) {
  // Mock timer state (starts at 2:45 for mockup fidelity)
  const [seconds, setSeconds] = useState(165); 

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds into M:SS with spaced numbers
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    // Adding spaces between characters to match the design's tracking
    return `${mins} : ${formattedSecs.toString().split('').join(' ')}`;
  };

  // Mock heights for the audio visualizer bars
  const waveHeights = [12, 24, 38, 48, 30, 48, 40, 20, 16, 12, 28, 52, 58, 44, 38, 20, 14, 8];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* ────────────────────────────────────
          TOP HEADER: Brand + Close Button
      ──────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.brandText}>Chronicle</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* ────────────────────────────────────
          CENTER CONTENT: Status + Timer + Mic Pulse
      ──────────────────────────────────── */}
      <View style={styles.centerContainer}>
        <Text style={styles.statusText}>Recording... speak freely</Text>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>

        {/* Concentric Ripple Rings Around Mic */}
        <View style={styles.rippleOuter}>
          <View style={styles.rippleMiddle}>
            <View style={styles.rippleInner}>
              <View style={styles.micButton}>
                <Text style={styles.micIcon}>🎙</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ────────────────────────────────────
            AUDIO WAVEFORM VISUALIZER
        ──────────────────────────────────── */}
        <View style={styles.waveformContainer}>
          {waveHeights.map((height, index) => (
            <View
              key={index}
              style={[
                styles.waveBar,
                { 
                  height: height,
                  // Fade out the outer bars slightly like the mockup
                  opacity: index < 3 || index > 14 ? 0.4 : 1 
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* ────────────────────────────────────
          BOTTOM BAR: Stop Recording Button
      ──────────────────────────────────── */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.stopButton} onPress={onClose} activeOpacity={0.8}>
          <View style={styles.stopSquare} />
          <Text style={styles.stopText}>STOP RECORDING</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// =============================================
// STYLES
// =============================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  brandText: {
    fontFamily: 'serif', // Use your custom Serif font here if available
    fontSize: 24,
    color: '#8e8e9a',
    fontStyle: 'italic',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BUTTON_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '300',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -40, // Shifts element slightly up to match viewport balance
  },
  statusText: {
    fontSize: 28,
    fontStyle: 'italic',
    color: '#ffffff',
    fontFamily: 'serif',
    fontWeight: '300',
    marginBottom: 12,
  },
  timerText: {
    fontSize: 24,
    color: GOLD,
    fontWeight: '600',
    letterSpacing: 4,
    marginBottom: 40,
  },
  
  // ── Concentric Pulse Rings ──
  rippleOuter: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(212, 160, 23, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleMiddle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(212, 160, 23, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(212, 160, 23, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    // Glowing Effect
    shadowColor: GOLD,
    shadowOpacity: 0.6,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 0 },
    elevation: 15,
  },
  micIcon: {
    fontSize: 44,
  },

  // ── Waveform ──
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
    marginTop: 50,
    gap: 6,
  },
  waveBar: {
    width: 4,
    backgroundColor: GOLD,
    borderRadius: 2,
  },

  // ── Bottom Action ──
  bottomContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  stopButton: {
    flexDirection: 'row',
    backgroundColor: BUTTON_BG,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    maxWidth: 280,
  },
  stopSquare: {
    width: 12,
    height: 12,
    backgroundColor: '#ff7675', // Light red stop indicator tint
    borderRadius: 2,
  },
  stopText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
  },
});