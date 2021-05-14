import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const InfoBox = (props) => {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {props.title}
        </Typography>

        <h2 className="infoBox__cases">{props.cases}</h2>

        <Typography className="infoBox__total" color="textSecondary">
          {props.total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
