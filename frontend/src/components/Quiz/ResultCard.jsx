import { Badge, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const ResultCard = ({ result }) => {
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
      onClick={() => navigate(`/result_details/${result.result_id}`, { replace: true })}
    >
      <Text>{result.name}</Text>
      <Badge colorScheme={Math.round(result.score * 100) > 40 ? "green" : "red"}>
        {Math.round(result.score * 100)}%
      </Badge>
    </Flex>
  );
};
