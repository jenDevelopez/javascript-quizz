import {IconButton, Stack,Card,Typography, List, ListItem, ListItemButton,ListItemText, } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos} from '@mui/icons-material'
import { useQuestionStore } from './store/questions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from './types'
import Footer from './Footer'

const Question = ({info}: {info:QuestionType}) => {
  const selectedAnswer = useQuestionStore(state => state.selectedAnswer)
  const createHandleClick = (answerIndex:number) => () => {
    selectedAnswer(info.id ,answerIndex)
  }
  const getBackgroundColor = (info:QuestionType, index: number) =>  {
    const {userSelectedAnswer, correctAnswer} = info
    //el usuario no ha seleccionado nada todavia
    if(userSelectedAnswer == null) return 'transparent'
    //si ha seleccionado pero la respuesta es incorrecta
    if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    //si es la solución correcta
    if(index === correctAnswer) return 'green'
    //si esta es la seleccion del usuario pero no es correcta
    if(index === userSelectedAnswer) return '#ff0000'
    //si no es ninguna de las anteriores
    return 'transparent'
  }
  return (
    <Card  variant='outlined' sx={{textAlign: 'left', bgcolor: '#222',p:2, marginTop:4}}>
      <Typography variant='h5'>
        {info.question}
      </Typography>


      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>


      <List sx={{bgcolor:'#333'}} disablePadding >
        {info.answers.map((answer,index) => (
          <ListItem key={index} disablePadding divider>
          <ListItemButton disabled={info.userSelectedAnswer != null} sx={{backgroundColor: getBackgroundColor(info, index)}} onClick={createHandleClick(index)}>
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )

}


function Game() {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestion = useQuestionStore(state => state.currentQuestion)
  console.log(questions)
  const questionInfo = questions[currentQuestion]
  const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionStore(state => state.goPreviousQuestion)
  
  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion +1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length -1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo}/>
      <Footer />
    </>
  )
}

export default Game
