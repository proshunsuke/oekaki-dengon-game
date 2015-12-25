build:
	mix do deps.get, deps.compile
	npm install
	bower install --allow-root
	yes | mix local.hex && yes | mix local.rebar && mix do deps.get && node_modules/.bin/brunch build && mix phoenix.digest && MIX_ENV=prod mix release
