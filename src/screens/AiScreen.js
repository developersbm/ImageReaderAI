import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Network from 'expo-network';

const analyzeImage = async (imageURI) => {
  try {
    const isConnected = await Network.getNetworkStateAsync();
    if (!isConnected.isInternetReachable) {
      throw new Error('No internet connection.');
    }

    const response = await fetch(`https://api.bard.ai/v1/analyses?image=${imageURI}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

export default function Chat({ route }) {
  const { imageURI } = route.params;
  const [messages, setMessages] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => null, // Remove the header right component
    });
  }, [navigation]);

  useEffect(() => {
    // Create the initial message
    const initialMessage = {
      _id: 1,
      text: 'Hello this is the image you choose. Please make any questions!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Chat Bot',
        avatar: 'src/screens/components/Logo.png',
      },
    };

    // Create the initial image message
    const initialImageMessage = {
      _id: 2,
      image: imageURI,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Chat Bot',
        avatar: 'src/screens/components/Logo.png',
      },
    };

    // Set the initial messages as an array containing both initial and image messages
    setMessages([initialMessage, initialImageMessage]);

    // Call the analyzeImage function when the component mounts
    analyzeImage(imageURI)
      .then((data) => {
        // Update the analysisResults state with the results
        setAnalysisResults(data.results.summary);
      })
      .catch((error) => {
        console.error('Error analyzing image:', error);
      });
  }, [imageURI]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => {
      const newMessages = GiftedChat.append(previousMessages, messages);
      newMessages.push({
        _id: 3,
        text: analysisResults || '', // Use the analysis results or an empty string if it's not available yet
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chat Bot',
          avatar: 'src/screens/components/Logo.png',
        },
      });
      return newMessages;
    });
  }, [analysisResults]);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{ backgroundColor: '#fff' }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      // Render the analysis results in the chat
      renderCustomView={(props) => {
        if (props.currentMessage.text === analysisResults) {
          return (
            <View style={{ alignSelf: 'center', marginBottom: 10 }}>
              <Text>{analysisResults}</Text>
            </View>
          );
        }
        return null;
      }}
    />
  );
}

/*
import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Network from 'expo-network';
import { VisionAPI } from 'react-native-google-vision'; // Import VisionAPI

const analyzeImage = async (imageURI) => {
  try {
    const isConnected = await Network.getNetworkStateAsync();
    if (!isConnected.isInternetReachable) {
      throw new Error('No internet connection.');
    }

    const response = await visionAPI.analyzeImage(imageURI);
    return response.labels[0].description; // Return the description of the label
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

export default function Chat({ route }) {
  const { imageURI } = route.params;
  const [messages, setMessages] = useState([]);
  const [analysisResults, setAnalysisResults] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => null, // Remove the header right component
    });
  }, [navigation]);

  useEffect(() => {
    // Create the initial message
    const initialMessage = {
      _id: 1,
      text: 'Hello this is the image you choose. Please make any questions!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Chat Bot',
        avatar: 'src/screens/components/Logo.png',
      },
    };

    // Create the initial image message
    const initialImageMessage = {
      _id: 2,
      image: imageURI,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Chat Bot',
        avatar: 'src/screens/components/Logo.png',
      },
    };

    // Set the initial messages as an array containing both initial and image messages
    setMessages([initialMessage, initialImageMessage]);

    // Call the analyzeImage function when the component mounts
    analyzeImage(imageURI)
      .then((label) => {
        // Update the analysisResults state with the label
        setAnalysisResults(label);
      })
      .catch((error) => {
        console.error('Error analyzing image:', error);
      });
  }, [imageURI]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => {
      const newMessages = GiftedChat.append(previousMessages, messages);
      newMessages.push({
        _id: 3,
        text: analysisResults || '', // Use the analysis results or an empty string if it's not available yet
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chat Bot',
          avatar: 'src/screens/components/Logo.png',
        },
      });
      return newMessages;
    });
  }, [analysisResults]);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(newMessages) => onSend(newMessages)}
      messagesContainerStyle={{ backgroundColor: '#fff' }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      // Render the analysis results in the chat
      renderCustomView={(props) => {
        if (props.currentMessage.text === analysisResults) {
          return (
            <View style={{ alignSelf: 'center', marginBottom: 10 }}>
              <Text>{analysisResults}</Text>
            </View>
          );
        }
        return null;
      }}
    />
  );
}
*/