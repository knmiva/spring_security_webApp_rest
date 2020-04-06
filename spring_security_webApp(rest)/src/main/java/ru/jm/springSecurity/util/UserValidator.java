package ru.jm.springSecurity.util;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import ru.jm.springSecurity.model.User;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "fieldInvalid");
        if (user.getUsername().length() < 3 || user.getUsername().length() > 5 || user.getUsername() == null) {
            errors.rejectValue("username", "usernameError");
        }
    }
}
