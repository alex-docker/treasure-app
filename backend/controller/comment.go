package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/voyagegroup/treasure-app/service"

	"github.com/voyagegroup/treasure-app/model"

	"github.com/voyagegroup/treasure-app/repository"

	"github.com/voyagegroup/treasure-app/httputil"

	"github.com/jmoiron/sqlx"
)

type Comment struct {
	dbx *sqlx.DB
}

func NewComment(dbx *sqlx.DB) *Comment {
	return &Comment{dbx: dbx}
}

func (c *Comment) CreateComment(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)
	tmpArticleID, ok := vars["id"]
	if !ok {
		return http.StatusBadRequest, nil, &httputil.HTTPError{Message: "invalid path parameter"}
	}
	newComment := &model.Comment{}
	articleID, err := strconv.Atoi(tmpArticleID)
	if err != nil {
		return http.StatusBadRequest, nil, &httputil.HTTPError{Message: "invalid path parameter"}
	}
	newComment.ArticleID = int64(articleID)
	context, err := httputil.GetUserFromContext(r.Context())
	if err != nil {
		log.Print(err)
		return http.StatusBadRequest, nil, err
	}
	user, err := repository.GetUser(c.dbx, context.FirebaseUID)

	if err != nil {
		return http.StatusBadRequest, nil, err
	}
	newComment.UserID = &user.ID

	if err := json.NewDecoder(r.Body).Decode(&newComment); err != nil {
		return http.StatusBadRequest, nil, err
	}

	commentService := service.NewCommentService(c.dbx)
	id, err := commentService.Create(newComment)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	newComment.ID = id

	return http.StatusCreated, newComment, nil
}
