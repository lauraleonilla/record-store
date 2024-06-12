FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_API_URL=http://localhost:8080

RUN npm run build

RUN npm install -g serve

EXPOSE 5001

CMD ["serve", "-s", "-l", "5001", "build"]