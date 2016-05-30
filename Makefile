# Project variables
PROJECT_NAME ?= hapi-api

# Filenames
DEV_COMPOSE_FILE := docker/dev/docker-compose.yml

.PHONY: test clean

test:
	${INFO} "Building images..."
	@ docker-compose -p $(PROJECT_NAME) -f $(DEV_COMPOSE_FILE) build test
	${INFO} "Create cache volume if not exists..."
	@ docker volume create --name cache
	${INFO} "Running tests..."
	@ docker-compose -p $(PROJECT_NAME) -f $(DEV_COMPOSE_FILE) run --rm test
	${INFO} "Testing complete"
clean:
	${INFO} "Destroying development environment..."
	@ docker-compose -p $(PROJECT_NAME) -f $(DEV_COMPOSE_FILE) kill
	@ docker-compose -p $(PROJECT_NAME) -f $(DEV_COMPOSE_FILE) rm -a -f -v
	${INFO} "Remove cache volume..."
	@ docker volume rm cache
	${INFO} "Clean complete"


# Cosmetics
YELLOW := "\e[1;33m"
NC := "\e[0m"

# Shell Functions
INFO := @bash -c '\
  printf $(YELLOW); \
  echo "=> $$1"; \
  printf $(NC)' SOME_VALUE
