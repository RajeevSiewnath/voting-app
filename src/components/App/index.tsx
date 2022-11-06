import React from 'react';
import { Box, Grid } from '@mui/material'
import Header from '../Header';
import PollForm from '../PollForm';
import PollQuestion from '../PollQuestion';
import PollResult from '../PollResult';

export default function App() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ p: 2, borderRight: '1px solid #00000066', height: 'calc(100vh - 96px)' }}>
          <PollForm />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ p: 2, borderRight: '1px solid #00000066', height: 'calc(100vh - 96px)' }}>
          <PollQuestion />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ p: 2, height: 'calc(100vh - 96px)' }}>
          <PollResult />
        </Box>
      </Grid>
    </Grid >
  );
}