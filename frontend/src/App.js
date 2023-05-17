import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import {AuthProvider, AuthConsumer} from './context/JWTAuthContext'
import { Spinner, Flex } from '@chakra-ui/react';
import { PublicRoute } from './components/Auth/PublicRoute';
import { Authenticated } from './components/Auth/Authenticated';
import { NavBar } from './components/Navbar/NavBar';
import { QuizList } from './components/Quiz/QuizList';
import { QuizDetail } from './components/Quiz/QuizDetail';
import Process from './components/Quiz/Process';
import { ResultList } from './components/Quiz/ResultList';
import {ResultDetail} from './components/Quiz/ResultDetail'

function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <AuthConsumer>
      {(auth) => !auth.isInitialized ? (
        <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="green.200" color="green.500" size="xl"/>
        </Flex>
      ): (
        <Routes>
        <Route path="/login" element={<PublicRoute><Login></Login></PublicRoute>}></Route>
        <Route path="/register" element={<PublicRoute><Register></Register></PublicRoute>}></Route>
        <Route path="/" element={<Authenticated><NavBar></NavBar></Authenticated>}>
          <Route path="/" element={<Authenticated><QuizList></QuizList></Authenticated>}></Route>
        </Route>
        <Route path="/:quizId" element={
          <Authenticated><QuizDetail></QuizDetail></Authenticated>}>
        </Route>
        <Route path="/results/:quizId" element={
          <Authenticated><ResultList></ResultList></Authenticated>}>
        </Route>
        <Route path="/result_details/:resultId" element={
          <Authenticated><ResultDetail></ResultDetail></Authenticated>}>
        </Route>
        <Route path="/process/:quizId" element={
          <Process></Process>
        }>
        </Route>
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
        )
      }
      </AuthConsumer>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
