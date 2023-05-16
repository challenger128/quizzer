from typing import List
from uuid import UUID
from pydantic import BaseModel, Field


class ResultCreate(BaseModel):
    quiz_id: UUID
    name: str = Field(..., title="Name", min_length=4, max_length=100)
    chosen_options: List[int] = Field(..., tittle="Options have chosen by user", min_items=1)