package com.exptracker;

import java.security.Principal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
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
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exptracker.entity.Person;

@Configuration
@ComponentScan
@EnableJpaRepositories
@Import(RepositoryRestMvcConfiguration.class)
@EnableAutoConfiguration
//@PropertySource("application.properties")
@EnableOAuth2Sso
@RestController
//public class ExptrackerApplication extends SpringBootServletInitializer {
public class ExptrackerApplication extends WebSecurityConfigurerAdapter {
	@RequestMapping("/user")
	  public Principal user(Principal principal) {
	    return principal;
	  }
	
	@Override
	//protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	 protected void configure(HttpSecurity http) throws Exception {
		http.antMatcher("/**")
	      .authorizeRequests()
	        //.antMatchers("/","/login**","/css/**","/plugins/**","/js/**","/dist/**")
	      //.antMatchers("/login**")
	        //.permitAll()
	      .anyRequest()
	        .authenticated()
	        .and().exceptionHandling()
	        .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/login"));
	        //.and().logout().logoutSuccessUrl("/").permitAll();
		//return application.sources(ExptrackerApplication.class);
	}
	 
	public static void main(String[] args) {
		//SpringApplication.run(ExptrackerApplication.class, args);
		//Nitin changes for exposing the ID field
		ConfigurableApplicationContext ctx = SpringApplication.run(ExptrackerApplication.class, args);

	    RepositoryRestConfiguration restConfiguration = ctx.getBean(RepositoryRestConfiguration.class);

	    restConfiguration.exposeIdsFor(Person.class);
	}
	
	
	
}
