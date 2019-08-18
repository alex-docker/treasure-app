package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/ry-itto/treasure-app/todo_app/backend/models"
)

func FindAllTasks(db *sqlx.DB) ([]models.Task, error) {
	result := make([]models.Task, 0)
	if err := db.Select(&result, "select * from task "); err != nil {
		return nil, err
	}
	return result, nil
}

func CreateTask(db *sqlx.Tx, task models.TaskForm) (sql.Result, error) {
	stmt, err := db.Prepare(`insert into task(title, content, due_date) values (?, ?, ?)`)
	if err != nil {
		return nil, err
	}
	return stmt.Exec(task.Title, task.Content, task.DueDate)
}

func UpdateTask(db *sqlx.Tx, task models.TaskForm) (sql.Result, error) {
	stmt, err := db.Prepare(`update task set title = ?, content = ? ,due_date  = ? where id = ?`)
	if err != nil {
		return nil, err
	}
	return stmt.Exec(task.Title, task.Content, task.DueDate, task.ID)
}

func DeleteTask(db *sqlx.Tx, id int) (sql.Result, error) {
	stmt, err := db.Prepare(`delete from task where id = ?`)
	if err != nil {
		return nil, err
	}
	return stmt.Exec(id)
}
