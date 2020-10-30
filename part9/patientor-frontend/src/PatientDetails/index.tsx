import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon, Card } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { toPatient } from "../utils";
import EntryDetails from "./EntryDetails";

const genderIconProps = {
  male: { name: "mars" as "mars", color: "blue" as "blue" },
  female: { name: "venus" as "venus", color: "pink" as "pink" },
  other: { name: "genderless" as "genderless", color: "grey" as "grey" },
};

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();
  const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });

  let patient = patients[id];

  try {
    patient = toPatient({ ...patient });
  } catch (e) {
    if (e instanceof Error && !fetchStatus.current.hasFetched) {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
    } else {
      console.error(e);
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
        fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
      } catch (e) {
        console.error(e);
      }
    };

    if (fetchStatus.current.shouldFetch) {
      fetchPatient();
    }
  }, [id, dispatch]);


  if (!patient) return null;

  return (
    <div className="App">
      <Container>
        <h1>
          {patient.name} <Icon {...genderIconProps[patient.gender]} />
        </h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>

        <h3>entries</h3>
        <Card.Group>
        {patient.entries.map(entry => {
          return(
          <div key = {entry.id} >
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  {entry.date}
                  <Icon name='user md' size='large'/>
                </Card.Header>
                <Card.Meta>specialist: {entry.specialist}</Card.Meta>
                <Card.Description>
                description: {entry.description}
                  <ul>
                    {entry.diagnosisCodes?.map(code => {
                      return(
                        <li key={code}>
                          <strong>{code} - </strong>
                          {diagnoses[code] && diagnoses[code].name}
                        </li>
                      );
                    })}
                  </ul>
                  <EntryDetails entry={entry} />
                </Card.Description>
              </Card.Content>
            </Card>            
          </div>
          );
        })}
        </Card.Group>
      </Container>
      
    </div>
  );
};

export default PatientDetails;
