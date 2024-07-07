FROM node:lts-alpine
# ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json",  "./"]
RUN npm install 
COPY . .
EXPOSE 3006
# RUN chown -R node /usr/src/app          "package-lock.json*", "npm-shrinkwrap.json*",
USER node
CMD ["node", "app.js"]
