import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
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
const CARD_BG = '#1d1d33';
const TEXT_MUTED = '#7e7e96';

interface Props {
    onBack?: () => void;
    sessionTitle?: string;
    sessionSubtitle?: string;
    timelineMarker?: string;
    initialMessages?: {
        id: string;
        sender: string;
        text: string;
        type: string;
        status?: string;
        quickReplies?: string[];
    }[];
}

export default function ReflectingTogetherScreen({
    onBack,
    // Header Props
    sessionTitle = "Reflecting together",
    sessionSubtitle = "ACTIVE SESSION",
    timelineMarker = "TODAY, APRIL 24",

    // Conversation History Props (Dynamic Data Arrays)
    initialMessages = [
        {
            id: 'msg_1',
            sender: 'CHRONICLE',
            text: "Good evening. I noticed your entries today felt a little heavy. Would you like to explore what's on your mind right now?",
            type: 'ai'
        },
        {
            id: 'msg_2',
            sender: 'USER',
            text: "I've been feeling overwhelmed with work. It feels like no matter how much I do, the pile just keeps growing. I can't seem to switch off.",
            type: 'user',
            status: 'DELIVERED'
        },
        {
            id: 'msg_3',
            sender: 'CHRONICLE',
            text: "That sounds incredibly taxing. When you look at that \"pile,\" what is the primary thought that crosses your mind?",
            type: 'ai',
            // Quick replies attached specifically to this step in the dialogue tree
            quickReplies: ["I'm failing", "It's never ending", "I need help"]
        }
    ]
}: Props) {
    const [messages, setMessages] = useState(initialMessages);
    const [inputText, setInputText] = useState('');

    // Simulates appending a message dynamically when an action occurs
    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const newUserMsg = {
            id: `user_${Date.now()}`,
            sender: 'USER',
            text: text.trim(),
            type: 'user',
            status: 'SENT'
        };

        setMessages([...messages, newUserMsg]);
        setInputText('');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardViewport}
            >

                {/* ────────────────────────────────────
            HEADER BAR
        ──────────────────────────────────── */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>{sessionTitle}</Text>
                        <Text style={styles.headerSubtitle}>{sessionSubtitle}</Text>
                    </View>

                    <View style={styles.liveInsightsIndicator}>
                        <View style={styles.greenPulseDot} />
                        <Text style={styles.liveInsightsText}>LIVE INSIGHTS</Text>
                    </View>
                </View>

                {/* ────────────────────────────────────
            CHAT BUBBLES SCROLL CANVAS
        ──────────────────────────────────── */}
                <ScrollView
                    style={styles.messageCanvas}
                    contentContainerStyle={styles.canvasContentPadding}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Timeline Marker Day Splitter */}
                    <Text style={styles.timelineMarker}>{timelineMarker}</Text>

                    {/* DYNAMICALLY MAPPED MESSAGES */}
                    {messages.map((msg) => {
                        if (msg.type === 'ai') {
                            return (
                                <View key={msg.id} style={styles.aiMessageWrapper}>
                                    <Text style={styles.senderLabel}>⚜ {msg.sender}</Text>
                                    <View style={styles.aiBubble}>
                                        <Text style={styles.aiText}>{msg.text}</Text>

                                        {/* Renders option chips dynamically if present in the data item */}
                                        {msg.quickReplies && msg.quickReplies.length > 0 && (
                                            <View style={styles.quickRepliesContainer}>
                                                {msg.quickReplies.map((reply, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        style={styles.replyChip}
                                                        onPress={() => handleSendMessage(`"${reply}"`)}
                                                    >
                                                        <Text style={styles.replyChipText}>"{reply}"</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                    <TouchableOpacity style={styles.speakerButton}>
                                        <Text style={styles.speakerIcon}>🔊</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        } else {
                            return (
                                <View key={msg.id} style={styles.userMessageWrapper}>
                                    <View style={styles.userBubble}>
                                        <Text style={styles.userText}>{msg.text}</Text>
                                    </View>
                                    {msg.status && <Text style={styles.deliveryStatusText}>{msg.status}</Text>}
                                </View>
                            );
                        }
                    })}

                </ScrollView>

                {/* ────────────────────────────────────
            FOOTER INPUT BAR + SYSTEM NOTICES
        ──────────────────────────────────── */}
                <View style={styles.footerContainer}>
                    <Text style={styles.disclaimerText}>
                        THIS IS A SAFE SPACE. CHRONICLE IS NOT A THERAPIST.
                    </Text>

                    <View style={styles.inputRow}>
                        <TouchableOpacity style={styles.micInputButton}>
                            <Text style={styles.micInputIcon}>🎙</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.textInputField}
                            placeholder="Type a message..."
                            placeholderTextColor="#55556d"
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={() => handleSendMessage(inputText)}
                        />

                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={() => handleSendMessage(inputText)}
                        >
                            <Text style={styles.sendIcon}>➤</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
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
    keyboardViewport: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#16162a',
    },
    backButton: {
        padding: 4,
    },
    backArrow: {
        color: '#ffffff',
        fontSize: 22,
    },
    headerCenter: {
        flex: 1,
        marginLeft: 16,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'serif',
        fontStyle: 'italic',
    },
    headerSubtitle: {
        color: TEXT_MUTED,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 2,
    },
    liveInsightsIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(212, 160, 23, 0.08)',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 12,
        gap: 6,
    },
    greenPulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ffcc00',
    },
    liveInsightsText: {
        color: '#e2b33c',
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    messageCanvas: {
        flex: 1,
        paddingHorizontal: 16,
    },
    canvasContentPadding: {
        paddingBottom: 32,
    },
    timelineMarker: {
        color: TEXT_MUTED,
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 1.5,
        marginVertical: 24,
    },
    aiMessageWrapper: {
        alignItems: 'flex-start',
        marginBottom: 24,
        width: '85%',
    },
    senderLabel: {
        color: GOLD,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginBottom: 8,
        marginLeft: 4,
    },
    aiBubble: {
        backgroundColor: CARD_BG,
        borderRadius: 24,
        borderBottomLeftRadius: 4,
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#252542',
    },
    aiText: {
        color: '#cbcbe0',
        fontSize: 15,
        fontFamily: 'serif',
        fontStyle: 'italic',
        lineHeight: 24,
    },
    speakerButton: {
        marginTop: 8,
        marginLeft: 8,
        padding: 4,
    },
    speakerIcon: {
        fontSize: 13,
        color: TEXT_MUTED,
    },
    userMessageWrapper: {
        alignItems: 'flex-end',
        marginBottom: 24,
        width: '100%',
    },
    userBubble: {
        backgroundColor: '#261f3d',
        borderRadius: 24,
        borderBottomRightRadius: 4,
        paddingVertical: 18,
        paddingHorizontal: 20,
        maxWidth: '85%',
    },
    userText: {
        color: '#bfa7f2',
        fontSize: 15,
        lineHeight: 24,
    },
    deliveryStatusText: {
        color: '#49495e',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 6,
        marginRight: 4,
    },
    quickRepliesContainer: {
        marginTop: 18,
        gap: 10,
        width: '100%',
    },
    replyChip: {
        backgroundColor: '#131326',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#292947',
        alignSelf: 'flex-start',
    },
    replyChipText: {
        color: '#dfdfe6',
        fontSize: 13,
    },
    footerContainer: {
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 10 : 20,
        backgroundColor: PAGE_BG,
    },
    disclaimerText: {
        color: '#3d3d52',
        fontSize: 9,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: 14,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111122',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#1d1d36',
        paddingHorizontal: 8,
        height: 56,
    },
    micInputButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    micInputIcon: {
        fontSize: 18,
        color: GOLD,
    },
    textInputField: {
        flex: 1,
        color: '#ffffff',
        fontSize: 15,
        paddingHorizontal: 8,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: GOLD,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendIcon: {
        fontSize: 16,
        color: '#000000',
        marginLeft: -2,
    },
});