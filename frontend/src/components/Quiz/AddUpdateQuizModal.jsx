import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  VStack,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import axiosInstance from "../../services/axios";

const AddUpdateQuizModal = ({
  isOpen,
  onClose,
  quizToUpdate,
  quizId,
  onSuccess,
}) => {
  
    const [questions, setQuestions] = useState(
    quizToUpdate ? quizToUpdate.questions : [{ question_text: "", options: ["", "", "", ""], correct_ans: null }]
  );

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: quizToUpdate?.title || "",
      description: quizToUpdate?.description || "",
      is_active: quizToUpdate?.is_active || false,
    },
  });
  const toast = useToast();

  const onSubmit = async (data) => {
    const quizData = {
      title: data.title,
      description: data.description,
      is_active: data.is_active,
      questions,
    };
    try {
      if (quizToUpdate) {
        console.log(quizId)
        console.log(quizId)
        await axiosInstance.put(`quizzes/{quiz.id}?quiz_id=${quizId}`, quizData);
        toast({
          title: "Тест обновлен",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      } 
      else {
        
        await axiosInstance.post("quizzes/", quizData);
        toast({
          title: "Тест добавлен",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      }
      onSuccess();
      onClose();
    } catch (err) {
        toast({
            title: "Что-то пошло не так, попробуйте снова",
            status: "error",
            duration: 1500,
            isClosable: true,
        });
      console.log(err);
    }
    onClose();
  };

  const addQuestion = () => {
    setQuestions([...questions, { question_text: "", options: ["", "", "", ""], correct_ans: null }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnsChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correct_ans = value;
    setQuestions(newQuestions);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{quizToUpdate ? "Обновить тест" : "Добавить тест"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl mb={3}>
          <FormLabel>Название</FormLabel>
          <Input {...register("title", { required: true, minLength: 5, maxLength: 50 })} />
                { errors.title && (
                  <span style={{ color: "rgb(245, 101, 101)" }}>Название должно содержать от 1 до 255 символов</span>)}
        </FormControl>

        <FormControl mb={3}>
            <FormLabel>Описание</FormLabel>
                <Input {...register("description", { required: true, minLength: 5, maxLength: 50 })} />
                { errors.title && (
                  <span style={{ color: "rgb(245, 101, 101)" }}>Описание должно содержать от 1 до 1023 символов</span>)}
            </FormControl>
            <FormControl mb={3}>
                <FormLabel>Открыт</FormLabel>
                    <Checkbox {...register("is_active")} />
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel>Вопросы</FormLabel>
                        {questions.map((question, index) => (
                    <VStack key={index} mb={4}>
                        <HStack mb={2}>
                        <IconButton aria-label="Удалить вопрос" icon={<AiOutlineMinus />} size="sm" variant="outline" onClick={() => removeQuestion(index)}/>
                        <FormLabel>Вопрос {index + 1}</FormLabel> 
                        </HStack>
                    <FormControl>
                        <FormLabel>Текст вопроса</FormLabel>
                        <Input value={question.question_text} onChange={(e) => handleQuestionChange(index, "question_text", e.target.value)}/> 
                    </FormControl>
                    
                    {question.options.map((option, optionIndex) => (
    <FormControl key={optionIndex}>
        <FormLabel>Вариант {optionIndex + 1}</FormLabel>
        <Input
            value={option}
            onChange={(e) =>
                handleOptionChange(
                    index,
                    optionIndex,
                    e.target.value
                )
            }
        />
                <Button
                    variant={question.correct_ans === optionIndex ? "solid" : "outline"}
                    onClick={() => handleCorrectAnsChange(index, optionIndex)}
                    colorScheme={question.correct_ans === optionIndex ? "green" : "gray"}>
                        Правильный ответ
                    </Button>
                </FormControl>
                ))}

                                    
                    </VStack>))}
                        <Button onClick={addQuestion} mb={4}>
                        <AiOutlinePlus /> Добавить вопрос
                        </Button>
                        </FormControl>
                        </ModalBody>
                        <ModalFooter>
                        <Button onClick={handleSubmit(onSubmit)} mr={3}>
                        {quizToUpdate ? "Обновить" : "Добавить"}
                        </Button>
                            <Button onClick={onClose}>Назад</Button>
                        </ModalFooter>
            </ModalContent>
        </Modal>
);
};

export default AddUpdateQuizModal;