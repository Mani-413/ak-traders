"""Application configuration, loaded from environment variables / .env."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AK Traders API"

    database_url: str = "sqlite:///./ak_traders.db"

    jwt_secret_key: str = "change-this-to-a-long-random-secret"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 120

    default_admin_username: str = "admin"
    default_admin_password: str = "admin123"

    cors_origins: str = "http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000"

    upload_dir: str = "app/static/uploads"
    max_upload_mb: int = 5

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
