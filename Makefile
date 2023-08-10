install:
	npm ci

publish:
	npm publish --dry-run	

page-loader:
	node bin/page-loader.js

test:
	npm test --test-reporter=spec

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .