import "./App.css";
import { Container, Typography, Stack } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { JavaScriptLogo} from "./JavaScriptLogo";
import { useQuestionStore } from "./store/questions";
import Start from "./Start";
import Game from "./Juego";
function App() {

  const questions = useQuestionStore(state => state.questions)

  console.log(questions)
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems='center'
          justifyContent='center'
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quizz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
     
      </Container>
    </main>
  );
}

export default App;
