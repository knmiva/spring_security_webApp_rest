package ru.jm.springSecurity.contoller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserController {

    //получаем домашнюю страницу
    @RequestMapping(value = {"/", "/home"}, method = RequestMethod.GET)
    public ModelAndView homePage() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("title", "Spring Boot + Thymeleaf");
        modelAndView.addObject("message", "This is homepage for USER or ADMIN roles");
        modelAndView.setViewName("thymeleaf/pages/home");
        return modelAndView;
    }

    //получаем админку
    @RequestMapping(value = "/admin/users", method = RequestMethod.GET)
    public ModelAndView adminPage() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("thymeleaf/pages/admin/users");
        return modelAndView;
    }

    //получаем страницу юзера
    @RequestMapping(value = "/user/user", method = RequestMethod.GET)
    public ModelAndView userPage() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("thymeleaf/pages/user/user");
        return modelAndView;
    }
}

