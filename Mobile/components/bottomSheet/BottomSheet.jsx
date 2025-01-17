import { Modal, View, StyleSheet, Pressable, Text, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';

const BottomSheet = ({ title, visible, setVisible, children }) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={() => setVisible(false)}
            statusBarTranslucent={true}
        >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={styles.background} />
            </TouchableWithoutFeedback>

            <View style={styles.modalView}>
                <View style={styles.header}>
                    {title && <Text style={styles.title}>{title}</Text>}
                    <Pressable onPress={() => setVisible(false)}>
                        <Text>X</Text>
                    </Pressable>
                </View>
                {children}
            </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        // iOS Shadow
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 10,

        // Android Shadow
        elevation: 10,
    },
    header: {
        width: '100%',
        justifyContent: "space-between",
        flexDirection: 'row',
        padding: 20,
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
    },
});


export default BottomSheet;
