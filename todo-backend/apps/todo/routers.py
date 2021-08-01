from typing import List

from fastapi import APIRouter, Body, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from .models import TaskModel
from .schemas import TaskCreateModel, TaskUpdateModel

router = APIRouter()


@router.post("/", response_description="Create a new task", response_model=TaskModel)
async def create_task(request: Request, task: TaskCreateModel = Body(...)):
    """This endpoint creates a new task in the database."""
    task = jsonable_encoder(task)
    new_task = await request.app.mongodb["tasks"].insert_one(task)
    created_task = await request.app.mongodb["tasks"].find_one(
        {"_id": new_task.inserted_id}
    )
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_task)


@router.get(
    "/", response_description="Get list of all tasks", response_model=List[TaskModel]
)
async def get_tasks(request: Request):
    """This endpoint gets the list of all the tasks from the database."""
    tasks = []
    for task in await request.app.mongodb["tasks"].find().to_list(length=100):
        tasks.append(task)
    return tasks


@router.get("/{id}", response_description="Get task by id", response_model=TaskModel)
async def get_task_by_id(id: str, request: Request):
    """This endpoint retrieves a task object from the database using task id."""
    if (task := await request.app.mongodb["tasks"].find_one({"_id": id})) is not None:
        return task

    raise HTTPException(status_code=404, detail=f"Task {id} not found")


@router.put("/{id}", response_description="Update a task", response_model=TaskModel)
async def update_task(id: str, request: Request, task: TaskUpdateModel = Body(...)):
    """This endpoint updates the existing task object with new data using it's id."""
    await request.app.mongodb["tasks"].update_one({"_id": id}, {"$set": task.dict()})

    if (
        updated_task := await request.app.mongodb["tasks"].find_one({"_id": id})
    ) is not None:
        return updated_task

    raise HTTPException(status_code=404, detail=f"Task {id} not found")


@router.delete("/{id}", response_description="Delete task by id")
async def delete_task_by_id(id: str, request: Request):
    """This endpoint deletes a task object from the database matching the id passed as parameter."""
    delete_result = await request.app.mongodb["tasks"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Task {id} not found")
