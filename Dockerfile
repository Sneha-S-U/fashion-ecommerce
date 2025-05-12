# Step 1: Use an official Python image as the base image
FROM python:3.9-slim

# Step 2: Set environment variables
ENV PYTHONUNBUFFERED 1

# Check Python version
RUN python --version

# Step 3: Set the working directory inside the container
WORKDIR /app

# Step 4: Install dependencies (from requirements.txt)
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the project files into the container
COPY . /app/

# Step 6: Expose the port that Django will run on
EXPOSE 8000

# Step 7: Run migrations and start the Django server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
