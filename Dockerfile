# Use official Python 3.11 base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies needed to build Python packages
RUN apt-get update && \
    apt-get install -y build-essential gcc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency list first for caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port Gunicorn will run on
EXPOSE 8000

# Start the Gunicorn server
CMD ["gunicorn", "fashion-ecommerce.wsgi:application", "--bind", "0.0.0.0:8000"]
