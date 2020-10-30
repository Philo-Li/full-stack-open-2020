import React from "react";
import { Container, Icon } from "semantic-ui-react";

type Discharge = {
  date: string;
  criteria: string;
};

const HospitalEntry: React.FC<{ discharge: Discharge }> = ({ discharge }) => {
  return (
    <div>
      <Container>
        discharge:
        <ul>
          date: {discharge.date}
        </ul>
        <ul>
          criteria: {discharge.criteria}
        </ul>
      </Container>
    </div>
  );
};

export default HospitalEntry;
