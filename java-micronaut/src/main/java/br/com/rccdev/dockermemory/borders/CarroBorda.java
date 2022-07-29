package br.com.rccdev.dockermemory.borders;

import javax.transaction.Transactional;

import com.fasterxml.jackson.databind.JsonNode;

import br.com.rccdev.dockermemory.entidades.MsgErro;
import br.com.rccdev.dockermemory.entidades.db.Carro;
import br.com.rccdev.dockermemory.repos.CarroRepo;
import br.com.rccdev.dockermemory.repos.PessoaRepo;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller(value = "/carro")
public class CarroBorda {

    private final CarroRepo carroRepo;
    private final PessoaRepo pessoaRepo;
    
    // ---------------------------
    
    @Post
    @Transactional
    public HttpResponse<?> criar(@Body JsonNode dados) {
        if( !dados.path("nome").isTextual() ) return HttpResponse.badRequest(new MsgErro().setMsg("Campo 'nome' (string) obrigatório!"));
        if( !dados.path("cor").isTextual() ) return HttpResponse.badRequest(new MsgErro().setMsg("Campo 'cor' (string) obrigatório!"));
        if( !dados.path("ano").isInt() ) return HttpResponse.badRequest(new MsgErro().setMsg("Campo 'ano' (int) obrigatório!"));
        var carro = new Carro()
            .setNome( dados.get("nome").asText() )
            .setCor( dados.get("cor").asText() )
            .setAno( dados.get("ano").asInt() )
            .setDono( dados.has("pessoa") ? pessoaRepo.getById( dados.path("pessoa").asInt() ) : null )
            ;
        carroRepo.save(carro);
        if( carro.getDono() != null ) carro.getDono().setCarros(null);
        return HttpResponse.ok(carro);
    }

    @Get("/todos")
    @Transactional
    public HttpResponse<?> todos(
        @QueryValue(value = "page", defaultValue = "0") int page ,
        @QueryValue(value = "size", defaultValue = "10") int size 
    ) {
        var lista = carroRepo.todos( page, size );
        // precisamos limpar estruturas de lista, e bidirecionais, para retornar para o Jackson
        lista.forEach( carro -> {
            carro.getDono().setCarros(null);
        });
        return HttpResponse.ok(lista);
    }

}
