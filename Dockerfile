FROM node:10

COPY . .

EXPOSE 3000 35432

CMD ["/bin/sh", "start.sh"]
