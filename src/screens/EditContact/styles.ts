import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 24}px;
  background: #fff;
  align-items: center;
`;

export const Titles = styled.Text`
  font-size: 16px;
  color: #436074;
  font-weight: bold;
  padding: 8px 0px 16px 0px;
`;
