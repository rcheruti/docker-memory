package br.com.rccdev.dockermemory.entidades.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import io.micronaut.core.annotation.Introspected;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;


@Accessors(fluent = false, chain = true)
@Getter @Setter
@Entity
@Table(name = "carro")
@Introspected
public class Carro {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "nome")
  private String nome;

  @Column(name = "cor")
  private String cor;

  @Column(name = "ano")
  private int ano;

  // ---------

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "pessoa_id")
  private Pessoa dono;
  
}
