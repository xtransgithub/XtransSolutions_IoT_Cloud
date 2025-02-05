FROM python:3.9-slim-buster

WORKDIR /flask_server
COPY ./python-backend/requirements.txt /flask_server
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]