import React from "react";
import { List } from "semantic-ui-react";
import { HospitalEntry as Hospital } from "../types";

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <List>
      <List.Item>
        <List.Header>Discharged on {entry.discharge.date}</List.Header>
        {entry.discharge.criteria}
      </List.Item>
    </List>
  );
};

export default HospitalEntry;
