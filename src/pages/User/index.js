import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import api from '../../services/api';

// import { Container } from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  constructor() {
    super().state = {
      stars: [],
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const { data: stars } = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars });
  }

  render() {
    const { stars } = this.state;

    return <View />;
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
