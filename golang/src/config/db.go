package config

import (
	"log"

	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	DB = db()
}
func db() *gorm.DB {
	var url = viper.GetString("database_url")
	var port = viper.GetString("database_port")
	var user = viper.GetString("database_username")
	var pass = viper.GetString("database_password")
	var schema = viper.GetString("database_schema")

	// "username:password@tcp(url:port)/schema"
	var connString = user + ":" + pass + "@tcp(" + url + ":" + port + ")/" + schema

	log.Println("Criando conexão com DB: " + url + ":" + port + "/" + schema)
	mydb, err := gorm.Open(mysql.Open(connString), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	return mydb
}
