import { Button, Grid, IconButton } from '@material-ui/core';
import React, { useState } from 'react';

export default function MemberShowEvents(userDetails) {
  const fName = userDetails.userDetails.firstname;
  const lName = userDetails.userDetails.lastname;
  const eventsLen = userDetails.userDetails.attendedEvents.length;
  const events = userDetails.userDetails.attendedEvents;
  console.log(eventsLen);

  return (
    <div>
      <ul>
        <li>{events[1]}</li>
        <li>{events[2]}</li>
      </ul>
    </div>
  );
}
