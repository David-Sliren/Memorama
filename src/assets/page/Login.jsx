import {useState } from "react"
import appFireBase from '../../credenciales';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const auth =  getAuth(appFireBase);

function Login() {
    
  const [registrado, setRegistrado] = useState(true);
  async function autenticar(e){
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    // console.log(contraseña);
    if(registrado){
        try{
            await signInWithEmailAndPassword(auth, correo, contraseña);
        }catch{
            alert('Verifica si tienes cuenta o revisa tus datos');
        }
    }else{
        try{
            await createUserWithEmailAndPassword(auth, correo, contraseña);
        }catch{
            alert('Cuenta en uso, usa otro correo');
        }
    }
  }

    return (
    <div className='login'>
        <h2 className='bienvenida'>Bienvenido</h2>
      <form className='form' onSubmit={autenticar}>
        <img src="https://i.pinimg.com/1200x/7a/c0/f3/7ac0f3963a33dc1a3ed597ccd5d52f5d.jpg" alt="Hombre con traje" />
        <input type="email" placeholder='Escribe tu Email' id='email' required autoComplete='off'/>
        <input type="password"placeholder='Escribe tu contraseña' id='password' required autoComplete='new-password'/>
        <button type='submit' className='btn'>{registrado ? 'Ingresar' : 'Crear'}</button>
      </form>

      <section className='ingreso'>
        <p className='ingreso-p'>{!registrado ? 'Ya tienes una cuenta?' : 'No tienes una cuenta?'}</p>
        <button className='btn' onClick={()=> setRegistrado(!registrado)}>{!registrado ? 'Iniciar seccion' : 'Crear cuenta'}</button>
      </section>
    </div>
  )
}

export default Login