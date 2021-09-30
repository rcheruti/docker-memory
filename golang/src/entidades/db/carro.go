package db

type Carro struct {
	Id   uint   `gorm:"column:id;primaryKey" json:"id" form:"id"`
	Nome string `gorm:"column:nome" json:"nome" form:"nome"`
	Cor  string `gorm:"column:cor" json:"cor" form:"cor"`
	Ano  int    `gorm:"column:ano" json:"ano" form:"ano"`

	DonoId uint   `gorm:"column:pessoa_id" json:"pessoa" form:"pessoa"`
	Dono   Pessoa `gorm:"foreignKey:DonoId" json:"dono"`
}

func (Carro) TableName() string {
	return "carro"
}
