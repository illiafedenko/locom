import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import moment from 'moment';

import AppText from './App/Text';
import ProfileImage from './ProfileImage';
import AppButton from './App/Button';

const ResponseCard = ({prompt}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.row}>
          <AppText weight={400} color="#8083A3">
            Response Text
          </AppText>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <AppText style={{flex: 1}} weight={800}>
            {prompt}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderWidth: 1,
    borderColor: 'rgba(228, 230, 232, 0.6)',
    borderRadius: 14,
    marginBottom: 8,
    padding: 12,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default ResponseCard;
