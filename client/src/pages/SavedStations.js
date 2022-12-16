import React from 'react';
import {
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_STATION } from '../utils/mutations';
import { removeStationId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SavedStations = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeStation, { error }] = useMutation(REMOVE_STATION);

  const userData = data?.me || {};

  // create function that accepts the station's mongo _id value as param and deletes the station from the database
  const handleDeleteStation = async (stationId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeStation({
        variables: { stationId },
      });

      // upon success, remove station's id from localStorage
      removeStationId(stationId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      
        <Container fluid className="text-light bg-dark">
          <h1>Viewing {userData.username}'s stations!</h1>
        </Container>
      
      <Container>
        <h2>
          {userData.savedStations?.length
            ? `Viewing ${userData.savedStations.length} saved ${
                userData.savedStations.length === 1 ? 'station' : 'stations'
              }:`
            : 'You have no saved stations!'}
        </h2>
        <CardColumns>
            {/* map a station in the () below */}
          {userData.savedStations?.map((station) => {
            return (
              <Card key={station.stationId} border="dark">
             
                <Card.Body>
                  <Card.Title>{station.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteStation(book.stationId)}
                  >
                    Delete this Station!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedStations;
