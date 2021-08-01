from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()


# database connection
DB_URL = 'mongodb://localhost:27017'
DB_NAME = 'task-manager'

@app.on_event("startup")
async def start_db_client():
    app.mongodb_client = AsyncIOMotorClient(DB_URL)
    app.mongodb = app.mongodb_client[DB_NAME]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


@app.get("/")
async def main():
    import pdb; pdb.set_trace()
    return {"Hello": "World"}

