from fastapi import APIRouter
from app.api.api_v1.handlers import user
from app.api.api_v1.handlers import quiz
from app.api.api_v1.handlers import result
from app.api.auth.jwt import auth_router

router = APIRouter()

router.include_router(user.user_router, prefix='/users', tags=["users"])
router.include_router(auth_router, prefix='/auth', tags=["auth"])
router.include_router(quiz.quiz_router, prefix='/quizzes', tags=["quizzes"])
router.include_router(result.result_router, prefix='/results', tags=["results"])
