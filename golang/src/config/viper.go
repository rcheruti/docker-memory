package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

func LoadConfig() {
	log.Println("Carregando configurações")
	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	viper.AutomaticEnv()
	err := viper.ReadInConfig()
	if err != nil { // Handle errors reading the config file
		panic(fmt.Errorf("Fatal error config file: %w \n", err))
	}
}
