import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

export default function MemberShowEvents(props) {
  const { firstName, lastName, openPopup, setOpen } = props;
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <div>title</div>
      </DialogTitle>
      <DialogContent>
        <div>content</div>
      </DialogContent>
    </Dialog>
  );
}
