import { Button, Grid, IconButton } from '@material-ui/core';
import React, { useState } from 'react';

export default function MemberShowEvents(userDetails) {
  console.log(userDetails.userDetails);

  return (
    <div className="App">
      {userDetails.userDetails.attendedEvents}
    </div>
  );
}
