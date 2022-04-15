/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import useAuth from '../../hooks/useAuth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Titles } from './styles';

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

const AddingContact: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { token } = useAuth();

  const handleAddContact = useCallback(async (data: ContactFormData, { reset }: any) => {
      try {
        formRef.current?.setErrors({});

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
        await api.post(`contacts`, data, {
          headers: {
            Authorization: token
          }
        });
        reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao tentar cadastarto contato, cheque as credenciais',
        );
      }
  },[]);

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
          keyboardShouldPersistTaps="handled"
          // contentContainerStyle={{ flex: 1 }}
        >
          <Form style={{ width: '100%', paddingHorizontal: 24, paddingBottom: 40 }} ref={formRef} onSubmit={handleAddContact}>
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
              Cadastrar
            </Button>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddingContact;
