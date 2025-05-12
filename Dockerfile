# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Run Gunicorn (replace 'your_project_name' with your actual project name)
CMD ["gunicorn", "fashion-ecommerce.wsgi:application", "--bind", "0.0.0.0:8000"]

