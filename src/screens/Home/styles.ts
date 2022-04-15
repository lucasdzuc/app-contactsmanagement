/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 64}px;
  background: #fff;
`;

export const Header = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AreaUserHeader = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TitleHeader = styled.Text`
  font-size: 16px;
  color: #436074;
`;

export const UserNameHeader = styled.Text`
  font-size: 40px;
  color: #436074;
  font-weight: bold;
`;

export const AreaButtonsHome = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const ButtonLogoutHome = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  margin: 0px 8px;
`;

export const ButtonAddContactHeader = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  background: #436074;
  justify-content: center;
  align-items: center;
`;

export const CardContact = styled.View`
  width: 100%;
  height: 72px;
  border-radius: 5px;
  background: #9DB1B6;
  margin-bottom: 10px;
  padding: 0px 24px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AreaText = styled.View``;

export const NameContact = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const NumberContact = styled.Text`
  font-size: 14px;
  color: #436074;
  padding-top: 6px;
`;

export const ButtonDetailContact = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: flex-end;
  /* background: red; */
`;

export const TextButtonDetailContact = styled.Text``;
