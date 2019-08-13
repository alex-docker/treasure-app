package repository

import (
	"database/sql"

	"github.com/voyagegroup/treasure-app/model"

	"github.com/jmoiron/sqlx"
)

func CreateComment(db *sqlx.Tx, c *model.Comment) (sql.Result, error) {
	stmt, err := db.Prepare(`
insert into comment(user_id, article_id, body) values (?, ?, ?)
`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(c.UserID, c.ArticleID, c.Body)
}

func UpdateComment(db *sqlx.Tx, c *model.Comment) (sql.Result, error) {
	stmt, err := db.Prepare(`
update comment set body = ? where id = ?
`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(c.Body, c.ID)
}

func FindComment(db *sqlx.DB, id int64) (*model.Comment, error) {
	c := model.Comment{}
	if err := db.Get(&c, `
select id, user_id, article_id, body
from comment
where id = ?
`, id); err != nil {
		return nil, err
	}
	return &c, nil
}

func FindCommentByArticleID(db *sqlx.DB, articleID int64) ([]model.Comment, error) {
	c := make([]model.Comment, 0)
	if err := db.Select(&c,
		`select id, user_id, article_id, body 
from comment 
where article_id = ?`, articleID); err != nil {
		return nil, err
	}
	return c, nil
}
