import React, { useRef, useEffect } from "react";
import axios from "axios";
import { Container, Icon, Table, Button, Card } from "semantic-ui-react";

import { Entry } from "../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type){
    case 'Hospital':
      return <HospitalEntry discharge={entry.discharge}/>;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry employerName={entry.employerName} sickLeave={entry.sickLeave}/>;
    case 'HealthCheck':
      return <HealthCheckEntry healthCheckRating={entry.healthCheckRating}/>;
    default:
      // eslint-disable-next-line no-undef
      return assertNever(entry);
  }
};

export default EntryDetails;
