from typing import Optional

from pydantic.main import BaseModel

from .models import TaskModel


# Properties to receive via API on task creation
class TaskCreateModel(TaskModel):
    title: str
    description: str

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "title": "Task title",
                "description": "Task description",
            }
        }


# Properties to receive via API on task updation
class TaskUpdateModel(BaseModel):
    title: Optional[str]
    description: Optional[str]
