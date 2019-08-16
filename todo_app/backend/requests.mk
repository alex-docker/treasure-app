export GO111MODULE := on

PORT := 1991
HOST := localhost

TASK_ID := 1
TASK_TITLE := 通勤
TASK_CONTENT := 毎日通勤
UPDATE_TASK_TITLE := 会食
UPDATE_TASK_TASK_CONTENT := お偉い人との会食予定

req-tasks:
	curl -v $(HOST):$(PORT)/tasks

req-tasks-post:
	curl -v -XPOST $(HOST):$(PORT)/tasks -d '{"title": "$(TASK_TITLE)", "content": "$(TASK_CONTENT)"}'

req-tasks-update:
	curl -v -XPUT $(HOST):$(PORT)/tasks/$(TASK_ID) -d '{"title": "$(UPDATE_TASK_TITLE)", "content": "$(UPDATE_TASK_TASK_CONTENT)"}'

req-tasks-delete:
	curl -v -XDELETE $(HOST):$(PORT)/tasks/$(TASK_ID)
