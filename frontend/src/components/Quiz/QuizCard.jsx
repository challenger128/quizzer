import { Badge, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();
  return (
    <Flex
      bg={useColorModeValue("gray.300", "gray.600")}
      minHeight="3rem"
      my={3}
      p={3}
      rounded="lg"
      alignItems="center"
      justifyContent="space-between"
      _hover={{
        opacity: 0.9,
        cursor: "pointer",
        transform: "translateY(-3px)",
      }}
      onClick={() => navigate(`/${quiz.quiz_id}`, { replace: true })}
    >
      <Text>{quiz.title}</Text>
      <Badge colorScheme={quiz.is_active ? "green" : "red"}>
        {quiz.is_active ? "Тест доступен" : "Тест закрыт"}
      </Badge>
    </Flex>
  );
};
