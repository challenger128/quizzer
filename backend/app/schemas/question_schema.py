from typing import List
from pydantic import BaseModel, Field


class QuizQuestion(BaseModel):
    question_text: str = Field(..., title="Question", min_length=1, max_length=255)
    options: List[str]
    correct_ans: int

class QuizQuestionOut(BaseModel):
    question_text: str
    options: List[str]