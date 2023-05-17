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
  
  
  export const ResultDetail = () => {
    const [result, setResult] = useState({});
    const [quiz, setQuiz] = useState({});
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);
    const { resultId } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const background = useColorModeValue("gray.300", "gray.600");
    
  
    useEffect(() => {
      if (isMounted.current) return;
      fetchResult();
      isMounted.current = true;
    }, [resultId]);
  
    const fetchResult = async () => {
        setLoading(true);
        try {
          const resultResponse = await axiosInstance.get(`results/{result.id}?result_id=${resultId}`);
          const resultData = resultResponse.data;
          setResult(resultData);
          console.log(resultData);
      
          const quizResponse = await axiosInstance.get(`quizzes/{quiz.id}?quiz_id=${resultData.quiz_id}`);
          const quizData = quizResponse.data;
          setQuiz(quizData);
          console.log(quizData);
      
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

    const deleteResult = () => {
      setLoading(true);
      axiosInstance 
        .delete(`results/{result.id}?result_id=${resultId}`)
        .then(() => {
          toast({
            title: "Результат успешно удален",
            status: "success",
            isClosable: true,
            duration: 1500,
          });
          navigate(`/results/${result.quiz_id}`);
        })
        .catch((err) => {
            
          console.error(resultId)
          console.error(err);
          toast({
            title: "Невозможно удалить результат",
            status: "error",
            isClosable: true,
            duration: 2000,
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
            onClick={() => navigate(`/results/${result.quiz_id}`, { replace: true })}
          >
            ↩️ Назад
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
    {question.options.map((option, optionIndex) => {
      const isIncorrectAnswer =
        result.chosen_options[index] !== question.correct_ans &&
        result.chosen_options[index] === optionIndex;
      const isSelectedAnswer =
        result.chosen_options[index] >= 0 && result.chosen_options[index] === optionIndex;
      return (
        <Box
          key={optionIndex}
          p={2}
          bg={
            isIncorrectAnswer
              ? "red.200"
              : optionIndex === question.correct_ans
              ? "green.200"
              : "gray.400"
          }
          boxShadow={
            isSelectedAnswer && result.chosen_options[index] >= 0
              ? "0 0 0 2px rgb(16,52,166)"
              : "none"
          }
          borderRadius="md"
        >
          {option}
        </Box>
      );
    })}
  </VStack>
</AccordionPanel>



          </AccordionItem>
        ))}
      </Accordion>
          <Button
            isLoading={loading}
            colorScheme="red"
            width="100%"
            onClick={deleteResult}
            mt={3}
          >
          🗑️ Удалить 
          </Button>
        </Container>
      </>
    );
  };
  