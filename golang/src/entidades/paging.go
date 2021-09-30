package entidades

type Paging struct {
	Page int `form:"page"`
	Size int `form:"size"`
}

func (this *Paging) CheckDefaults() {
	if this.Page < 0 {
		this.Page = 0
	}
	if this.Size < 1 {
		this.Size = 10
	}
}
