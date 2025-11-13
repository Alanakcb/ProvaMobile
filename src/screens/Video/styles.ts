import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    fixedRatio: {
        flex: 1,
    },
    video: {
        flex: 1,
        width: '100%',
    },
    controls: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 15,
        borderRadius: 50,
    },
    headerCamera: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    iconButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerCamera: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
        zIndex: 10,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: colors.white,
    },
    captureButtonInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'red',
    },
    recording: {
        borderColor: 'red',
    },
    recordingInner: {
        backgroundColor: 'red',
        borderRadius: 8,
    },
    recordingText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
