# שלב 1: בניית האפליקציה
FROM node:18 AS build

# מיקום העבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי ה-dependencies
COPY package.json package-lock.json ./

# התקנת ה-dependencies
RUN npm install

# העתקת כל שאר הקבצים
COPY . .

# בניית האפליקציה
RUN npm run build

# שלב 2: הרצת האפליקציה עם Nginx
FROM nginx:alpine

# העתקת הקבצים מהשלב הראשון לתוך ה-Nginx
COPY --from=build /app/build /usr/share/nginx/html

# העתקת קובץ ההגדרות של ה-Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# חשיפת פורט 80
EXPOSE 80

# הרצת ה-Nginx
CMD ["nginx", "-g", "daemon off;"]
