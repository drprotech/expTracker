/**
 * 
 */
package com.exptracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.exptracker.entity.Spent;

/**
 * @author 313062
 *
 */
public interface SpentRepository extends CrudRepository<Spent, String>{
	
	@Query(value = "select v.person_id as id,u.spentby as name ,sum(u.amount) as count from db_expenses u,db_person_names v where u.spentby = v.person_name and "+
			 " year(STR_TO_DATE(u.date,'%m-%d-%Y') ) = year(STR_TO_DATE(:month,'%m-%Y'))"+ 
			 "and month(STR_TO_DATE(u.date,'%m-%d-%Y') ) = month(STR_TO_DATE(:month,'%m-%Y')) group by u.spentby ", nativeQuery = true)
	List<Spent> findSpent(@Param("month") String month);
	
	@Query(value = "select w.person_id as id, w.person_name as name ,sum(v.Amount) as count from db_expenses u ,db_expense_division v , db_person_names w "
					+"where year(STR_TO_DATE(u.date,'%m-%d-%Y') ) = year(STR_TO_DATE(:month,'%m-%Y')) "
		+" and month(STR_TO_DATE(u.date,'%m-%d-%Y') ) = month(STR_TO_DATE(:month,'%m-%Y'))" 
		+" and u.id = v.id and v.person_id = w.person_id"
		+" group by w.person_name" , nativeQuery = true)
	List<Spent>findTransfers(@Param("month") String month);

}
