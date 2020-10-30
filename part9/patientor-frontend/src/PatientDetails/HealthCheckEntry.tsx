import React from "react";

import { Container, Icon } from "semantic-ui-react";

import { HealthCheckRating } from "../types";

const ratingIconProps = {
  0: { name: "heart" as "heart", color: "blue" as "blue" },
  1: { name: "heart" as "heart", color: "pink" as "pink" },
  2: { name: "heart" as "heart", color: "orange" as "orange" },
  3: { name: "heart" as "heart", color: "red" as "red" },
};

const HealthCheckEntry: React.FC<{ healthCheckRating: HealthCheckRating }> = ({ healthCheckRating }) => {
  return (
    <div>
      <Container>
        healthCheckRating:
        <Icon {...ratingIconProps[healthCheckRating]} />
      </Container>
    </div>
  );
};

export default HealthCheckEntry;
