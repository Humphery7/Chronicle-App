import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

// =============================================
// DASHBOARD SCREEN  (app/dashboard.tsx)
// The main screen after the user taps GET STARTED.
// =============================================

const GOLD = '#d4a017';
const PAGE_BG = '#0f0f1c';
const CARD_BG = '#17172a';

export default function DashboardScreen() {

  // Which vibe pill is selected
  const [selectedVibe, setSelectedVibe] = useState('Calm');

  // Which bottom tab is active
  const [activeTab, setActiveTab] = useState('HOME');

  const vibes = [
    { emoji: '😌', label: 'Calm' },
    { emoji: '😞', label: 'Low' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '😊', label: 'Happy' },
    { emoji: '😰', label: 'Anxious' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>

        {/* ────────────────────────────────────
            TOP BAR: Avatar + greeting + search
        ──────────────────────────────────── */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <Text style={styles.topBarGreeting}>Good Evening</Text>
          </View>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* ────────────────────────────────────
            HERO: Big personalised greeting
        ──────────────────────────────────── */}
        <View style={styles.hero}>
          <Text style={styles.heroText}>Good evening,{'\n'}Alex <Text style={styles.heroMoon}>🌙</Text></Text>
          <Text style={styles.heroSub}>How are you feeling today?</Text>
        </View>

        {/* ────────────────────────────────────
            CURRENT VIBE: Horizontal mood pills
        ──────────────────────────────────── */}
        <Text style={styles.sectionLabel}>CURRENT VIBE</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.vibeScroll}
          contentContainerStyle={styles.vibeContent}
        >
          {vibes.map((vibe) => {
            const isActive = selectedVibe === vibe.label;
            return (
              <TouchableOpacity
                key={vibe.label}
                style={[styles.vibePill, isActive && styles.vibePillActive]}
                onPress={() => setSelectedVibe(vibe.label)}
              >
                <Text style={styles.vibeEmoji}>{vibe.emoji}</Text>
                <Text style={[styles.vibeLabel, isActive && styles.vibeLabelActive]}>
                  {vibe.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ────────────────────────────────────
            TODAY'S JOURNAL CARD
        ──────────────────────────────────── */}
        <View style={styles.journalCard}>
          <Text style={styles.journalDate}>OCTOBER 24, 2023</Text>
          <Text style={styles.journalTitle}>Today's Journal</Text>

          {/* Big gold mic button with glow */}
          <TouchableOpacity style={styles.micButton} activeOpacity={0.8}>
            <Text style={styles.micIcon}>🎙</Text>
          </TouchableOpacity>

          <Text style={styles.recordText}>Tap to begin recording</Text>
        </View>

        {/* ────────────────────────────────────
            RECENT ENTRIES
        ──────────────────────────────────── */}
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent Entries</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        {/* Entry Card 1 */}
        <View style={styles.entryCard}>
          <View style={styles.entryRow}>
            <Text style={styles.entryDate}>YESTERDAY, 10:45 PM</Text>
            <View style={styles.entryRight}>
              <View style={[styles.entryTag, { backgroundColor: '#3b2f7a' }]}>
                <View style={styles.tagDot} />
                <Text style={styles.tagText}>REFLECTIVE</Text>
              </View>
              <Text style={styles.playBtn}>▶</Text>
            </View>
          </View>
          <Text style={styles.entryQuote}>"The city felt quieter than usual...</Text>
        </View>

        {/* Entry Card 2 */}
        <View style={styles.entryCard}>
          <View style={styles.entryRow}>
            <Text style={styles.entryDate}>OCT 22, 8:15 AM</Text>
            <View style={styles.entryRight}>
              <View style={[styles.entryTag, { backgroundColor: '#1e3a5f' }]}>
                <Text style={styles.tagIcon}>✨</Text>
                <Text style={styles.tagText}>INSPIRED</Text>
              </View>
              <Text style={styles.playBtn}>▶</Text>
            </View>
          </View>
          <Text style={styles.entryQuote}>"Morning sun hitting the desk:...</Text>
        </View>

        {/* Space so last card isn't hidden behind the nav bar */}
        <View style={{ height: 100 }} />

      </ScrollView>

      {/* ────────────────────────────────────
          BOTTOM NAVIGATION BAR
      ──────────────────────────────────── */}
      <View style={styles.bottomNav}>
        {[
          { icon: '⊞', label: 'HOME' },
          { icon: '⟳', label: 'HISTORY' },
          { icon: '↗', label: 'INSIGHTS' },
          { icon: '⚙', label: 'SETTINGS' },
        ].map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <TouchableOpacity
              key={tab.label}
              style={styles.navItem}
              onPress={() => setActiveTab(tab.label)}
            >
              <Text style={[styles.navIcon, isActive && styles.navIconActive]}>{tab.icon}</Text>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
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

  page: {
    flex: 1,
    paddingHorizontal: 22,
  },

  // ── Top Bar ──
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },

  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a3d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 18,
  },

  topBarGreeting: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '500',
  },

  searchIcon: {
    fontSize: 20,
    color: GOLD,
  },

  // ── Hero ──
  hero: {
    marginBottom: 28,
  },

  heroText: {
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: '300',
    color: '#ffffff',
    lineHeight: 50,
    marginBottom: 10,
  },

  heroMoon: {
    color: GOLD,
  },

  heroSub: {
    fontSize: 15,
    color: '#888',
  },

  // ── Vibe Pills ──
  sectionLabel: {
    fontSize: 11,
    color: '#666',
    letterSpacing: 2,
    marginBottom: 10,
  },

  vibeScroll: {
    marginBottom: 28,
  },

  vibeContent: {
    gap: 10,
    paddingRight: 20,
  },

  vibePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1e1e30',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2a2a40',
  },

  vibePillActive: {
    backgroundColor: '#2e2800',
    borderColor: GOLD,
  },

  vibeEmoji: {
    fontSize: 16,
  },

  vibeLabel: {
    fontSize: 14,
    color: '#888',
  },

  vibeLabelActive: {
    color: GOLD,
    fontWeight: '600',
  },

  // ── Journal Card ──
  journalCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },

  journalDate: {
    fontSize: 11,
    color: GOLD,
    letterSpacing: 2,
    marginBottom: 8,
  },

  journalTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 32,
  },

  micButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    // Gold glow
    shadowColor: GOLD,
    shadowOpacity: 0.7,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },

  micIcon: {
    fontSize: 40,
  },

  recordText: {
    fontSize: 15,
    color: '#aaa',
  },

  // ── Recent Entries ──
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  recentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },

  viewAll: {
    fontSize: 12,
    color: GOLD,
    letterSpacing: 1,
    fontWeight: '600',
  },

  entryCard: {
    backgroundColor: CARD_BG,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  entryDate: {
    fontSize: 11,
    color: '#666',
    letterSpacing: 0.5,
  },

  entryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  entryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  tagDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: GOLD,
  },

  tagIcon: {
    fontSize: 10,
  },

  tagText: {
    fontSize: 10,
    color: '#ccc',
    letterSpacing: 1,
    fontWeight: '600',
  },

  playBtn: {
    fontSize: 16,
    color: GOLD,
  },

  entryQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },

  // ── Bottom Nav ──
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#13132a',
    borderTopWidth: 1,
    borderTopColor: '#22223a',
    paddingVertical: 12,
    paddingBottom: 20,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },

  navIcon: {
    fontSize: 20,
    color: '#666',
  },

  navIconActive: {
    color: GOLD,
  },

  navLabel: {
    fontSize: 9,
    color: '#555',
    letterSpacing: 1,
  },

  navLabelActive: {
    color: GOLD,
    fontWeight: '600',
  },

});
