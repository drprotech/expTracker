/**
 * 
 */
package com.exptracker.repositories;

import java.sql.Date;
import java.util.List;

import org.hibernate.annotations.SQLInsert;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import com.exptracker.entity.Expense;


/**
 * @author 313062
 *
 */
@RepositoryRestResource
public interface ExpenseRepository extends CrudRepository<Expense, Integer>{
	
//	@Query(value = "select u.* from db_expenses u where "
//			+ "year(STR_TO_DATE(u.date,'%m-%d-%Y') ) = year(STR_TO_DATE(:month,'%m-%Y')) "
//			+ "and month(STR_TO_DATE(u.date,'%m-%d-%Y') ) = month(STR_TO_DATE(:month,'%m-%Y')) order by "
//			+ "STR_TO_DATE(u.date,'%m-%d-%Y') desc", nativeQuery = true)

	@Query(value = "select u.*,CONCAT('Anoop :$',d.Anoop,', Jacob :$',d.Jacob,', Nitin :$',d.Nitin,', Sourabh :$',d.Sourabh,', Anil :$',d.Anil) spread from db_expenses u ,"
			+" (select a.id refid,max(Anoop) Anoop,max(Jacob) Jacob,max(Nitin) Nitin,max(Sourabh) Sourabh,max(Anil) Anil from"
			+" (select dv.id,"
			+" (CASE WHEN dv.person_id = 1 THEN dv.amount else 0 END) Anoop,"
			+" (CASE WHEN dv.person_id = 2 THEN dv.amount else 0 END) Jacob,"
			+" (CASE WHEN dv.person_id = 3 THEN dv.amount else 0 END) Nitin,"
			+" (CASE WHEN dv.person_id = 4 THEN dv.amount else 0 END) Sourabh,"
			+" (CASE WHEN dv.person_id = 5 THEN dv.amount else 0 END) Anil"
			+" FROM    db_expense_division dv) a"
			+" group by a.id) d where"
			+" year(STR_TO_DATE(u.date,'%m-%d-%Y') ) = year(STR_TO_DATE(:month,'%m-%Y'))"
			+" and month(STR_TO_DATE(u.date,'%m-%d-%Y') ) = month(STR_TO_DATE(:month,'%m-%Y'))" 
			+" and u.id = d.refid"
			+" order by"
			+" STR_TO_DATE(u.date,'%m-%d-%Y') desc", nativeQuery = true)
	List<Expense> findAll(@Param("month") String month);
	
	
	@Query(value = "select u.*,sum(u.amount) from db_expenses u where "+
			 " year(STR_TO_DATE(u.date,'%m-%d-%Y') ) = year(STR_TO_DATE(:month,'%m-%Y'))"+ 
			 "and month(STR_TO_DATE(u.date,'%m-%d-%Y') ) = month(STR_TO_DATE(:month,'%m-%Y')) group by u.spentby ", nativeQuery = true)
	List<Expense> findSpent(@Param("month") String month);
	
	
	@Query(value = "select u.* from db_expenses u where u.spentby = :spentby "
			+ "and year(STR_TO_DATE(u.date,'%m-%d-%Y') ) = year(now()) "
			+ "and month(STR_TO_DATE(u.date,'%m-%d-%Y') ) = month(now()) order by "
			+ "STR_TO_DATE(u.date,'%m-%d-%Y') desc", nativeQuery = true)
	List<Expense> findBySpentBy(@Param("spentby") String spentBy);
//	
//	@Modifying
//	 @Transactional
//	 @Query("insert into db_expenses(id) values(:id)")
//	 Integer insertData(@Param("id") int id);
//	  
	@Transactional
	//@Query(value ="insert into #{#entityName} u (u.id,u.spentby) values (:id,:spentby)" ,nativeQuery = true)
	//@Procedure(name = "addexpproc")
	<S extends Expense> S save(S entity); 
	
	@Procedure(name = "addexpproc")
	Integer addExpense(@Param("date") String date,
			@Param("spentby") String spentby,
			@Param("amount") Double amount,
			@Param("where") String where,
			@Param("division") String division,
			@Param("divfactor") Integer divfactor
			);
	
}
