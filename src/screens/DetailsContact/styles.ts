import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 24}px;
  background: #fff;
  align-items: center;
`;

export const CardContact = styled.View`
  flex: 1;
  width: 350px;
  height: 252px;
  border-radius: 5px;
  background: #9DB1B6;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NameContact = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
`;

export const PhoneContact = styled.Text`
  color: #436074;
  font-size: 18px;
  padding: 8px 0px;
`;

export const EmailContact = styled.Text`
  font-size: 16px;
  color: #436074;
`;

export const AreaButtonsCardContact = styled.View`
  /* flex: 1; */
  /* weight: 100%; */
  padding: 24px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonEditContact = styled.TouchableOpacity`
  width: 52px;
  height: 52px;
  border-radius: 100px;
  background: #436074;
  margin: 0px 8px;
  justify-content: center;
  align-items: center;
`;

export const DeleteEditContact = styled.TouchableOpacity`
  width: 52px;
  height: 52px;
  border-radius: 100px;
  background: #436074;
  margin: 0px 8px;
  justify-content: center;
  align-items: center;
`;

export const CardMoreInfo = styled.View`
  padding: 16px 0px 0px 0px;
`;

export const TitleCardMoreInfo = styled.Text`
  font-size: 16px;
  color: #436074;
`

export const TextCardMoreInfo = styled.Text`
  font-size: 16px;
  color: #436074;
  font-weight: bold;
`;
