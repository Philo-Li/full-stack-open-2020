import React from "react";
import { assertNever } from "../utils";

import { Entry, EntryType } from "../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type){
    case EntryType.Hospital:
      return <HospitalEntry entry={entry}/>;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry}/>;
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry}/>;
    default:
      // eslint-disable-next-line no-undef
      return assertNever(entry);
  }
};

export default EntryDetails;
