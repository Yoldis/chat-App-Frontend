
export const valid = (form = {}) => {

    let result = {}

    for (const i in form) {
        
        if(!form[i]){
            result = {...result, [i]:'Es obligatorio', ok:true}
        }

        if(i === 'correo'){
            if(!form[i].includes('@') || !form[i].includes('.com')){
                result = {...result, [i]:'El correo es invalido', ok:true}
            }
        }


        if(i === 'password'){
            if(form[i].length < 6){
                result = {...result, [i]:'El password debe tener al menos 6 caracteres', ok:true}
            }
        }

    }

    return result;
}