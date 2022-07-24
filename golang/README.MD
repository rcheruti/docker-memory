
# Instruções básicas

Para iniciar o projeto:  
```
go mod init nome/projeto
touch main.go
```

Para executar o código para teste:
```
go run .
```

# Testes unitários e Benchmark

Em **Go** devemos colocar um arquivo de nome `[meu arquivo]_test.go` na mesma pasta 
do arquivo que queremos testar.


Dentro de um arquivo de testes, uma funcção com nome `func Benchmark[Outro nome](...)`
será executada apenas se o parâmetro `--bench` for informado ao executar os testes.


Para executar os testes unitários:
```
go test -v ./...  (são 3 pontos no final mesmo)
```

Para executar os testes unitários com análise de cobertura:
```
go test -v ./... -coverprofile=coverage.out
go tool cover -html=coverage.out
```
