package br.com.rccdev.dockermemory.repositorios;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.rccdev.dockermemory.entidades.db.Pessoa;

public interface PessoaRepo extends JpaRepository<Pessoa, Integer> {
  
  // buscar todas as pessoa, ja trazendo todos os carros em um JOIN
  @Query(value = "SELECT p FROM Pessoa p LEFT JOIN FETCH p.carros")
  List<Pessoa> todos(Pageable page);

}
