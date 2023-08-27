import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ReviewCard from '../components/ReviewCard';
import AppButton from '../components/App/Button';
import ResponseCard from '../components/ResponseCard';
import {fetchOpenAIContent} from '../api/index';

const ResponseReview = () => {
  const insets = useSafeAreaInsets();
  const review = {
    id: '60d21bf367d0d8992e610e88',
    text: 'Hi, Your company provided perfect environment. I hope visit here again. Awesome!',
    owner: {
      firstName: 'Benjamin',
      id: '60d0fe4f5311236168a109f4',
      lastName: 'Holland',
      picture: 'https://randomuser.me/api/portraits/med/men/58.jpg',
      title: 'mr',
    },
    publishDate: '2020-05-20T18:51:23.478Z',
  };
  const [prompt, setPrompt] = useState('');

  const getAIReply = async () => {
    let res = await fetchOpenAIContent(review.text);
    let str = await res.trimStart();
    await setPrompt(str);
  };
  useEffect(() => {}, []);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={[styles.content, {padding: 24}]}>
        <ReviewCard {...review} />
        <AppButton
          style={{
            backgroundColor: '#5FDCB3',
            marginTop: 12,
            marginBottom: 24,
          }}
          onPress={getAIReply}>
          Use AI response assistant
        </AppButton>
        <ResponseCard prompt={prompt} />
      </View>
      <View style={styles.bottomComponent}>
        <AppButton>Send a response</AppButton>
        {/* Component to be placed at the bottom */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
  bottomComponent: {
    paddingHorizontal: 32,
    paddingVertical:12,
  },
});

export default ResponseReview;
