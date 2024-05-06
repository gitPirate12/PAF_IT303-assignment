package dev.paf.FitFusion.configuration;

import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private Oauth2LoginSuccessHandler oauth2LoginSuccessHandler;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth ->{
            auth.anyRequest().authenticated();
            })
            .oauth2Login(oath2->{
                oath2.successHandler(oauth2LoginSuccessHandler);
            })
            .build();
    }
    
}
