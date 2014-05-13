COMPONENT = ./node_modules/.bin/component
WEBKIT = ./node_modules/.bin/nodewebkit
SRC = $(wildcard lib/*/*.js)
APP = ./release/imagemin-app.nw

release: build
	@rm -rf $(APP)
	mkdir ./release
	zip -rq $(APP) *

run: build
	$(WEBKIT) ./

build: node_modules components $(SRC)
	@$(COMPONENT) build --standalone imagemin

components:
	@$(COMPONENT) install

node_modules: package.json
	@npm install

clean_build:
	rm -rf build

clean_component: clean_build
	rm -rf components

.PHONY: clean_build clean_component run
