# Makefile specification
# ----------------------

GithubID = kattawar
RepoName = canitstreamtome
SHA = 

githubid:
	@echo "${GithubID}"
reponame:
	@echo "${RepoName}"
sha:
	@echo "${SHA}"

# The Makefile should be present in the root of the project.
# There should be the following commands written:
.PHONY: backend frontend

# make github   - prints link to github repo
github:
	@echo "http://www.github.com/${GithubID}/${RepoName}"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "http://www.github.com/${GithubID}/${RepoName}/projects/1"

# make uml      - prints link to uml diagram
uml:
	@echo "https://kevinsalcedo.gitbooks.io/report/content/uml-diagrams.html"

# make selenium - runs selenium tests
selenium:
	pip install selenium;
	python3 frontend/guitests.py

# make frontend - runs frontend tests
frontend:
	@(cd frontend; npm test)

# make backend  - runs backend tests
backend:
	pip install psycopg2;
	pip install flask;
	python backend/tests.py;

# make website  - prints link to a website
website:
	@echo "http://www.canitstreamto.me/"

# make report   - prints link to technical report
report:
	@echo "https://kevinsalcedo.gitbooks.io/report/content/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://kevinsalcedo.gitbooks.io/api/content/"

# make self     - prints link to self critique
self:
	@echo "https://kevinsalcedo.gitbooks.io/report/content/2nd-review-critiques.html"

# make other    - prints link to other critique
other:
	@echo "https://kevinsalcedo.gitbooks.io/report/content/2nd-review-critiques.html"
