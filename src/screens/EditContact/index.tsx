import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import useAuth from '../../hooks/useAuth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Titles,
} from './styles';

interface ContactFormData {
  name: string;
  lastname: string;
  telephone: string;
  birthdate: string;
  email: string;
  street: string;
  complement: string;
  district: string;
  city: string;
  uf: string;
}

const EditContact: React.FC = () => {

  const { token } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const route = useRoute();
  const { goBack, navigate } = useNavigation();

  const { _id } = route.params as any;

  const [contact, setContact] = useState<ContactFormData[]>([]);

  useEffect(() => {
    async function loadPost(){
      const response = await api.get(`contacts/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      formRef.current.setData(response.data)
      setContact(response.data);
    }
    loadPost();
  }, [_id, token]);

  // SUBMIT FORM
  const handleUpdateContact = useCallback(async (data: ContactFormData) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        lastname: Yup.string().required('Sobrenome obrigatório'),
        telephone: Yup.string().required('Telefone obrigatório'),
        birthdate: Yup.string().required('Data obrigatória'),
        email: Yup.string().required('Nome obrigatório').email('Digite um e-mail válido'),
        street: Yup.string().required('Rua obrigatória'),
        complement: Yup.string().required('Complemento obrigatório'),
        district: Yup.string().required('Bairro obrigatório'),
        city: Yup.string().required('Cidade obrigatória'),
        uf: Yup.string().required('UF obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      await api.put(`contacts/${_id}`, data, {
        headers: {
          Authorization: token
        }
      });
      goBack();
      // navigate('Home');
    } catch (err) {
      console.log(err);

      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });
        formRef.current.setErrors(errorMessages);
      }
    }
  }, [_id, token]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={10}
        enabled
        contentContainerStyle={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          // keyboardShouldPersistTaps="handled"
          // contentContainerStyle={{ flex: 1 }}
        >
          <Form
            style={{ width: '100%', paddingHorizontal: 24, paddingBottom: 40 }}
            ref={formRef}
            // initialData={contact}
            onSubmit={handleUpdateContact}
          >
            <Titles>Contato</Titles>

            <Input
              name="name"
              placeholder="Nome"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              name="lastname"
              placeholder="Sobrenome"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              name="telephone"
              placeholder="(00) 00000-0000"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              name="birthdate"
              placeholder="00/00/0000"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              name="email"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />

            <Titles>Endereço</Titles>

            <Input
              name="street"
              placeholder="Rua, n°"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              name="complement"
              placeholder="Complemento"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              name="district"
              placeholder="Bairro"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              name="city"
              placeholder="Cidade"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <Input
              name="uf"
              placeholder="UF"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="send"
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Atualizar
            </Button>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default EditContact;
