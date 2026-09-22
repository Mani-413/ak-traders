FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Install Python dependencies first (cached layer)
COPY backend/requirements.txt ./backend/requirements.txt
RUN python -m pip install --upgrade pip && \
    python -m pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend ./backend

# Copy frontend assets (HTML, CSS, JS, assets — all at project root)
COPY *.html ./
COPY css ./css
COPY js ./js
COPY assets ./assets
COPY soap ./soap
COPY soapp ./soapp
COPY soup ./soup

# Default env vars (overridden by Render dashboard)
ENV DATABASE_URL=sqlite:///./ak_traders.db
ENV STATIC_ROOT=/app
ENV PORT=8000

EXPOSE ${PORT}
WORKDIR /app/backend

# Use shell form so $PORT is expanded at runtime
CMD python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT
