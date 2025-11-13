import React, { useState, useRef } from 'react';
import { Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { CameraType, CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useVideoPlayer, VideoView } from 'expo-video';
import { styles } from './styles'
import { ComponentLoading } from '../../components';
import { useEvent } from 'expo';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

export function VideoScreen() {
    const [record, setRecord] = useState('');
    const [facing, setFacing] = useState<CameraType>('back');
    const [isRecording, setIsRecording] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [hasAudioPermission, requestAudioPermission] = useMicrophonePermissions();
    const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
    const ref = useRef<CameraView>(null)
    const player = useVideoPlayer(record, player => {
        player.loop = true;
    });
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    if (!permission || !hasAudioPermission) {
        return <ComponentLoading />
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Permita acessar a Câmera</Text>
                <Button onPress={requestPermission} title="Permitir Câmera" />
            </View>
        );
    }
    if (!hasAudioPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Permita acessar o Microfone</Text>
                <Button onPress={requestAudioPermission} title="Permitir Microfone" />
            </View>
        );
    }
    
    const toggleRecording = async () => {
        if (ref.current) {
            try {
                if (isRecording) {
                    ref.current.stopRecording();
                    setIsRecording(false);
                } else {
                    setIsRecording(true);
                    const videoResult = await ref.current.recordAsync();
                    if (videoResult) {
                        setRecord(videoResult.uri);
                        player.replace(videoResult.uri);
                    }
                    setIsRecording(false);
                }
            } catch (error) {
                Alert.alert("Erro", "Não foi possível gravar o vídeo");
                console.error(error);
                setIsRecording(false);
            }
        }
    };

    const saveVideo = async () => {
        if (permissionMedia?.status !== 'granted') {
            await requestPermissionMedia();
        }
        try {
            const asset = await MediaLibrary.createAssetAsync(record);
            await MediaLibrary.createAlbumAsync("Vinyl", asset, false);
            Alert.alert("Sucesso!", "Vídeo salvo com sucesso!");
            setRecord('');
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o vídeo");
        }
    };

    if (record && !isRecording) {
        return (
            <View style={styles.container}>
                <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => isPlaying ? player.pause() : player.play()} style={styles.button}>
                        <Text style={{color: colors.white, fontSize: 30}}>{isPlaying ? '⏸' : '▶'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={saveVideo} style={styles.button}>
                        <AntDesign name="save" size={50} color={colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRecord('')} style={styles.button}>
                        <AntDesign name="close" size={50} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.fixedRatio} facing={facing} ref={ref} mode='video' />
            
            <View style={styles.headerCamera}>
                <TouchableOpacity onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))} style={styles.iconButton}>
                    <AntDesign name="retweet" size={40} color={colors.white} />
                </TouchableOpacity>
            </View>
            
            <View style={styles.footerCamera}>
                {isRecording && (
                    <Text style={styles.recordingText}>● GRAVANDO</Text>
                )}
                <TouchableOpacity 
                    onPress={toggleRecording} 
                    style={[styles.captureButton, isRecording && styles.recording]}
                >
                    <View style={[styles.captureButtonInner, isRecording && styles.recordingInner]} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
