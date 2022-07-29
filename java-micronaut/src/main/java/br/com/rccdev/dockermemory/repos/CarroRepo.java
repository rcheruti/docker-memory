package br.com.rccdev.dockermemory.repos;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import br.com.rccdev.dockermemory.entidades.db.Carro;
import jakarta.inject.Singleton;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Singleton
public class CarroRepo {

    private final EntityManager em;

    // ------------------------------------------

    @Transactional
    public List<Carro> todos(int page, int size) {
        var sql = "SELECT c FROM Carro c LEFT JOIN FETCH c.dono";
        var query = em.createQuery(sql, Carro.class);
        query.setMaxResults( size );
        query.setFirstResult( size * page );
        return query.getResultList();
    }

    @Transactional
    public Carro save(Carro entity) {
        em.persist(entity);
        return entity;
    }

    @Transactional
    public Carro getById(Object id) {
        return em.getReference(Carro.class, id);
    }
    
}
