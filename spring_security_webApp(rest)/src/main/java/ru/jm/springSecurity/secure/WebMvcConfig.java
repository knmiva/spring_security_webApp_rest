package ru.jm.springSecurity.secure;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    //стандартная настройка спринга, создающая контроллер отображающий форму Логин
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("thymeleaf/pages/login");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }
}
