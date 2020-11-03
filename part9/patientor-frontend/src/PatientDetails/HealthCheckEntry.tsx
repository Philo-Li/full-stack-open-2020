import React from "react";

import { Container, Icon } from "semantic-ui-react";

import { HealthCheckEntry as HealthCheck } from "../types";

const ratingIconProps = {
  0: { name: "heart" as "heart", color: "blue" as "blue" },
  1: { name: "heart" as "heart", color: "pink" as "pink" },
  2: { name: "heart" as "heart", color: "orange" as "orange" },
  3: { name: "heart" as "heart", color: "red" as "red" },
};

const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
  return (
    <div>
      <Container>
        healthCheckRating:
        <Icon {...ratingIconProps[entry.healthCheckRating]} />
      </Container>
    </div>
  );
};

export default HealthCheckEntry;
