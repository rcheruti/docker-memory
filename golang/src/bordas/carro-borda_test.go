package bordas

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"golang.org/x/exp/slices"
)

type MockedGormDB struct {
	// *gorm.DB
	mock.Mock
}

// func (m *MockedGormDB) Create(value interface{}) (tx *MockedGormDB) {
// 	m.Called(value)
// 	return m
// }

// -------------------------------------------------

func Test_InitCarro(t *testing.T) {
	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	_, r := gin.CreateTestContext(w)

	InitCarro(r)
	routes := r.Routes()
	assert.NotEqual(t, -1,
		slices.IndexFunc(routes, func(route gin.RouteInfo) bool { return route.Method == "POST" && route.Path == "/carro/" }),
		"Não foi encontrado o método 'POST /carro/'")
	assert.NotEqual(t, -1,
		slices.IndexFunc(routes, func(route gin.RouteInfo) bool { return route.Method == "GET" && route.Path == "/carro/todos" }),
		"Não foi encontrado o método 'GET /carro/todos'")
	assert.NotEqual(t, -1,
		slices.IndexFunc(routes, func(route gin.RouteInfo) bool { return route.Method == "GET" && route.Path == "/carro/" }),
		"Não foi encontrado o método 'GET /carro/'")
}

func Test_carroBorda_post(t *testing.T) {
	gin.SetMode(gin.TestMode)

	r := gin.Default()
	InitCarro(r)
	url := "/carro/"
	var req *http.Request
	var w *httptest.ResponseRecorder

	req, _ = http.NewRequest(http.MethodPost, url, strings.NewReader("{ \"nome\": null }"))
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code, "Deveria retornar 400 quando o campo 'nome' não está preenchido")

	req, _ = http.NewRequest(http.MethodPost, url, strings.NewReader("{ \"nome\": \"Algum nome\", \"cor\": null }"))
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code, "Deveria retornar 400 quando o campo 'cor' não está preenchido")

	req, _ = http.NewRequest(http.MethodPost, url, strings.NewReader("{ \"nome\": \"Algum nome\", \"cor\": \"vermelho\", \"ano\": null }"))
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code, "Deveria retornar 400 quando o campo 'ano' não está preenchido")

	// ---
	testObj := new(MockedGormDB)
	testObj.On("Create", mock.Anything).Return(testObj)
	// config.DB = testObj

	req, _ = http.NewRequest(http.MethodPost, url, strings.NewReader("{ \"nome\": \"Algum nome\", \"cor\": \"vermelho\", \"ano\": 2020 }"))
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code, "Deveria retornar 200 no caso de sucesso")
}
