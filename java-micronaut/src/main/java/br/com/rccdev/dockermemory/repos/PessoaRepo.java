package br.com.rccdev.dockermemory.repos;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import br.com.rccdev.dockermemory.entidades.db.Pessoa;
import jakarta.inject.Singleton;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Singleton
public class PessoaRepo {

    private final EntityManager em;

    // ------------------------------------------

    @Transactional
    public List<Pessoa> todos(int page, int size) {
        var sql = "SELECT p FROM Pessoa p LEFT JOIN FETCH p.carros";
        var query = em.createQuery(sql, Pessoa.class);
        query.setMaxResults( size );
        query.setFirstResult( size * page );
        return query.getResultList();
    }

    @Transactional
    public Pessoa save(Pessoa entity) {
        em.persist(entity);
        return entity;
    }

    @Transactional
    public Pessoa getById(Object id) {
        return em.getReference(Pessoa.class, id);
    }

}
