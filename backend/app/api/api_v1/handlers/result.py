from fastapi import APIRouter
from app.services.result_service import ResultService
from app.schemas.result_schema import ResultCreate

result_router = APIRouter()

@result_router.post('/', summary="Create result")
async def create_result(data: ResultCreate):
    return await ResultService.create_result(data)