package bordas

import (
	"docker-memory/golang/src/config"
	"docker-memory/golang/src/entidades"
	"docker-memory/golang/src/entidades/db"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
)

func InitPessoa(r *gin.Engine) {
	base := "/pessoa"

	r.POST(base+"/", func(c *gin.Context) {
		var params db.Pessoa
		c.ShouldBindJSON(&params)
		if params.Nome == "" {
			c.JSON(400, entidades.MsgErro{Msg: "Campo 'nome' (string) obrigatório!"})
			return
		}
		res := config.DB.Create(&params)
		if res.Error != nil {
			log.Println(res.Error.Error())
			c.JSON(500, entidades.MsgErro{Msg: "Erro ao guardar dados!"})
			return
		}
		c.JSON(200, params)
	})

	r.GET(base+"/todos", func(c *gin.Context) {
		var params entidades.Paging
		c.ShouldBindQuery(&params)
		params.CheckDefaults()

		var pessoas []db.Pessoa
		config.DB.Limit(params.Size).Offset(params.Page * params.Size).Preload("Carros").Find(&pessoas)
		c.JSON(200, pessoas)
	})

	r.GET(base+"/", func(c *gin.Context) {
		var params entidades.Paging
		c.ShouldBindQuery(&params)
		params.CheckDefaults()
		var pessoaParams db.Pessoa
		c.ShouldBindQuery(&pessoaParams)

		sql := config.DB.Limit(params.Size).Offset(params.Page * params.Size).Preload("Carros")
		if pessoaParams.Id > 0 {
			sql = sql.Where("id = ?", pessoaParams.Id)
		}
		pessoaParams.Nome = strings.TrimSpace(pessoaParams.Nome)
		if pessoaParams.Nome != "" {
			sql = sql.Where("nome LiKE ?", "%"+pessoaParams.Nome+"%")
		}

		var pessoas []db.Pessoa
		sql.Find(&pessoas)
		c.JSON(200, pessoas)
	})

}
