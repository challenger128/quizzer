import { Box, Button, Center, Container, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import { QuizCard } from "./QuizCard";
import AddUpdateQuizModal from './AddUpdateQuizModal';

export const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchQuizzes();
    isMounted.current = true;
  }, []);

  const fetchQuizzes = () => {
    setLoading(true);
    axiosInstance
      .get("/quizzes/")
      .then((res) => {
        setQuizzes(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container mt={9}> 
          <Button w="100%" colorScheme="green" onClick={handleOpenModal}>Добавить тест</Button>
      <AddUpdateQuizModal isOpen={isModalOpen} onClose={handleCloseModal} onSuccess={fetchQuizzes}/>
      {loading ? (
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      ) : (
        <Box mt={6}>
          {quizzes?.map((quiz) => (
            <QuizCard quiz={quiz} key={quiz.id} />
          ))}
        </Box>
      )}
    </Container>
  );
};
