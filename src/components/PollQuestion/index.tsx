import { useCallback, useState } from 'react';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useStore } from '../../contexts/StoreContext';
import { ANSWER } from '../../reducers/PollReducer';

export default function PollQuestion() {
  const { state, dispatch } = useStore()
  const [answer, setAnswer] = useState<string>('')

  const vote = useCallback(() => {
    if (answer) {
      dispatch({ type: ANSWER, payload: { answer } })
      setAnswer('')
    }
  }, [answer, dispatch, setAnswer])

  if (state.answers.length < 2 || state.question.length === 0) {
    return <p><i>Please provide at least 2 answers and a question</i></p>
  }

  return (
    <FormControl fullWidth>
      <p><strong>{state.question}</strong></p>
      <RadioGroup
        name="answers"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      >
        {state.answers.map(a => (
          <FormControlLabel key={a} value={a} label={a} control={<Radio />} />
        ))}
      </RadioGroup>
      <Button
        variant="contained"
        fullWidth
        disabled={!answer}
        onClick={vote}
      >
        Submit
      </Button>
    </FormControl>
  );
}