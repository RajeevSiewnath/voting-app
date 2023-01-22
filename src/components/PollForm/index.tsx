import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { useStore } from '../../contexts/StoreContext';
import { ADD, DELETE, MODIFY, QUESTION, RESET } from '../../reducers/PollReducer';

export default function PollForm() {
  const { state, dispatch } = useStore()
  const [updateAnswer, setUpdateAnswer] = useState<string>('')
  const [newAnswer, setNewAnswer] = useState<string>('')
  const [editAnswerIndex, setEditAnswerIndex] = useState<number>(NaN)

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

  useEffect(() => {
    setUpdateAnswer(state.answers[editAnswerIndex])
  }, [editAnswerIndex, setUpdateAnswer, state])

  const isFieldDuplicate = useCallback((answer: string, index: number = NaN) => {
    return !!state.answers.find((a, j) => a === answer && (Number.isNaN(index) || index !== j))
  }, [state])

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (Number.isNaN(editAnswerIndex)) {
        if (!state.answers.find((a) => a === newAnswer)) {
          submitNewAnswer()
        }
      } else if (
        updateAnswer && !state.answers.find((a, j) => a === updateAnswer && editAnswerIndex !== j)
      ) {
        setEditAnswerIndex(NaN);
        changeAnswer(updateAnswer, editAnswerIndex)
      }
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            label="Question"
            value={state.question}
            inputProps={{ maxLength: 80 }}
            onChange={(e) => setQuestion(e.target.value)}
            helperText={state.question.length === 80 ? 'Maximum character limit reached' : undefined}
          />
        </Grid>
        {state.answers.map((a, i) => (
          <React.Fragment key={i}>
            <Grid item xs={8} >
              <TextField
                error={isFieldDuplicate(editAnswerIndex === i ? updateAnswer : a, i)}
                helperText={isFieldDuplicate(editAnswerIndex === i ? updateAnswer : a, i) ? 'Duplicate answer' : undefined}
                size="small"
                fullWidth
                label={`Answer ${i + 1}`}
                value={(editAnswerIndex === i ? updateAnswer : a) || ""}
                inputProps={{ maxLength: 80 }}
                onChange={(e) => setUpdateAnswer(e.target.value)}
                disabled={editAnswerIndex !== i}
              />
            </Grid>
            {editAnswerIndex !== i ?
              <React.Fragment>
                <Grid item xs={2} >
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => window.confirm("Are you sure you want to delete this answer?") && deleteAnswer(i)}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
                <Grid item xs={2} >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setEditAnswerIndex(i)}
                  >
                    <EditIcon />
                  </Button>
                </Grid>
              </React.Fragment> : <React.Fragment>
                <Grid item xs={2} >
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => setEditAnswerIndex(NaN)}
                  >
                    <CancelIcon />
                  </Button>
                </Grid>
                <Grid item xs={2} >
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={!updateAnswer || !!state.answers.find((a, j) => a === updateAnswer && i !== j)}
                  >
                    <SaveIcon />
                  </Button>
                </Grid>
              </React.Fragment>}
          </React.Fragment>
        ))}
        <Grid item xs={8}>
          <TextField
            disabled={!Number.isNaN(editAnswerIndex)}
            error={isFieldDuplicate(newAnswer)}
            helperText={isFieldDuplicate(newAnswer) ? "Duplicate answer" : undefined}
            size="small"
            fullWidth
            label="New answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            style={{ opacity: Number.isNaN(editAnswerIndex) ? 1 : 0.5 }}
            type={Number.isNaN(editAnswerIndex) ? "submit" : "button"}
            disabled={!Number.isNaN(editAnswerIndex) || !newAnswer || isFieldDuplicate(newAnswer)}
            variant="contained"
            fullWidth
          >
            <AddIcon />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              if (window.confirm("Are you sure you want to reset the app?")) {
                setEditAnswerIndex(NaN);
                resetAnswer();
              }
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}