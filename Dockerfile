FROM mhart/alpine-node:7

COPY package.json /package.json
RUN set -uex; \
    npm install; \
    echo 'test1' > /file

COPY read.js /read.js
COPY read_write.js /read_write.js

CMD ["node","read.js"]
#CMD ["node","read_write.js"]
