package server

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/ry-itto/treasure-app/todo_app/backend/httputil"
)

type AppHandler struct {
	h func(http.ResponseWriter, *http.Request) (int, interface{}, error)
}

func (a AppHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	status, res, err := a.h(w, r)
	if err != nil {
		respondErrorJSON(w, status, err)
		return
	}
	respondJSON(w, status, res)
}

func respondJSON(w http.ResponseWriter, status int, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(status)
		w.Write([]byte(err.Error()))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write([]byte(response))
}

func respondErrorJSON(w http.ResponseWriter, status int, err error) {
	log.Printf("code=%d, err=%s", status, err)
	if e, ok := err.(*httputil.HTTPError); ok {
		respondJSON(w, status, e)
	} else if err != nil {
		he := httputil.HTTPError{
			Message: err.Error(),
		}
		respondJSON(w, status, he)
	}
}
