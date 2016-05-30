FROM node:6.2.0

# Create app directory
RUN mkdir -p /application
WORKDIR /application

# Add test entrypoint script
COPY scripts/test.sh /usr/local/bin/test.sh
RUN chmod +x /usr/local/bin/test.sh

COPY scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Set defaults for entrypoint and command string
ENTRYPOINT ["test.sh"]
CMD [ "npm", "test" ]

# Bundle app source
COPY *.json /application/
COPY api /application/api
COPY test /application/test
COPY migrations /application/migrations
COPY *.js /application/
