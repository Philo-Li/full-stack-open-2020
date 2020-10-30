import React from "react";
import { Container, Icon, Card } from "semantic-ui-react";

import { Entry } from "../types";

type SickLeave = {
  startDate: string;
  endDate: string;
};

const sickLeaveForm = (sickLeave: SickLeave) => {
  return (
    <div>
      sickLeave:
      <ul>
        startDate: {sickLeave.startDate}
      </ul>
      <ul>
        endDate: {sickLeave.endDate}
      </ul>
    </div>
  );
};

const OccupationalHealthcareEntry: React.FC<{ employerName: string; sickLeave: SickLeave }> = ({ employerName, sickLeave }) => {
  return (
    <div>
      <Container>
        employerName: {employerName}
        { sickLeave ? sickLeaveForm(sickLeave) : null}
      </Container>
    </div>
  );
};

export default OccupationalHealthcareEntry;
