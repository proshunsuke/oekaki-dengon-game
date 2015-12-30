build:
	mix do deps.get, deps.compile
	npm install
	bower install --allow-root
	mix do compile.protocols
	yes | mix local.hex && yes | mix local.rebar && node_modules/.bin/brunch build && mix phoenix.digest