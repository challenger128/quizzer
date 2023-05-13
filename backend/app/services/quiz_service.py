from uuid import UUID
from typing import List
from app.models.user_model import User
from app.models.quiz_model import Quiz
from app.schemas.quiz_schema import QuizCreateUpdate, QuizOut


class QuizService:
    @staticmethod
    async def list_quizzes(user: User) -> List[QuizOut]:
        quizzes = await Quiz.find(Quiz.owner.id == user.id).to_list()
        return quizzes
    
    @staticmethod
    async def create_quiz(data: QuizCreateUpdate, user: User) -> Quiz:
        quiz = Quiz(**data.dict(), owner=user)
        return await quiz.insert()
    
    @staticmethod
    async def retrieve_quiz(quiz_id: UUID, user: User = None):
        if user:
            return await Quiz.find_one(Quiz.quiz_id == quiz_id, Quiz.owner.id == user.id)
        return await Quiz.find_one(Quiz.quiz_id == quiz_id)

    @staticmethod
    async def update_quiz(quiz_id: UUID, data: QuizCreateUpdate, user: User):
        quiz = await QuizService.retrieve_quiz(quiz_id, user)
        if data.questions:
            quiz.questions = data.questions
        await quiz.update({"$set": data.dict(exclude_unset=True)})
        await quiz.save()
        return quiz
    
    @staticmethod
    async def delete_quiz(quiz_id: UUID, user: User):
        quiz = await QuizService.retrieve_quiz(quiz_id, user)
        if quiz:
            await quiz.delete()
        return None
