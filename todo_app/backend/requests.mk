export GO111MODULE := on

PORT := 1991
HOST := localhost

TASK_TITLE := 通勤
TASK_CONTENT := 毎日通勤

req-tasks:
	curl -v $(HOST):$(PORT)/tasks

req-tasks-post:
	curl -v -XPOST $(HOST):$(PORT)/tasks -d '{"title": "$(TASK_TITLE)", "content": "$(TASK_CONTENT)"}'


