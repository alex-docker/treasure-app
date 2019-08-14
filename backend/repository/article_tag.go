package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
)

func CreateArticleTag(db *sqlx.Tx, articleID int64, tagID int64) (sql.Result, error) {
	stmt, err := db.Prepare(`
insert into article_tag(article_id, tag_id) values (?, ?)
`)
	if err != nil {
		return nil, err
	}
	return stmt.Exec(articleID, tagID)
}
