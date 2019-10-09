import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import { Container, Form, Input, SubmitButton } from './styles';

export default class Main extends Component {
  constructor() {
    super().state = {
      newUser: '',
      users: [],
    };
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    const { data } = await api.get(`/users/${newUser}`);

    const user = {
      name: data.name,
      login: data.login,
      bio: data.bio,
      avatar: data.avatar_url,
    };

    this.setState({
      users: [...users, user],
      newUser: '',
    });

    Keyboard.dismiss();
  };

  render() {
    const { newUser, users } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCaptalize="none"
            autoCorrect={false}
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};
