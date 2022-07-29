package br.com.rccdev.dockermemory.borders;

import com.fasterxml.jackson.databind.JsonNode;

import br.com.rccdev.dockermemory.entidades.MsgErro;
import br.com.rccdev.dockermemory.entidades.db.Pessoa;
import br.com.rccdev.dockermemory.repos.PessoaRepo;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller(value = "/pessoa")
public class PessoaBorda {
    
    private final PessoaRepo pessoaRepo;

    // -----------------------------------------

    @Post
    public HttpResponse<?> criar(@Body JsonNode dados) {
        if( !dados.path("nome").isTextual() ) return HttpResponse.badRequest(new MsgErro().setMsg("Campo 'nome' (string) obrigatório!"));
        var pessoa = new Pessoa().setNome( dados.get("nome").asText() );
        pessoaRepo.save(pessoa);
        return HttpResponse.ok(pessoa);
    }

    @Get("/todos")
    public HttpResponse<?> todos(
        @QueryValue(value = "page", defaultValue = "0") int page ,
        @QueryValue(value = "size", defaultValue = "10") int size 
    ) {
        var lista = pessoaRepo.todos( page, size );
        // precisamos limpar estruturas de lista, e bidirecionais, para retornar para o Jackson
        lista.forEach( pessoa -> {
            pessoa.getCarros().forEach( carro -> {
                carro.setDono(null);
            });
        });
        return HttpResponse.ok(lista);
    }

}
