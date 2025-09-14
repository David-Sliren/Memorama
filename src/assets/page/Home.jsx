import { useEffect, useState } from 'react';
import appFireBase from '../../credenciales';
import {getAuth, signOut} from 'firebase/auth';

const auth = getAuth(appFireBase);


function Home() {
  const tarjetasP = ['A','J','K','Q','7','10','A','J','K','Q','7','10'];

// para generar cartas de manera automatica

  /*const generateCards = (numPairs) => {
    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    const uniqueValues = symbols.slice(0, numPairs).split('');
    const allValues = [...uniqueValues, ...uniqueValues];
  }*/

// para generar cartas de manera automatica


  function sorteodeCard(){
    return tarjetasP.sort(()=> Math.random() - 0.5).map((value, index)=>({
      id: ++index,
      value,
      volteado: false,
      iguales: false, 
    }));
  }

  const [tarjetas, setTarjetas] = useState(sorteodeCard());
  const [tiro1, setTiro1] = useState(null);
  const [tiro2, setTiro2] = useState(null);
  const [isdesable, setDesable] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const [autoGiro, setAutoGiro] = useState(true);
  const [gano, setGano] = useState(false);

  useEffect(()=>{
    let id;
    if(autoGiro){
      id = setTimeout(()=>{
        setAutoGiro(false);
      }, 700);
    }

    return () => clearTimeout(id);
  },[autoGiro]);


  useEffect(()=>{
    
    if(tiro1 && tiro2){
      setDesable(true);
      if(tiro1.value === tiro2.value){

        setTarjetas(prev => {
          const newtarjetas = prev.map((tarjeta)=>{

            if(tarjeta.value == tiro1.value || tarjeta.value == tiro2.value){
              setPuntuacion(puntuacion + 2);
              return {...tarjeta, iguales: true};
            }

            return tarjeta;
          });
          ganador(newtarjetas);
          return newtarjetas;
        });
        resetear();
      }else{
        setTimeout(()=>{
        setTarjetas((prev) => {
          return prev.map((tarjeta)=>{
            if(tarjeta.id === tiro1.id || tarjeta.id === tiro2.id){
              return {...tarjeta, volteado: false};
            }
            return tarjeta;
          })
        });
        resetear();
      },1000);
    }
  
  }
},[tiro1, tiro2]);

  // boton para gregar

  // function addCart(){
  //   const letraRandom = Math.floor(Math.random() * (tarjetas.length + 1) * 0.5);

  //   const letraRandom2 = Math.floor(Math.random() * (tarjetas.length) * 0.5);
    
  //   const newCart ={id: tarjetas.length + 1, value: tarjetas[letraRandom].value};

  //   setTarjetas(prev => [...prev, newCart]);
  // }

  // boton para gregar


  function selectCart(card){

    if(isdesable || tarjetas.iguales || (tiro1 && tiro1.id === card.id)){
      return;
    } 

    setTarjetas(prev => {return prev.map((t)=> t.id === card.id ? {...t, volteado: true} : t);
  });

  if(!tiro1){
    setTiro1(card);
  }else{
    setTiro2(card);
  }
  console.log('tiro1: ', tiro1);
  console.log('tiro2: ', tiro2);
  }

  function resetear(){
    setTiro1(null);
    setTiro2(null);
    setDesable(false);
  }

  function reinicio(){
    setTarjetas(sorteodeCard());
    setTiro1(null);
    setTiro2(null);
    setDesable(false);
    setGano(false);
    setPuntuacion(0);
    setTimeout(()=>{
      setAutoGiro(true);
    }, 800);
  }

  function ganador(win){
    const winner = win.every(item => item.iguales);
    if(winner){
      setGano(true);
    }
  }


  return (
    <section className='home'>

      <h1 className='home-title'>Memorama</h1>
      <section className='game'>
        <h1 className='puntuacion'>Puntuacion: {puntuacion}</h1>
        {tarjetas.map(item=>{
          return(
            <article className={`card  ${ autoGiro || item.volteado || item.iguales ? ' activada' : ''}`} key={item.id} onClick={()=> selectCart(item)}>
            <article className='face'>{item.value}</article>
              <article className='back'></article>
            </article>
          );
        })}
        {gano && 
        
          <section className='winner'>
            <h2>HAS GANADO</h2>
            <button className='btn'onClick={reinicio} >Reinicio</button>
          </section>
        }
      </section>
        <button className='btn btn-h' onClick={()=> signOut(getAuth(appFireBase))}>Salir</button>
    </section>
  )
}

export default Home