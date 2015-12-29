build:
	mix do deps.get, deps.compile
	npm install
	bower install --allow-root
	MIX_ENV=prod mix do compile.protocols
	yes | mix local.hex && yes | mix local.rebar && node_modules/.bin/brunch build && mix phoenix.digest