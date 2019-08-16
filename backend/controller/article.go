package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"

	"github.com/voyagegroup/treasure-app/httputil"
	"github.com/voyagegroup/treasure-app/model"
	"github.com/voyagegroup/treasure-app/repository"
	"github.com/voyagegroup/treasure-app/service"
)

type Article struct {
	db *sqlx.DB
}

func NewArticle(db *sqlx.DB) *Article {
	return &Article{db: db}
}

func (a *Article) Index(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	articles, err := repository.AllArticle(a.db)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	return http.StatusOK, articles, nil
}

func (a *Article) Show(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return http.StatusBadRequest, nil, &httputil.HTTPError{Message: "invalid path parameter"}
	}

	aid, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	article, err := repository.FindArticle(a.db, aid)

	if err != nil && err == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	fmt.Println("artcle")
	comments, err := repository.FindCommentByArticleID(a.db, aid)
	if err != nil && err == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	fmt.Println("comment")
	articleDetail := service.CombineArticleComments(article, comments)

	return http.StatusCreated, articleDetail, nil
}

func (a *Article) Create(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	newArticle := &model.ArticleTags{}
	contextUser, err := httputil.GetUserFromContext(r.Context())
	if err != nil {
		log.Print(err)
		return http.StatusBadRequest, nil, err
	}
	user, err := repository.GetUser(a.db, contextUser.FirebaseUID)

	if err != nil {
		log.Print(err)
		return http.StatusBadRequest, nil, err
	}
	newArticle.Article.UserID = &user.ID

	if err := json.NewDecoder(r.Body).Decode(&newArticle); err != nil {
		log.Print(err)
		return http.StatusBadRequest, nil, err
	}

	articleService := service.NewArticle(a.db)
	id, err := articleService.Create(newArticle)
	if err != nil {
		log.Print(err)
		return http.StatusInternalServerError, nil, err
	}
	newArticle.Article.ID = id

	return http.StatusCreated, newArticle, nil
}

func (a *Article) Update(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return http.StatusBadRequest, nil, &httputil.HTTPError{Message: "invalid path parameter"}
	}

	aid, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	reqArticle := &model.Article{}
	if err := json.NewDecoder(r.Body).Decode(&reqArticle); err != nil {
		return http.StatusBadRequest, nil, err
	}

	articleService := service.NewArticle(a.db)
	err = articleService.Update(aid, reqArticle)
	if err != nil && errors.Cause(err) == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusNoContent, nil, nil
}

func (a *Article) Destroy(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return http.StatusBadRequest, nil, &httputil.HTTPError{Message: "invalid path parameter"}
	}

	aid, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	articleService := service.NewArticle(a.db)
	err = articleService.Destroy(aid)
	if err != nil && errors.Cause(err) == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusNoContent, nil, nil
}
