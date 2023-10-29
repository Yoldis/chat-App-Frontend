import { useEffect, useState } from "react";
import { valid } from "../helpers/validForm";


export const useForm = (initialState = {}) => {

    const [form, setform] = useState(initialState);
    const [erroForm, setErroForm] = useState({});

    useEffect(() => {
        setform(initialState);
    }, []);

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setform({...form, [name]:value});
    }

     const onChangeInputFile = (e) => {
      const file = e.target.files[0];
      setform({...form, archivo:file});
    }

    const onResetForm = () => {
        setform(initialState)
    }

    const validForm = () => {
      const result = valid(form);
      return result;
    }

  return {
    ...form,
    form,
    setform,
    onChangeInput,
    onChangeInputFile,
    onResetForm,
    validForm,

    erroForm,
    setErroForm
  }
}
