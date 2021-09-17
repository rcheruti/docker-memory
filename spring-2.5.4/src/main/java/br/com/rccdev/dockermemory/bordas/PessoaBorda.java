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
import br.com.rccdev.dockermemory.entidades.db.Pessoa;
import br.com.rccdev.dockermemory.repositorios.PessoaRepo;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/pessoa")
public class PessoaBorda {

  private final PessoaRepo pessoaRepo;
  
  // ---------------------------

  @PostMapping("")
  public ResponseEntity<?> criar(@RequestBody JsonNode dados) {
    if( !dados.path("nome").isTextual() ) return ResponseEntity.status(400).body(new MsgErro().setMsg("Campo 'nome' (string) obrigatório!"));
    var pessoa = new Pessoa().setNome( dados.get("nome").asText() );
    pessoaRepo.save(pessoa);
    return ResponseEntity.ok(pessoa);
  }

  @GetMapping("/todos")
  public ResponseEntity<?> todos(
    @RequestParam(name = "page", defaultValue = "0") int page ,
    @RequestParam(name = "size", defaultValue = "10") int size 
  ) {
    var lista = pessoaRepo.todos( PageRequest.of(page, size, Sort.by(Order.asc("id")) ) );
    // precisamos limpar estruturas de lista, e bidirecionais, para retornar para o Jackson
    lista.forEach( pessoa -> {
      pessoa.getCarros().forEach( carro -> {
        carro.setDono(null);
      });
    });
    return ResponseEntity.ok(lista);
  }

}
