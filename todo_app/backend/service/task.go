package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/labstack/gommon/log"
	"github.com/pkg/errors"
	"github.com/ry-itto/treasure-app/todo_app/backend/repository"
)

type Task struct {
	db *sqlx.DB
}

func NewTaskService(db *sqlx.DB) *Task {
	return &Task{db: db}
}

func (t *Task) CreateTask(form models.TaskForm) error {
	tx, err := t.db.Beginx()
	defer func() {
		if err := recover(); err != nil {
			tx.Rollback()
			log.Print("rollback.")
			return err
		}
	}()
	if err != nil {
		panic(errors.Wrap(err, "start transaction failed"))
	}
	_, err = repository.CreateTask(t.db, form)
	if err != nil {
		panic(errors.Wrap(err, "insert transaction failed"))
	}
	if err := tx.Commit(); err != nil {
		panic(errors.Wrap(err, "insert transaction failed"))
	}
	return nil
}
