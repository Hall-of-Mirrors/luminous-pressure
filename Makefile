.PHONY: clean env dev build help package package-lock deploy

service := luminous-pressure

pip := venv/bin/pip
aws := venv/bin/aws

code-directory := src
test-directory := tests
script-directory := scripts
syspython := python3
code-files := $(shell find $(code-directory) -name '*.py' -not \( -path '*__pycache__*' \))
test-files := $(shell find $(test-directory) -name '*.py' -not \( -path '*__pycache__*' \))
python-script-files := $(shell find $(script-directory) -name '*.py' -not \( -path '*__pycache__*' \))
gitish := $(shell git rev-parse --short HEAD)

region ?= us-west-2
deploy-role ?= admin

venv-activate := . ./venv/bin/activate
assume-role = $(venv-activate) && python ./scripts/aws_assume_role.py --role $(deploy-role) --mfa
sls-assume-role := export SLS_DEBUG=true && $(assume-role)

serverless-params = --service-name $(service) \
	--region $(region) \
	--gitish $(gitish) \
	--verbose

help:
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

clean: ## Clean build artifacts
	find $ . -name '__pycache__' -exec rm -Rf {} +
	find $ . -name '*.py[co]' -delete
	rm -rf build
	rm -rf dist
	rm -rf *.egg-info
	rm -rf *.egg
	rm -rf *.eggs
	rm -rf *.whl
	rm -rf .serverless
	rm -rf node_modules
	rm -rf venv
	rm -f .venv
	rm -f .dev
	rm -f .build
	rm -f .build-serverless
	rm -f .lint
	rm -f .test
	rm -f .code
	rm -rf .cache/
	rm -f .coverage
	rm -rf htmlcov/
	rm -f pytest-out.xml
	rm -f .env

venv:
	$(syspython) -m venv venv

.venv: venv
	venv/bin/pip install --progress-bar off --upgrade pip wheel setuptools
	touch .venv

.dev: .venv requirements_dev.txt
	$(pip) install --progress-bar off -r requirements_dev.txt
	touch .dev

.build: .dev requirements.txt
	$(pip) install --progress-bar off -r requirements.txt
	touch .build

.build-serverless: .build package-lock.json
	npm ci
	touch .build-serverless

.lint: .dev $(code-files) $(test-files)
	venv/bin/black --line-length=101 --safe -v $(code-files) $(test-files) $(python-script-files)
	venv/bin/flake8 --max-line-length=101 $(code-files) $(test-files) $(python-script-files)
	touch .lint

dev: .dev ## Setup the local dev environment

build: .build ## Build into local environment

package-lock: ## Update package-lock.json, Required when adding or changing package.json dependencies.
	rm -rf node_modules
	npm install
	npm audit fix

lint: .lint ## Run flake8 and black linting

package: .build-serverless ## Serverless package
	$(sls-assume-role) \
		$$(npm bin)/serverless package $(serverless-params)

deploy: .build-serverless ## Deploy
	$(sls-assume-role) \
		$$(npm bin)/serverless deploy $(serverless-params)
