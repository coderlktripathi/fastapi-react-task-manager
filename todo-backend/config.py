from pydantic import BaseSettings


class CommonBaseSettings(BaseSettings):
    class Config:
        env_file = '.env'

class CommonSettings(CommonBaseSettings):
    APP_NAME: str = "Task Manager"
    DEBUG_MODE: bool = False


class ServerSettings(CommonBaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000


class DatabaseSettings(CommonBaseSettings):
    DB_URL: str = "mongodb://localhost:27017"
    DB_NAME: str = "task-manager"


class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    pass


settings = Settings()
