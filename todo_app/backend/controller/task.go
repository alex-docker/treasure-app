package controller

import (
	"net/http"

	"github.com/jmoiron/sqlx"
	"github.com/ry-itto/treasure-app/todo_app/backend/repository"
)

type Task struct {
	db *sqlx.DB
}

func NewTaskController(db *sqlx.DB) *Task {
	return &Task{db: db}
}

func (t *Task) Index(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	tasks, err := repository.FindAllTasks(t.db)
	return http.StatusOK, tasks, err
}
