import {
    Accordion,
    Button,
    Center,
    Container,
    Spinner,
    Text,
    useColorModeValue,
    useToast,
    AccordionItem,
    Box,
    VStack,
    AccordionPanel,
    AccordionButton,
  } from "@chakra-ui/react";
  import { useEffect, useRef, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import axiosInstance from "../../services/axios";
  import AddUpdateQuizModal from "./AddUpdateQuizModal"
  
  export const QuizDetail = () => {
    const [quiz, setQuiz] = useState({});
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const { quizId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const background = useColorModeValue("gray.300", "gray.600");
  
    
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

    useEffect(() => {
      if (isMounted.current) return;
      fetchQuiz();
      isMounted.current = true;
    }, [quizId]);
  
    const fetchQuiz = () => {
      setLoading(true);
      axiosInstance
        .get(`quizzes/{quiz.id}?quiz_id=${quizId}`)
        .then((res) => {
          setQuiz(res.data);
            console.log(res.data);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    };
  
    const deleteQuiz = () => {
      setLoading(true);
      axiosInstance 
        .delete(`quizzes/{quiz.id}?quiz_id=${quizId}`)
        .then(() => {
          toast({
            title: "Тест успешно удален",
            status: "success",
            isClosable: true,
            diration: 1500,
          });
          navigate("/");
        })
        .catch((err) => {
            
          console.error(quizId)
          console.error(err);
          toast({
            title: "Невозможно удалить тест",
            status: "error",
            isClosable: true,
            diration: 2000,
          });
        })
        .finally(() => setLoading(false));
    };
  
    if (loading) {
      return (
        <Container mt={6}>
          <Center mt={6}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="green.200"
              color="green.500"
              size="xl"
            />
          </Center>
        </Container>
      );
    }
  
    return (
      <>
        <Container mt={6}>
          <Button
            colorScheme="gray"
            onClick={() => navigate("/", { replace: true })}
          >
            Назад
          </Button>
        </Container>
        <Container
          bg={background}
          minHeight="7rem"
          my={3}
          p={3}
          rounded="lg"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize={22}>{quiz.title}</Text>
          <Text bg="gray.400" mt={2} p={2} rounded="lg">
            {quiz.description}
          </Text>

          <Accordion mt={3} defaultIndex={0}>
        {quiz.questions.map((question, index) => (

          <AccordionItem key={index} mt={2}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {question.question_text}
              </Box>
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack alignItems="stretch">
                {question.options.map((option, optionIndex) => (
                  <Box key={optionIndex} p={2} bg={optionIndex === question.correct_ans ? "green.200" : "gray.400"}>
                    {option}
                  </Box>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
          
          
      <Button w="100%" colorScheme="purple" onClick={handleOpenModal} mt={3}>Обновить тест</Button>
      <AddUpdateQuizModal isOpen={isModalOpen} onClose={handleCloseModal} quizToUpdate={quiz} quizId={quizId} onSuccess={fetchQuiz}/>
          <Button
            isLoading={loading}
            colorScheme="red"
            width="100%"
            onClick={deleteQuiz}
            mt={3}
          >
            Удалить
          </Button>
        </Container>
      </>
    );
  };
  