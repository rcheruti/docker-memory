package db

type Pessoa struct {
	Id     uint    `gorm:"column:id;primaryKey" json:"id" form:"id" `
	Nome   string  `gorm:"column:nome" json:"nome" form:"nome"`
	Carros []Carro `gorm:"foreignKey:DonoId" json:"carros"`
}

func (Pessoa) TableName() string {
	return "pessoa"
}
