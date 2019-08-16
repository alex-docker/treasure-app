package controller

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/labstack/gommon/log"

	"github.com/jmoiron/sqlx"
	"github.com/ry-itto/treasure-app/todo_app/backend/models"
	"github.com/ry-itto/treasure-app/todo_app/backend/repository"
	"github.com/ry-itto/treasure-app/todo_app/backend/service"
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

func (t *Task) Create(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	form := models.TaskForm{}
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		log.Print(err.Error())
		return http.StatusBadRequest, nil, err
	}
	s := service.NewTaskService(t.db)
	if err := s.CreateTask(form); err != nil {
		return http.StatusBadRequest, nil, err
	}

	return http.StatusCreated, nil, nil
}

func (t *Task) Update(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)
	tmpID, ok := vars["id"]
	if !ok {
		return http.StatusBadRequest, nil, errors.New("please input ID to update")
	}
	id, err := strconv.Atoi(tmpID)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}
	form := models.TaskForm{}
	form.ID = id
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		log.Print(err.Error())
		return http.StatusBadRequest, nil, err
	}
	s := service.NewTaskService(t.db)
	err = s.UpdateTask(form)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}
	return http.StatusOK, nil, nil
}
