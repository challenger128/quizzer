from uuid import UUID
from typing import List
from fastapi import APIRouter, Depends
from app.api.deps.user_deps import get_current_user
from app.models.user_model import User
from app.models.quiz_model import QuizResult
from app.services.result_service import ResultService
from app.schemas.result_schema import ResultCreate, ResultOut

result_router = APIRouter()

@result_router.post('/', summary="Create result", response_model=ResultOut)
async def create_result(data: ResultCreate):
    return await ResultService.create_result(data)

@result_router.get('/{quiz.id}', summary="List results related to some quiz", response_model=List[QuizResult])
async def list(quiz_id: UUID, current_user: User = Depends(get_current_user)):
    return await ResultService.list_results(quiz_id, current_user)

@result_router.delete('/{result.id}', summary="Delete result by its id")
async def delete(result_id: UUID, current_user: User = Depends(get_current_user)):
    await ResultService.delete_result(result_id, current_user)
    return None