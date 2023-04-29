from uuid import UUID
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.schemas.question_schema import QuizQuestion, QuizQuestionOut


class QuizCreate(BaseModel):
    title: str = Field(..., title="Title", min_length=1, max_length=255)
    description: str = Field(..., title="Description", min_length=1, max_length=1023)
    questions: List[QuizQuestion] = Field(..., title="List of questions")
    is_active: bool

class QuizUpdate(BaseModel):
    title: Optional[str] = Field(..., title="Title", min_length=1, max_length=255)
    description: Optional[str] = None
    questions: Optional[List[QuizQuestion]] = None
    is_active: bool

class QuizOut(BaseModel):
    quiz_id: UUID
    title: str
    description: str
    questions: List[QuizQuestionOut]
    is_active: bool