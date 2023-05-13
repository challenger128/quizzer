from uuid import UUID
from typing import List
from fastapi import APIRouter, Depends
from app.schemas.quiz_schema import QuizCreateUpdate, QuizOut
from app.models.user_model import User
from app.api.deps.user_deps import get_current_user
from app.services.quiz_service import QuizService
from app.models.quiz_model import Quiz


quiz_router = APIRouter()

@quiz_router.get('/', summary="Get all quizzes of the user", response_model=List[QuizOut])
async def list(current_user: User = Depends(get_current_user)):
    return await QuizService.list_quizzes(current_user)

@quiz_router.post('/', summary="Create quiz", response_model=Quiz)
async def create_quiz(data: QuizCreateUpdate, current_user: User = Depends(get_current_user)):
    return await QuizService.create_quiz(data, current_user)

@quiz_router.get('/{quiz.id}', summary="Get a quiz by quiz_id", response_model=Quiz)
async def retrieve(quiz_id: UUID, current_user: User = Depends(get_current_user)):
    return await QuizService.retrieve_quiz(quiz_id, current_user)

@quiz_router.put('/{quiz.id}', summary="Update quiz by quiz_id", response_model=QuizOut)
async def update(quiz_id: UUID, data: QuizCreateUpdate, current_user: User = Depends(get_current_user)):
    return await QuizService.update_quiz(quiz_id, data, current_user)

@quiz_router.delete('/{quiz.id}', summary="Delete quiz")
async def delete(quiz_id: UUID, current_user: User = Depends(get_current_user)):
    await QuizService.delete_quiz(quiz_id, current_user)
    return None