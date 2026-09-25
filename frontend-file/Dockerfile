#this file is created by dhanish pk 
#below explain what should be the base image for our customer image
FROM node:26.10 

WORKDIR /app


#this is the applicaion port
EXPOSE 3000

#this is copy configration file which is pipfile and pipfile.lock to the app destination which app folder applicaion folder
COPY package.json package-lock.json ./

#this install npm
RUN npm install --silent

COPY . ./




#this is how it run
CMD [ "npm","start" ]
#this is how t build the docker
#docker build . 
# docker build . -t image-gallery-api this is how name the mage
#docker run -p 3000:3000 image-frontend  
