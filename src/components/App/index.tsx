import React from 'react';
import { Box, Grid } from '@mui/material'
import Header from '../Header';
import PollForm from '../PollForm';
import PollQuestion from '../PollQuestion';
import PollResult from '../PollResult';
import Store from '../../Store';

export default function App() {
  return (
    <Store>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{
            p: 2,
            borderRight: { lg: '1px solid #00000066', xs: 'none' },
            borderBottom: { lg: 'none', xs: '1px solid #00000066' },
            height: { lg: 'calc(100vh - 96px)', xs: 'auto' }
          }}>
            <PollForm />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{
            p: 2,
            borderRight: { lg: '1px solid #00000066', xs: 'none' },
            borderBottom: { lg: 'none', xs: '1px solid #00000066' },
            height: { lg: 'calc(100vh - 96px)', xs: 'auto' }
          }}>
            <PollQuestion />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{
            p: 2,
            height: { lg: 'calc(100vh - 96px)', xs: 'auto' }
          }}>
            <PollResult />
          </Box>
        </Grid>
      </Grid >
    </Store>
  );
}