import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const GOLD = '#d4a017';
const PAGE_BG = '#0f0f1c';
const CARD_BG = '#131326';
const INPUT_BG = '#16162a';
const MUTED_TEXT = '#6c6c80';

type Category = {
    id: string;
    label: string;
    active: boolean;
};

type Entry = {
    id: string;
    date: string;
    emotion: string;
    emotionColor: string;
    textPreview: string;
    duration: string;
};

type JournalHistoryScreenProps = {
    onBack?: () => void;
    onSelectEntry?: (entry: Entry) => void;
    onNewEntryPress?: () => void;
    initialCategories?: Category[];
    initialEntries?: Entry[];
};

export default function JournalHistoryScreen({
    onBack,
    onSelectEntry,
    onNewEntryPress,

    // Dynamic Props with sensible fallback array items
    initialCategories = [
        { id: 'all', label: 'ALL', active: true },
        { id: 'this_week', label: 'THIS WEEK', active: false },
        { id: 'by_emotion', label: 'BY EMOTION', active: false },
    ],

    initialEntries = [
        {
            id: 'entry_1',
            date: 'Oct 24, Thursday',
            emotion: 'CALM',
            emotionColor: '#a29bfe', // Soft purple/indigo
            textPreview: 'The sound of the rain against the window pane tonight felt different....',
            duration: '2m 15s',
        },
        {
            id: 'entry_2',
            date: 'Oct 22, Tuesday',
            emotion: 'INSPIRED',
            emotionColor: '#e2b33c', // Amber gold
            textPreview: 'A quick recording after finishing that new chapter. The morning light wa...',
            duration: '1m 42s',
        },
        {
            id: 'entry_3',
            date: 'Oct 20, Sunday',
            emotion: 'REFLECTIVE',
            emotionColor: '#81ecec', // Pale teal
            textPreview: 'Reflecting on the week. Some challenges arose, but the way I...',
            duration: '4m 05s',
        },
    ]
}: JournalHistoryScreenProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState(initialCategories);
    const [entries, setEntries] = useState(initialEntries);

    const handleSelectCategory = (id: string) => {
        setCategories(categories.map(cat => ({
            ...cat,
            active: cat.id === id
        })));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            {/* ── HEADER ── */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarIcon}>👤</Text>
                    </View>
                    <Text style={styles.headerGreeting}>Good Evening</Text>
                </View>
                <TouchableOpacity style={styles.searchToggleBtn}>
                    <Text style={styles.searchTopIcon}>🔍</Text>
                </TouchableOpacity>
            </View>

            {/* ── SEARCH INPUT CONTROL BAR ── */}
            <View style={styles.searchBarContainer}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.lensSymbol}>🔍</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search your reflections"
                        placeholderTextColor="#4e4e64"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.micQuickButton} activeOpacity={0.8}>
                    <Text style={styles.micQuickIcon}>🎙</Text>
                </TouchableOpacity>
            </View>

            {/* ── FILTER CHIPS ROW ── */}
            <View style={styles.filterRowOuter}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterScrollPadding}
                >
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.filterChip, cat.active && styles.filterChipActive]}
                            onPress={() => handleSelectCategory(cat.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.filterChipText, cat.active && styles.filterChipTextActive]}>
                                {cat.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* ── ENTRIES SCROLL CANVAS ── */}
            <ScrollView
                style={styles.cardCanvas}
                contentContainerStyle={styles.canvasPaddingBottom}
                showsVerticalScrollIndicator={false}
            >
                {entries.map((entry) => (
                    <TouchableOpacity
                        key={entry.id}
                        style={styles.entryCard}
                        onPress={() => onSelectEntry && onSelectEntry(entry)}
                        activeOpacity={0.8}
                    >
                        {/* Upper Metadata Row */}
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardDateText}>{entry.date}</Text>
                            <View style={[styles.emotionBadge, { backgroundColor: `${entry.emotionColor}15` }]}>
                                <View style={[styles.badgeDot, { backgroundColor: entry.emotionColor }]} />
                                <Text style={[styles.badgeText, { color: entry.emotionColor }]}>{entry.emotion}</Text>
                            </View>
                        </View>

                        {/* Middle Preview Text */}
                        <Text style={styles.previewText}>{entry.textPreview}</Text>

                        {/* Lower Action Row */}
                        <View style={styles.cardFooter}>
                            <View>
                                <Text style={styles.metaLabel}>DURATION</Text>
                                <Text style={styles.metaValue}>{entry.duration}</Text>
                            </View>

                            <View style={styles.playButtonCircle}>
                                <Text style={styles.playIconSymbol}>▶</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* ── FLOATING ACTION BUTTON (FAB) ── */}
            <TouchableOpacity
                style={styles.floatingActionButton}
                onPress={onNewEntryPress}
                activeOpacity={0.85}
            >
                <Text style={styles.fabPlusSymbol}>+</Text>
            </TouchableOpacity>

            {/* ── BOTTOM GLOBAL TAB BAR ── */}
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

    // Header 
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 12,
        marginBottom: 16,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#222235',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarIcon: {
        fontSize: 16,
    },
    headerGreeting: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'serif',
    },
    searchToggleBtn: {
        padding: 6,
    },
    searchTopIcon: {
        color: GOLD,
        fontSize: 18,
    },

    // Search Bar
    searchBarContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: INPUT_BG,
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 16,
        gap: 10,
        borderWidth: 1,
        borderColor: '#1d1d36',
    },
    lensSymbol: {
        fontSize: 14,
        color: '#4e4e64',
    },
    textInput: {
        flex: 1,
        color: '#ffffff',
        fontSize: 14,
    },
    micQuickButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ffcc00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    micQuickIcon: {
        fontSize: 18,
        color: '#000000',
    },

    // Filter Row
    filterRowOuter: {
        marginBottom: 20,
        height: 36,
    },
    filterScrollPadding: {
        paddingHorizontal: 20,
        gap: 10,
    },
    filterChip: {
        backgroundColor: '#1d1d33',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 18,
        justifyContent: 'center',
    },
    filterChipActive: {
        backgroundColor: '#6c5ce7', // Brand accent purple
    },
    filterChipText: {
        color: '#8e8ea8',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    filterChipTextActive: {
        color: '#ffffff',
    },

    // Card List Canvas
    cardCanvas: {
        flex: 1,
        paddingHorizontal: 20,
    },
    canvasPaddingBottom: {
        paddingBottom: 140, // Clearance for FAB and Bottom Navigation
    },
    entryCard: {
        backgroundColor: CARD_BG,
        borderRadius: 28,
        padding: 22,
        borderWidth: 1,
        borderColor: '#1e1e38',
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    cardDateText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'serif',
        fontStyle: 'italic',
    },
    emotionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        gap: 6,
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    badgeText: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    previewText: {
        color: '#9ba0b8',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    metaLabel: {
        color: MUTED_TEXT,
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 2,
    },
    metaValue: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    playButtonCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#22223a',
        borderWidth: 1,
        borderColor: '#313152',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playIconSymbol: {
        color: GOLD,
        fontSize: 14,
        marginLeft: 2, // Optical tracking fix for play wedge orientation
    },

    // Floating Action Button (FAB)
    floatingActionButton: {
        position: 'absolute',
        bottom: 90, // Places it cleanly above the static global bottom nav bar frame
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#ffcc00',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6, // Android drop shadow
        shadowColor: '#000000', // iOS drop shadow setup
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabPlusSymbol: {
        color: '#000000',
        fontSize: 28,
        fontWeight: '300',
        marginTop: -2, // Vertical structural balancing tweak
    },

    // Navigation Bar Global Frame
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