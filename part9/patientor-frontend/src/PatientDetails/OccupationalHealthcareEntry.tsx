import React from "react";
import { List } from "semantic-ui-react";

import { OccupationalHealthcareEntry as OccupationalHealthcare } from "../types";

const OccupationalHealthcareEntry: React.FC<{ entry: OccupationalHealthcare }> = ({ entry }) => {
  return (
    <List>
      <List.Item>
        <strong>Employer:</strong> {entry.employerName}
      </List.Item>
      {entry.sickLeave && (
        <List.Item>
          <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </List.Item>
      )}
    </List>
  );
};

export default OccupationalHealthcareEntry;
