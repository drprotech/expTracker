package com.exptracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import com.exptracker.entity.Person;

@Configuration
@ComponentScan
@EnableJpaRepositories
@Import(RepositoryRestMvcConfiguration.class)
@EnableAutoConfiguration
//@PropertySource("application.properties")
public class ExptrackerApplication extends SpringBootServletInitializer{

	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ExptrackerApplication.class);
	}
	 
	public static void main(String[] args) {
		//SpringApplication.run(ExptrackerApplication.class, args);
		//Nitin changes for exposing the ID field
		ConfigurableApplicationContext ctx = SpringApplication.run(ExptrackerApplication.class, args);

	    RepositoryRestConfiguration restConfiguration = ctx.getBean(RepositoryRestConfiguration.class);

	    restConfiguration.exposeIdsFor(Person.class);
	}
	
	
	
}
