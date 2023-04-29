from typing import List, Optional
from datetime import datetime
from uuid import UUID, uuid4
from beanie import Document, Indexed, Link
from pydantic import Field
from app.schemas.question_schema import QuizQuestion
from app.models.user_model import User


class Quiz(Document):
    quiz_id: UUID = Field(default_factory=uuid4, unique=True)
    title: Indexed(str)
    description: Optional[str]
    questions: List[QuizQuestion]
    is_active: bool = True
    owner: Link[User]

    def __repr__(self) -> str:
        return f"Quiz {self.title}"
    
    def __str__(self) -> str:
        return self.title
    
    def __hash__(self) -> str:
        return hash(self.title)
    
    def __eq__(self, other: object) -> bool:
        if isinstance(other, Quiz):
            return self.quiz_id == other.quiz_id
        return False
       
class QuizResult(Document):
    quiz_id: Link[Quiz]
    username: str
    user_answers: List[int]
    correct_answers: List[int]
    score: Indexed(int)