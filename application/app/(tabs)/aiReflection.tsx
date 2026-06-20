import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const GOLD = '#d4a017';
const PAGE_BG = '#0f0f1c';

export default function EntryReflectionScreen({ 
  titleLine1 = "Your Journal", 
  titleLine2 = "Entry", 
  entryDate = "OCTOBER 24, 2023",
  userQuote = `"I spent most of the morning feeling overwhelmed by the sheer number of emails. It felt like every time I cleared one, three more appeared. I started to question if I'm even capable of keeping up anymore. I just wanted to close my laptop and walk away..."`,
  aiTitle = "Navigating the digital tide",
  aiReflectionText1 = "It sounds like you're experiencing a classic case of 'inbox fatigue,' where the volume of input starts to feel like a reflection of your own competence. Let's pause for a moment.",
  aiReflectionText2 = "Notice how your mind jumped from 'too many emails' to 'I am not capable.' That is a cognitive distortion called ",
  aiHighlightWord = "Overgeneralization",
  aiReflectionText3 = ". The influx of emails is an external circumstance, not a measure of your worth or ability.",
  aiReflectionText4 = "How would it feel to view that laptop not as a mountain to climb, but just a tool that's currently busy? You're allowed to step away."
}) {

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* ── ZONE 1: THE HEADER LINE ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>{titleLine1}</Text>
              <Text style={styles.headerTitle}>{titleLine2}</Text>
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <Text style={styles.headerDate}>{entryDate}</Text>
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
        </View>

        {/* ── ZONE 2: USER QUOTE BOX ── */}
        <View style={styles.quoteWrapper}>
          <View style={styles.quoteBadge}>
            <Text style={styles.quoteBadgeText}>❝</Text>
          </View>
          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>{userQuote}</Text>
          </View>
        </View>

        {/* ── SECTION DIVIDER ── */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>CHRONICLE'S REFLECTION  ✦</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* ── ZONE 3: AI REFLECTION CARD ── */}
        <View style={styles.aiCard}>
          <Text style={styles.aiCardTitle}>{aiTitle}</Text>
          
          <Text style={styles.aiBodyText}>{aiReflectionText1}</Text>
          
          <Text style={styles.aiBodyText}>
            {aiReflectionText2}
            <Text style={styles.aiHighlightText}>{aiHighlightWord}</Text>
            {aiReflectionText3}
          </Text>
          
          <Text style={styles.aiBodyText}>{aiReflectionText4}</Text>

          {/* Audio Player Action Row inside Card */}
          <View style={styles.audioActionRow}>
            <TouchableOpacity style={styles.listenButton} activeOpacity={0.8}>
              <Text style={styles.listenIcon}>🔊</Text>
              <Text style={styles.listenText}>LISTEN TO RESPONSE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── ZONE 4: BOTTOM CONTROLS ── */}
        <View style={styles.bottomActionRow}>
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Save Entry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.refreshButton} activeOpacity={0.8}>
            <Text style={styles.refreshIcon}>⟳</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Conversation Text Link */}
        <TouchableOpacity style={styles.continueLink} activeOpacity={0.7}>
          <Text style={styles.continueLinkText}>CONTINUE CONVERSATION  →</Text>
        </TouchableOpacity>
        
        {/* Extra cushion space at the end of scroll area */}
        <View style={{ height: 140 }} />
      </ScrollView>

      {/* ── GLOBAL BOTTOM NAVIGATION BAR ── */}
      <View style={styles.bottomNav}>
        {[
          { icon: '⊞', label: 'HOME', active: false },
          { icon: '⟳', label: 'HISTORY', active: true },
          { icon: '↗', label: 'INSIGHTS', active: false },
          { icon: '⚙', label: 'SETTINGS', active: false },
        ].map((tab) => (
          <TouchableOpacity key={tab.label} style={styles.navItem}>
            <Text style={[styles.navIcon, tab.active && styles.navIconActive]}>{tab.icon}</Text>
            <Text style={[styles.navLabel, tab.active && styles.navLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
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
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },

  // Zone 1: Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222235',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 18,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'serif', 
    lineHeight: 24,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  headerDate: {
    color: '#777785',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  searchIcon: {
    fontSize: 18,
    color: GOLD,
  },

  // Zone 2: Quote Box Styles
  quoteWrapper: {
    marginTop: 16,
    marginBottom: 24,
    position: 'relative',
  },
  quoteCard: {
    backgroundColor: '#131326', 
    borderRadius: 24,
    paddingVertical: 26,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: '#1e1e36',
  },
  quoteText: {
    color: '#a0a0b5',
    fontSize: 15,
    fontStyle: 'italic',
    fontFamily: 'serif',
    lineHeight: 26,
  },
  quoteBadge: {
    position: 'absolute',
    top: -14,
    left: -6,
    zIndex: 10,
    backgroundColor: '#22223a',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteBadgeText: {
    color: '#b592ff', 
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Divider Styles
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#222235',
  },
  dividerText: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },

  // Zone 3: AI Reflection Card Styles
  aiCard: {
    backgroundColor: '#151523',
    borderRadius: 32,
    padding: 26,
    borderWidth: 1,
    borderColor: '#26263c',
    marginBottom: 28,
  },
  aiCardTitle: {
    color: GOLD,
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'serif',
    marginBottom: 22,
    lineHeight: 28,
  },
  aiBodyText: {
    color: '#b8b8cc',
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 16,
  },
  aiHighlightText: {
    color: GOLD,
    fontWeight: '700',
  },
  audioActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 14,
  },
  listenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffcc00', 
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  listenIcon: {
    fontSize: 14,
    color: '#000',
  },
  listenText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },

  // Zone 4: Bottom Interaction Button Styles
  bottomActionRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#ffcc00',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  refreshButton: {
    width: 60,
    backgroundColor: '#17172b',
    borderWidth: 1,
    borderColor: '#26263c',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshIcon: {
    color: '#fff',
    fontSize: 20,
  },
  continueLink: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  continueLinkText: {
    color: '#6c6c80',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  // Global Navigation Bar Styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#0d0d18',
    borderTopWidth: 1,
    borderTopColor: '#1b1b2d',
    paddingVertical: 12,
    paddingBottom: 24,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    fontSize: 20,
    color: '#4e4e64',
  },
  navIconActive: {
    color: GOLD,
  },
  navLabel: {
    fontSize: 9,
    color: '#4e4e64',
    letterSpacing: 1,
  },
  navLabelActive: {
    color: GOLD,
    fontWeight: '600',
  },
});