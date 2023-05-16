import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Center,
  VStack,
  Flex,
  Spinner,
  Text
} from "@chakra-ui/react";
import axiosInstance from "../../services/axios";
import { useParams } from "react-router-dom";

const QuizForm = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    chosen_options: [],
    quiz_id: quizId,
  });
  const toast = useToast();

  const Loading = () => (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="green.200"
        color="green.500"
        size="xl"
      />
    </Flex>
  );

  const storredId = localStorage.getItem(quizId);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axiosInstance.get(
          `quizzes/external/{quiz.id}?quiz_id=${quizId}`
        );
        setQuizData(response.data);
      } catch (error) {
        console.error(error);
        setHasError(true);
      }
    };
    
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (quizData) {
      const initialOptions = Array(quizData.questions.length).fill(-1);
      setFormData((prevData) => ({
        ...prevData,
        chosen_options: initialOptions,
      }));
    }
  }, [quizData]);

  if (hasError){
    return (
      <Center height="100vh">
        <Text fontSize="xl" fontWeight="bold">
          Упс, данного теста не существует 💔
        </Text>
      </Center>
    );    
  }

  const handleNameChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };

  const handleOptionClick = (questionIndex, optionIndex) => {
    setFormData((prevData) => {
      const chosenOptions = [...prevData.chosen_options];
      chosenOptions[questionIndex] = optionIndex;
      return {
        ...prevData,
        chosen_options: chosenOptions,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      if (formData.name.length < 4 || formData.name.length > 100){
        throw new Error("Имя должно содержать от 4 до 100 символов");
    }
    const response = await axiosInstance.post("results/", formData);
    localStorage.setItem(quizId, response.data.score);
    console.log(response);
    console.log(formData);    
  window.location.reload();
    } catch(err){
      toast({
        title: err.message,
        status: "error",
        duration: 1500,
        isClosable: true,
    });
      console.log(err);
    }
  };

  if (quizData == null){
      return <Loading />;
  }

  if (storredId){
    return (
      <Center height="100vh">
        <Text fontSize="xl" fontWeight="bold">
          Вы прошли данный тест 🔒
          Ваш балл {Math.round(storredId * 100)}% 🎉
        </Text>
      </Center>
    );
  }

  if (!quizData.is_active){
    return (
      <Center height="100vh">
        <Text fontSize="xl" fontWeight="bold">
          Тест недоступен ⛔️
        </Text>
      </Center>
    );
  }

  const { questions } = quizData;

  return (
    <Center>
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Имя</FormLabel>
          <Input value={formData.name} onChange={handleNameChange} />
        </FormControl>
        {questions.map((question, questionIndex) => (
          <FormControl key={questionIndex} mb={4}>
            <FormLabel>{question.question_text}</FormLabel>
            <VStack spacing={4} align="start">
            {question.options.map((option, optionIndex) => (
              <Button
                key={optionIndex}
                onClick={() => handleOptionClick(questionIndex, optionIndex)}
                variant={
                  formData.chosen_options[questionIndex] === optionIndex
                    ? "solid"
                    : "outline"
                }
                colorScheme={
                  formData.chosen_options[questionIndex] === optionIndex
                    ? "blue"
                    : "gray"
                }
                mr={2}
              >
                {option}
              </Button>
            ))}
            </VStack>
          </FormControl>
        ))}
        <Button type="submit" colorScheme="blue">
          Отправить
        </Button>
      </form>
    </Box>
    </Center>
  );
};

export default QuizForm;
