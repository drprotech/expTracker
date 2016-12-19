/**
 * 
 */
package com.exptracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.exptracker.entity.Person;

/**
 * @author 313062
 *
 */
@RepositoryRestResource
public interface PersonRepository extends CrudRepository<Person, Integer>{
	
	@Query("select u from #{#entityName} u")
	List<Person> findAll();
	

	List<Person> findByemail(@Param("email") String email);
}
