from uuid import UUID
from typing import List
from app.models.quiz_model import QuizResult
from app.models.user_model import User
from app.schemas.result_schema import ResultCreate
from app.services.quiz_service import QuizService

from fastapi import HTTPException, status

class ResultService:
    @staticmethod
    async def create_result(data: ResultCreate) -> QuizResult:
        quiz = await QuizService.retrieve_quiz(data.quiz_id)
        if not quiz:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect id of quiz"
                )
        correct = 0
        if len(quiz.questions) != len(data.chosen_options):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Options list has incorrect length"
            )
        for idx, question in enumerate(quiz.questions):
            if question.correct_ans == data.chosen_options[idx]:
                correct += 1
        result = QuizResult(**data.dict(), score=correct/len(data.chosen_options), quiz_owner=quiz.owner)
        return await result.insert()
    
    @staticmethod
    async def list_results(quiz_id: UUID, user: User) -> List[QuizResult]:
        return await QuizResult.find(QuizResult.quiz_id == quiz_id, 
                                     QuizResult.quiz_owner.id == user.id).to_list()
    
    @staticmethod
    async def retrieve_result(result_id: UUID, user: User) -> QuizResult:
        return await QuizResult.find_one(QuizResult.result_id == result_id,
                                         QuizResult.quiz_owner.id == user.id)
    
    @staticmethod
    async def delete_result(result_id: UUID, user: User):
        result = await ResultService.retrieve_result(result_id, user)
        if result:
            await result.delete()
        return None
        