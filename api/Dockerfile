#this file is created by dhanish pk 
#below explain what should be the base image for our customer image
FROM python:3.14 

#app dir name
WORKDIR /app

#this is the applicaion port
EXPOSE 5050

#this is copy configration file which is pipfile and pipfile.lock to the app destination which app folder applicaion folder
COPY Pipfile Pipfile.lock ./

#this install pipenv
RUN pip install pipenv
#this create a text file with all dependacy the file name is requrments.txt
RUN pipenv requirements > requirements.txt
#then install the dependacy
RUN pip install -r requirements.txt
#copy all sorce code to the app directory
COPY . ./
#this is how it run
CMD [ "python","main.py" ]
#this is how t build the docker
#docker run -p 5050:5050 image-api 
#docker build . 
# docker build . -t image-gallery-api this is how name the mage
