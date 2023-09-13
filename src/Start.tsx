import { Button } from '@mui/material'
import { useQuestionStore } from './store/questions'

function Start() {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestion)
  const handleClick = () => {
    fetchQuestions(10)
  }
  return (
    <Button variant='contained' onClick={handleClick}>¡Empezar!</Button>
  )
}

export default Start
