# Use the Python 3.9 slim base image
FROM python:3.10-slim

# Set environment variable to ensure Python output is sent straight to terminal (not buffered)
ENV PYTHONUNBUFFERED 1

# Disable pip progress bar and caching
ENV PIP_NO_PROGRESS_BAR=off
ENV PIP_DISABLE_PIP_VERSION_CHECK=on
ENV PIP_NO_CACHE_DIR=off

# Set the working directory inside the container
WORKDIR /app

# Copy the application files from your local machine into the container
COPY . /app/

# Install pip manually first (no threads)
# RUN python3 -m pip install --no-cache-dir --upgrade pip
RUN python -m pip install pip==23.0.1
RUN python -m pip install --no-cache-dir --upgrade pip


# Install dependencies inside the container
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that the Flask app will run on
EXPOSE 5001

# Set the default command to run the Flask application
CMD ["python", "app.py"]

