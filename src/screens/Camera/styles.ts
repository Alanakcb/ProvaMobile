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
    camera: {
        flex: 1,
    },
    headerCamera: {
        position: 'absolute',
        top: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
        zIndex: 10,
    },
    footerCamera: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
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
    ball: {
        width: 70,
        height: 70,
        backgroundColor: colors.black,
        borderRadius: 35
    },
    headerSave: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    modeButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 10,
    },
    modeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
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
        backgroundColor: colors.white,
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
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    recordButton: {
        width: 70,
        height: 70,
        backgroundColor: colors.primary,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordingButton: {
        backgroundColor: 'red',
    }
});
