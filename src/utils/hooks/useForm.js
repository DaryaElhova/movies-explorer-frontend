import { useState } from 'react';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;
    setForm({
      ...form,
      [name] : value
    })

    //валидация при изменении значения поля
    const newErrors = { ...errors };

    if (name === 'name') {
      const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/;
      if (!namePattern.test(value)) {
        newErrors[name] = 'Имя содержит недопустимые символы';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(value)) {
        newErrors[name] = 'Некорректный email';
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);

    // Проверка на наличие ошибок
    const isValid = Object.keys(newErrors).length === 0;
    const isFormValid = isValid && 
  Object.keys(form).every(fieldName => !!form[fieldName]);
    setIsFormValid(isFormValid);
  }
  return {form, handleChange, errors, isFormValid}
}

export default useForm;