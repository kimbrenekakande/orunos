# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_UPGRADE=1

# Install nodejs and npm
RUN apt-get update && apt-get install -y nodejs npm

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app/

# Install tailwind
RUN python manage.py tailwind install

# Expose port for the app to run on
EXPOSE 8000


