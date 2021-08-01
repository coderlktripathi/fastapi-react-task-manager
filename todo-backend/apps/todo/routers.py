from fastapi import APIRouter, Body, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from .models import TaskModel

router = APIRouter()


@router.post("/", response_description="Create new task")
async def create_task(request: Request, task: TaskModel = Body(...)):
    # import pdb; pdb.set_trace()
    new_task = await request.app.mongodb["tasks"].insert_one(task.dict())
    created_task = await request.app.mongodb["tasks"].find_one(
        {"_id": new_task.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_task)


@router.get("/", response_description="Get list of all tasks")
async def get_tasks(request: Request):
    tasks = []
    for task in await request.app.mongodb["tasks"].find().to_list(length=100):
        tasks.append(TaskModel(**task))
    return tasks


@router.get("/{id}", response_description="Get task by id")
async def get_task_by_id(id: str, request: Request):
    if (task := await request.app.mongodb["tasks"].find_one({"_id": id})) is not None:
        return task

    raise HTTPException(status_code=404, detail=f"Task {id} not found")


@router.put("/{id}", response_description="Update a task")
async def update_task(id: str, request: Request, task = Body(...)):
    
    update_result = await request.app.mongodb["tasks"].update_one(
        {"_id": id}, {"$set": task}
    )

    if update_result.modified_count == 1:
        if (
            updated_task := await request.app.mongodb["tasks"].find_one({"_id": id})
        ) is not None:
            return updated_task

    if (
        existing_task := await request.app.mongodb["tasks"].find_one({"_id": id})
    ) is not None:
        return existing_task

    raise HTTPException(status_code=404, detail=f"Task {id} not found")


@router.delete("/{id}", response_description="Delete Task")
async def delete_task(id: str, request: Request):
    delete_result = await request.app.mongodb["tasks"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Task {id} not found")
