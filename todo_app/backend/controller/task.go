package controller

import (
	"net/http"

	"github.com/jmoiron/sqlx"
)

type Task struct {
	db *sqlx.DB
}

func NewTaskController(db *sqlx.DB) *Task {
	return &Task{db: db}
}

func (t *Task) Index(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	return http.StatusNotImplemented, nil, nil
}
