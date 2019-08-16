package server

import (
	"fmt"

	"github.com/ry-itto/treasure-app/todo_app/backend/controller"
	"github.com/ry-itto/treasure-app/todo_app/backend/middleware"

	db2 "github.com/ry-itto/treasure-app/todo_app/backend/db"

	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/justinas/alice"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/rs/cors"
)

type Server struct {
	db     *sqlx.DB
	router *mux.Router
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Init(datasource string) {
	db := db2.NewDB(datasource)
	dbcon, err := db.Open()
	if err != nil {
		log.Fatalf("failed db init. %s", err)
	}
	s.db = dbcon
	s.router = s.Route()
}

func (s *Server) Run(addr string) {
	log.Printf("Listening on port %s", addr)
	err := http.ListenAndServe(
		fmt.Sprintf(":%s", addr),
		handlers.CombinedLoggingHandler(os.Stdout, s.router),
	)
	if err != nil {
		panic(err)
	}
}

func (s *Server) Route() *mux.Router {
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedHeaders: []string{"Authorization"},
		AllowedMethods: []string{
			http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
		},
	})

	chain := alice.New(
		middleware.RecoverMiddleware,
		corsMiddleware.Handler,
	)

	taskController := controller.NewTaskController(s.db)

	r := mux.NewRouter()
	r.Methods(http.MethodGet).Path("/tasks").Handler(chain.Then(AppHandler{taskController.Index}))
	return r
}
