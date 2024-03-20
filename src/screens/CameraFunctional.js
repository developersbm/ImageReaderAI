import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Button from './components/Button.js';
import { Icon } from '@iconify/react';

export default function CameraScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Choose a picture.');
    }
    else {
      alert('Sorry, we need media library permissions to access your photos.');
    }
  };

  const openImagePicker = async () => {
    await requestMediaLibraryPermission();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  /*
  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert('Picture saved!');
        setImage(null);
        console.log('Saved successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };
  */

  const submitPicture = async () => { 
    if (image) {
      try {
        // Navigate to the new screen with the chosen image
        navigation.navigate('AiScreen', { imageURI: image });
      } catch (error) {
        console.log(error);
      }
    }
  };  

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              alignItems: 'center', // Center the buttons vertically
            }}
          >
            <Button
              title=""
              icon="retweet"
              size={30}
              onPress={() => {
                setType(
                  type === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
                
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              size={30}
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'white' : 'yellow'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      {/* Icon to access the library */}
      {!image && (
        <TouchableOpacity style={styles.libraryIcon} onPress={openImagePicker}>
          <Ionicons name="md-images" size={32} color="white" />
        </TouchableOpacity>
        
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
              size={30}
            />
            <Button title="Submit" onPress={submitPicture} icon="check" color={'white'} size={30}/>
          </View>
        ) : (
          <Button
            onPress={takePicture}
            icon="circle"
            size={60}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  controls: {
    flex: 0.5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 30,
  },
  libraryIcon: {
    position: 'absolute',
    bottom: 70,
    left: 20,
  },
  topControls: {
    flex: 1,
  },
});
