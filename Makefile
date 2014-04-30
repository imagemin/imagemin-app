COMPONENT = ./node_modules/.bin/component
WEBKIT = ./node_modules/.bin/nodewebkit
SRC = $(wildcard lib/*/*.js)
APP = /tmp/imagemin.nw

run: build
	@rm -rf $(APP)
	zip -rq $(APP) *
	$(WEBKIT) $(APP)

build: node_modules components $(SRC)
	@$(COMPONENT) build --standalone imagemin

components:
	@$(COMPONENT) install

node_modules: package.json
	@npm install
	mv ./node_modules/nodewebkit/package.json ./node_modules/nodewebkit/_package.json

clean_build:
	rm -rf build

clean_component: clean_build
	rm -rf components

.PHONY: clean_build clean_component run
