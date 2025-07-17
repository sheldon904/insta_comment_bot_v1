import React from 'react';
import Button from '@mui/material/Button';

export const PrimaryButton = ({ children, ...props }) => (
  <Button variant="contained" color="primary" {...props}>
    {children}
  </Button>
);
