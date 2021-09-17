package br.com.rccdev.dockermemory.repositorios;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.rccdev.dockermemory.entidades.db.Carro;

public interface CarroRepo extends JpaRepository<Carro, Integer>  {
  
  // buscar todas as pessoa, ja trazendo todos os carros em um JOIN
  @Query(value = "SELECT c FROM Carro c LEFT JOIN FETCH c.dono")
  List<Carro> todos(Pageable page);
  
}
