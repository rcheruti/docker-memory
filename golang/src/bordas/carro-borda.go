package bordas

import (
	"docker-memory/golang/src/config"
	"docker-memory/golang/src/entidades"
	"docker-memory/golang/src/entidades/db"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
)

func InitCarro(r *gin.Engine) {
	base := "/carro"
	r.POST(base+"/", carroBorda_post)
	r.GET(base+"/todos", carroBorda_get_todos)
	r.GET(base+"/", carroBorda_get)
}

// ----------------------------------------------------------

func carroBorda_post(c *gin.Context) {
	var params db.Carro
	c.ShouldBindJSON(&params)
	if params.Nome == "" {
		c.JSON(400, entidades.MsgErro{Msg: "Campo 'nome' (string) obrigatório!"})
		return
	}
	if params.Cor == "" {
		c.JSON(400, entidades.MsgErro{Msg: "Campo 'cor' (string) obrigatório!"})
		return
	}
	if params.Ano == 0 {
		c.JSON(400, entidades.MsgErro{Msg: "Campo 'ano' (string) obrigatório!"})
		return
	}

	res := config.DB.Create(&params)
	if res.Error != nil {
		log.Println(res.Error.Error())
		c.JSON(500, entidades.MsgErro{Msg: "Erro ao guardar dados!"})
		return
	}

	c.JSON(200, params)
}

func carroBorda_get_todos(c *gin.Context) {
	var params entidades.Paging
	c.ShouldBindQuery(&params)
	params.CheckDefaults()

	var carros []db.Carro
	config.DB.Limit(params.Size).Offset(params.Page * params.Size).Joins("Dono").Find(&carros)
	c.JSON(200, carros)
}

func carroBorda_get(c *gin.Context) {
	var params entidades.Paging
	c.ShouldBindQuery(&params)
	params.CheckDefaults()
	var carroParams db.Carro
	c.ShouldBindQuery(&carroParams)

	sql := config.DB.Limit(params.Size).Offset(params.Page * params.Size).Joins("Dono")

	if carroParams.Id > 0 {
		sql = sql.Where("carro.id = ?", carroParams.Id)
	}
	carroParams.Nome = strings.TrimSpace(carroParams.Nome)
	if carroParams.Nome != "" {
		sql = sql.Where("carro.nome LIKE ?", "%"+carroParams.Nome+"%")
	}
	carroParams.Cor = strings.TrimSpace(carroParams.Cor)
	if carroParams.Cor != "" {
		sql = sql.Where("cor LIKE ?", "%"+carroParams.Cor+"%")
	}
	if carroParams.Ano > 0 {
		sql = sql.Where("ano = ?", carroParams.Ano)
	}

	var carros []db.Carro
	sql.Find(&carros)
	c.JSON(200, carros)
}
