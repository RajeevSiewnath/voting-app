import React, { useCallback, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useStore } from '../../contexts/StoreContext';
import { ADD, DELETE, MODIFY, QUESTION, RESET } from '../../reducers/PollReducer';

export default function PollForm() {
  const { state, dispatch } = useStore()
  const [newAnswer, setNewAnswer] = useState<string>('')

  const setQuestion = useCallback((question: string) => {
    dispatch({ type: QUESTION, payload: { question } })
  }, [dispatch])

  const submitNewAnswer = useCallback(() => {
    dispatch({ type: ADD, payload: { answer: newAnswer } })
    setNewAnswer('')
  }, [newAnswer, setNewAnswer, dispatch])

  const changeAnswer = useCallback((answer: string, index: number) => {
    dispatch({ type: MODIFY, payload: { answer, index } })
  }, [dispatch])

  const deleteAnswer = useCallback((index: number) => {
    dispatch({ type: DELETE, payload: { index } })
  }, [dispatch])

  const resetAnswer = useCallback(() => {
    dispatch({ type: RESET })
  }, [dispatch])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          size="small"
          fullWidth
          label="Question"
          value={state.question}
          inputProps={{ maxLength: 80 }}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Grid>
      {state.answers.map((a, i) => (
        <React.Fragment key={i}>
          <Grid item xs={8} >
            <TextField
              size="small"
              fullWidth
              label={`Answer ${i + 1}`}
              value={a}
              inputProps={{ maxLength: 80 }}
              onChange={(e) => changeAnswer(e.target.value, i)}
            />
          </Grid>
          <Grid item xs={4} >
            <Button
              variant="contained"
              fullWidth
              onClick={() => deleteAnswer(i)}
            >
              x
            </Button>
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={8} >
        <TextField
          size="small"
          fullWidth
          label="New answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
      </Grid>
      <Grid item xs={4} >
        <Button
          disabled={!newAnswer}
          variant="contained"
          fullWidth
          onClick={() => submitNewAnswer()}
        >
          +
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => resetAnswer()}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}