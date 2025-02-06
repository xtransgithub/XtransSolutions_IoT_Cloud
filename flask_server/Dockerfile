# Use the Python 3.8 slim base image
FROM python:3.8-slim

# Set environment variable to ensure Python output is sent straight to terminal (not buffered)
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /app

# Copy the application files from your local machine into the container
COPY . /app/

# Install dependencies inside the container
RUN python3 -m pip install --upgrade pip
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose the port that the Flask app will run on
EXPOSE 5000

# Set the default command to run the Flask application
CMD ["python", "app.py"]

