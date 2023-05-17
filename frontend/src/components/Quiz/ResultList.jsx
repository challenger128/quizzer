import { Box, Button, Center, Container, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import { ResultCard } from "./ResultCard";
import { useNavigate, useParams } from "react-router-dom";

export const ResultList = () => {
  const {quizId} = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchResults();
    isMounted.current = true;
  }, []);

  const fetchResults = () => {
    setLoading(true);
    axiosInstance
      .get(`results/{quiz.id}?quiz_id=${quizId}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container mt={9}> 
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
        <Button
            colorScheme="gray"
            onClick={() => navigate(`/${quizId}`, { replace: true })}
          >
            ↩️ Назад
          </Button>
          {results?.map((result) => (
            <ResultCard result={result} key={result.id} />
          ))}
        </Box>
      )}
    </Container>
  );
};
