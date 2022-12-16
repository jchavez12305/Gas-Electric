import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_STATION = gql`
  mutation saveStation($stationData: stationInput!) {
    savedStation(stationData: $stationData) {
      _id
      username
      email
      savedStations {
        stationName
        fuelType
				address
      }
    }
  }
`;

export const REMOVE_STATION = gql`
  mutation removeStation($stationName: ID!) {
    removeStation(stationName: $stationName) {
      _id
      username
      email
      savedStation {
        stationName
        fuelType
				address
      }
    }
  }
`;
