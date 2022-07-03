.PHONY: setup bash bash-root

setup:
	docker-compose run --user=root:root --rm app chown -R 1000:1000 /home/server
	docker-compose run app npm install

bash:
	docker-compose run --rm app bash

bash-root:
	docker-compose run --user=root:root --rm app bash
