FROM python:3.11

WORKDIR /app

COPY requirements.txt .

# Install system packages needed to build some Python packages
RUN apt-get update && apt-get install -y build-essential gcc

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "fashion-ecommerce.wsgi:application", "--bind", "0.0.0.0:8000"]
