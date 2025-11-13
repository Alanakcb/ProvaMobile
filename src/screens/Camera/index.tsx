import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View, Alert, ImageBackground } from 'react-native';
import { styles } from './styles'
import { colors } from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library'
import { ComponentLoading } from '../../components';

export function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
  const ref = useRef<CameraView>(null)
  const [photo, setPhoto] = useState<CameraCapturedPicture>()

  if (!permission) {
    return <ComponentLoading />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Você precisa dar permissão para acesso à Câmera</Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (ref.current) {
      try {
        const picture = await ref.current.takePictureAsync({ imageType: 'jpg', quality: 0.7 })
        setPhoto(picture)
      } catch (error) {
        Alert.alert("Erro", "Não foi possível tirar a foto")
        console.error(error)
      }
    }
  }

  async function savePhoto() {
    if (permissionMedia?.status !== 'granted') {
      await requestPermissionMedia();
    }
    try {
      const asset = await MediaLibrary.createAssetAsync(photo!.uri)
      await MediaLibrary.createAlbumAsync("Vinyl", asset, false)
      Alert.alert("Sucesso!", "Imagem salva com sucesso!")
      setPhoto(undefined)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a imagem")
    }
  }

  if (photo) {
    return (
      <ImageBackground source={{ uri: photo.uri }} style={styles.camera}>
        <View style={styles.headerSave}>
          <TouchableOpacity onPress={() => setPhoto(undefined)}>
            <AntDesign name="close" size={50} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={savePhoto}>
            <AntDesign name="save" size={50} color={colors.white} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={ref} mode="picture" />
      
      <View style={styles.headerCamera}>
        <TouchableOpacity onPress={toggleCameraFacing} style={styles.iconButton}>
          <AntDesign name="retweet" size={40} color={colors.white} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.footerCamera}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
