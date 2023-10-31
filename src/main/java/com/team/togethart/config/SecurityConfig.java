package com.team.togethart.config;

import com.team.togethart.config.oauth.PrinclpalOauth2UserService;
import com.team.togethart.repository.member.MemberMapper;
import com.team.togethart.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private MemberService memberService;
    @Autowired
    private CorsConfig corsConfig;
    @Autowired
    private PrinclpalOauth2UserService defaultOAuth2UserService;


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .addFilter(corsConfig.corsFilter())
                .csrf().disable()
               .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
                .anyRequest().permitAll();
    }

    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(memberService).passwordEncoder(new BCryptPasswordEncoder());
    }
}
