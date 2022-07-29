package br.com.rccdev.dockermemory.entidades.db;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import io.micronaut.core.annotation.Introspected;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;


@Accessors(fluent = false, chain = true)
@Getter @Setter
@Entity
@Table(name = "pessoa")
@Introspected
public class Pessoa {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "nome")
  private String nome;

  // ---------

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "dono")
  private List<Carro> carros;
  
}
