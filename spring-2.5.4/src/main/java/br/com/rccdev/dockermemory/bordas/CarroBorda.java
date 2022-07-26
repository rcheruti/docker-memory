package br.com.rccdev.dockermemory.bordas;

import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.rccdev.dockermemory.entidades.MsgErro;
import br.com.rccdev.dockermemory.entidades.db.Carro;
import br.com.rccdev.dockermemory.repositorios.CarroRepo;
import br.com.rccdev.dockermemory.repositorios.PessoaRepo;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/carro")
public class CarroBorda {

  private final CarroRepo carroRepo;
  private final PessoaRepo pessoaRepo;
  
  // ---------------------------

  @PostMapping("")
  public ResponseEntity<?> criar(@RequestBody JsonNode dados) {
    if( !dados.path("nome").isTextual() ) return ResponseEntity.status(400).body(new MsgErro().setMsg("Campo 'nome' (string) obrigatório!"));
    if( !dados.path("cor").isTextual() ) return ResponseEntity.status(400).body(new MsgErro().setMsg("Campo 'cor' (string) obrigatório!"));
    if( !dados.path("ano").isInt() ) return ResponseEntity.status(400).body(new MsgErro().setMsg("Campo 'ano' (int) obrigatório!"));
    var carro = new Carro()
      .setNome( dados.get("nome").asText() )
      .setCor( dados.get("cor").asText() )
      .setAno( dados.get("ano").asInt() )
      .setDono( dados.has("pessoa") ? pessoaRepo.getById( dados.path("pessoa").asInt() ) : null )
    ;
    carroRepo.save(carro);
    if( carro.getDono() != null ) carro.getDono().setCarros(null);
    return ResponseEntity.ok(carro);
  }

  @GetMapping("/todos")
  public ResponseEntity<?> todos(
    @RequestParam(name = "page", defaultValue = "0") int page ,
    @RequestParam(name = "size", defaultValue = "10") int size 
  ) {
    var lista = carroRepo.todos( PageRequest.of(page, size, Sort.by(Order.asc("id")) ) );
    // precisamos limpar estruturas de lista, e bidirecionais, para retornar para o Jackson
    lista.forEach( carro -> {
      carro.getDono().setCarros(null);
    });
    return ResponseEntity.ok(lista);
  }
  
}
