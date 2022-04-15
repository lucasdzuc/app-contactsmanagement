import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import useAuth from '../../hooks/useAuth';

import {
  Container,
  Header,
  AreaUserHeader,
  TitleHeader,
  UserNameHeader,
  AreaButtonsHome,
  ButtonLogoutHome,
  ButtonAddContactHeader,
  CardContact,
  AreaText,
  NameContact,
  NumberContact,
  ButtonDetailContact,
  TextButtonDetailContact,
} from './styles';

interface IContacts {
  _id?: string;
  name?: string;
  lastname?: string;
  telephone?: string;
  email?: string;
}

const Home = () => {

  const { user, token, signOut } = useAuth();

  const navigation = useNavigation();

  const [contacts, setContacts] = useState<IContacts[]>([]);
  const [total , setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadContacts(){
    try {
      if(loading){
        return;
      }
      if(total > 0 && contacts.length === total){
        return;
      }
      setLoading(true);
      const response = await api.get('contacts', {
        params: { page },
        headers: {
          Authorization: token,
        },
      });
      // console.log(response.data);
      setContacts([...contacts, ...response.data]);
      setTotal(response.headers.authorization);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error ao tentar carregar os contatos', error);
    }
  }

  useEffect(() => {
    loadContacts();
  }, [token]);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setLoading(true);
      loadContacts();
      // const response = await api.get('contacts', {
      //   params: { page },
      //   headers: {
      //     Authorization: token
      //   }
      // });
      // setContacts([ ...contacts, ...response.data ]);
      // setTotal(response.headers.authorization);
      // setPage(page + 1);
      setLoading(false);

      wait(2000).then(() => setRefreshing(false));
    } catch (error) {
      setLoading(false);
      console.log(error);
      setRefreshing(false);
    }
  }, [contacts, token]);


  function HeaderComponent(){
    return (
      <Header>
        <AreaUserHeader>
          <TitleHeader>Bem vindo,</TitleHeader>
          <UserNameHeader>{user.name}</UserNameHeader>
        </AreaUserHeader>
        <AreaButtonsHome>
          <ButtonLogoutHome onPress={signOut}>
            <Icon name="log-out" size={24} color="#9DB1B6" />
          </ButtonLogoutHome>

          <ButtonAddContactHeader onPress={() => navigation.navigate('AddContact')}>
            <Icon name="plus" size={24} color="#fff" />
          </ButtonAddContactHeader>
        </AreaButtonsHome>
      </Header>
    );
  }

  function FooterList({ load }: any){
    if (!load) {return null;}
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size={25} color="#9DB1B6" />
      </View>
    );
  }

  function navigateToDetailsContact(_id: string){
    navigation.navigate('DetailsContact', { _id });
  }

  return (
    <Container>

      <FlatList
        data={contacts}
        vertical
        style={{ paddingTop: 8 }}
        keyExtractor={(contact: { _id: string; }) => String(contact._id)}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {}}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        ListHeaderComponent={ <HeaderComponent /> }
        ListHeaderComponentStyle={{
          paddingBottom: 24,
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={ <FooterList load={loading} /> }
        renderItem={({ item: contact }: any) => (
          <CardContact>
            <AreaText>
              <NameContact>{contact.name}</NameContact>
              <NumberContact>{contact.telephone}</NumberContact>
            </AreaText>
            <ButtonDetailContact activeOpacity={0.8} onPress={() => navigateToDetailsContact(contact._id)}>
              <Icon name="arrow-right" size={24} color="#fff" />
            </ButtonDetailContact>
          </CardContact>
        )}
      />
    </Container>
  );
};

export default Home;
