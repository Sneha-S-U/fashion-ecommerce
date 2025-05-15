FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

WORKDIR /app

COPY requirements.txt .
 
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN pip install python-decouple

CMD ["gunicorn", "fashion_project.wsgi:application", "--bind", "0.0.0.0:8000"]
