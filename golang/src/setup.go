package src

import (
	"docker-memory/golang/src/bordas"
	"docker-memory/golang/src/config"
	"log"

	"github.com/gin-gonic/gin"
)

func Setup() {
	config.LoadConfig()
	config.InitDB()
	log.Println("Iniciando servidor")
	r := gin.Default()
	bordas.InitPessoa(r)
	bordas.InitCarro(r)
	r.Run()
}
