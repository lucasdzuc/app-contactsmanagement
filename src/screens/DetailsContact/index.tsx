/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import useAuth from '../../hooks/useAuth';

import formatPhone from '../../utils/formartPhone';

import {
  Container,
  CardContact,
  NameContact,
  PhoneContact,
  EmailContact,
  AreaButtonsCardContact,
  ButtonEditContact,
  DeleteEditContact,
  CardMoreInfo,
  TitleCardMoreInfo,
  TextCardMoreInfo,
} from './styles';

interface IContact {
  _id?: string;
  name?: string;
  lastname?: string;
  telephone?: string;
  birthdate?: string;
  email?: string;
  street?: string;
  complement?: string;
  district?: string;
  city?: string;
  uf?: string;
  user?: string;
  createdAt?: string;
}

const DetailsContact = () => {

  const { token } = useAuth();

  const route = useRoute();
  const { goBack, navigate } = useNavigation();

  const { _id } = route.params as any;
  // console.log(_id);

  const [contact, setContact] = useState<IContact[]>([]);

  async function loadContact(){
    try {

      const response = await api.get(`contacts/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(response.data);
      setContact(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadContact();
  }, [_id]);

  function handleNavigateEditContact(_id: string) {
    navigate('EditContact', { _id })
  };

  // function navigateToDetailsContact(_id: string){
  //   navigation.navigate('DetailsContact', { _id });
  // }

  const handleDeleteContact = useCallback((contact) => {
    Alert.alert(`${contact.name}`,
    `Deseja realmente excluir o contato da sua lista?`,
      [
        {
          text: "Cancelar",
          onPress: () => {}, // console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "SIM", onPress: async () => {
            try {
              await api.delete(`contacts/${_id}`, {
                headers: {
                  Authorization: token
                }
              });
              goBack();
            } catch (error) {
              console.log(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  }, [_id, token]);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>

        <CardContact>
          <NameContact>{contact.name} {contact.lastname}</NameContact>
          <PhoneContact>{formatPhone(contact.telephone)}</PhoneContact>
          <EmailContact>{contact.email}</EmailContact>

          <AreaButtonsCardContact>
            <ButtonEditContact
              activeOpacity={0.8}
              onPress={() => handleNavigateEditContact(contact._id)}
            >
              <Icon name="edit-3" size={24} color="#fff" />
            </ButtonEditContact>

            <DeleteEditContact
              activeOpacity={0.8}
              onPress={() => handleDeleteContact(contact)}
            >
              <Icon name="trash-2" size={24} color="#fff" />
            </DeleteEditContact>
          </AreaButtonsCardContact>
        </CardContact>

        <CardMoreInfo>
          <TitleCardMoreInfo>Aniversário</TitleCardMoreInfo>
          <TextCardMoreInfo>{contact.birthdate}</TextCardMoreInfo>
        </CardMoreInfo>

        <CardMoreInfo>
          <TitleCardMoreInfo>Endereço</TitleCardMoreInfo>
          <TextCardMoreInfo>{contact.street}</TextCardMoreInfo>
        </CardMoreInfo>
        <CardMoreInfo>
          <TitleCardMoreInfo>Complemento</TitleCardMoreInfo>
          <TextCardMoreInfo>{contact.complement}</TextCardMoreInfo>
        </CardMoreInfo>
        <CardMoreInfo>
          <TitleCardMoreInfo>Bairro</TitleCardMoreInfo>
          <TextCardMoreInfo>{contact.district}</TextCardMoreInfo>
        </CardMoreInfo>
        <CardMoreInfo>
          <TitleCardMoreInfo>Cidade</TitleCardMoreInfo>
          <TextCardMoreInfo>{contact.city}</TextCardMoreInfo>
        </CardMoreInfo>
        <CardMoreInfo>
          <TitleCardMoreInfo>UF</TitleCardMoreInfo>
          <TextCardMoreInfo>{contact.uf}</TextCardMoreInfo>
        </CardMoreInfo>

      </ScrollView>
    </Container>
  );
};

export default DetailsContact;
