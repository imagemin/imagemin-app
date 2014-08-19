duo = ./node_modules/.bin/duo
myth = ./node_modules/.bin/myth

#
# Default task
#

default: build

#
# Tasks
#

app: node_modules
	@$(MAKE) build
	@atom .

#
# Targets
#

build: node_modules index.html
	@mkdir -p build
	@$(MAKE) build/index.js
	@$(MAKE) build/index.css

build/index.js: node_modules index.js
	@$(duo) index.js > build/index.js

build/index.css: node_modules index.css
	@$(duo) index.css | $(myth) > build/index.css

node_modules: package.json
	@npm install
	@touch node_modules

#
# Phony targets
#

.PHONY: app
