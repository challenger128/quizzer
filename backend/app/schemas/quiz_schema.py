from uuid import UUID
from typing import List, Optional
from pydantic import BaseModel, Field, root_validator
from app.schemas.question_schema import QuizQuestion, QuizQuestionOut


#TODO: add duration
class QuizCreateUpdate(BaseModel):
    title: str = Field(..., title="Title", min_length=1, max_length=255)
    description: str = Field(..., title="Description", min_length=1, max_length=1023)
    questions: List[QuizQuestion] = Field(..., title="List of questions", min_items=1)
    is_active: bool
    

class QuizOut(BaseModel):
    quiz_id: UUID
    title: str
    description: str
    questions: List[QuizQuestionOut]
    is_active: bool