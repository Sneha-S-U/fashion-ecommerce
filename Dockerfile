FROM python:3.9-slim


# Install build dependencies
RUN apt-get update && apt-get install -y gcc libffi-dev libpq-dev python3-dev


# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install  -r requirements.txt

# Copy the rest of the application code
COPY . .


# Run Gunicorn
CMD ["gunicorn", "fashion-ecommerce.wsgi:application", "--bind", "0.0.0.0:8000"]
