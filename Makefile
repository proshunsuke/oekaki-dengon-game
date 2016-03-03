build:
	mix do deps.get, deps.compile
	npm install
	bower install --allow-root
	mix do compile.protocols
	yes | mix local.hex && yes | mix local.rebar && mix phoenix.digest && mix ecto.migrate