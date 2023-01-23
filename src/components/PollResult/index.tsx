import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import "./style.css"

const colors = [
  'red',
  'green',
  'blue',
  'orange',
  'purple',
  'cyan',
  'salmon',
  'grey',
]

export default function PollResult() {
  const { state } = useStore()
  const max = Math.max(0, ...Object.values(state.votes))
  const entries = Object.entries(state.votes) as unknown as Array<[number, number]>

  if (state.answers.length < 2 || state.question.length === 0) {
    return <p><i>Please provide at least 2 answers and a question</i></p>
  }

  return <>
    <p><strong>Results:</strong></p>
    <table id="results" cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
      <tbody>
        {[...Array(max + 2)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {entries.map(([answerIndex, votes], columnIndex) => {
              let text = ''
              let backgroundColor = 'transparent'
              if (rowIndex === max + 1) {
                text = state.answers[answerIndex]
              } else if (votes > max - rowIndex) {
                backgroundColor = colors[columnIndex]
              } else if (max - rowIndex === votes) {
                text = votes.toString()
              }
              return <td style={{ backgroundColor }} height={20} key={columnIndex}><div>{text}</div></td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </>
}