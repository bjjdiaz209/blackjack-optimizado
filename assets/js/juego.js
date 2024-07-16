
(()=> {
    'use strict'
     
     
     let deck = [];
     const tipos = ['C','D','H','S'],
           especiales = ['A','J','Q','K'];
     
    let puntosJugadores = [];
     //let puntosJugador = 0,
     //puntosComputadora = 0;
     //referencias del HTML
      const btnPedir = document.querySelector('#btnPedir'),
            btnDetener = document.querySelector('#btnDetener'),
            btnNuevo = document.querySelector('#btnNuevo');
     
      const divCartasJugador = document.querySelectorAll('.divCartas'),
            puntosHTML = document.querySelectorAll('small');
     
    //inicializa el juego
     const inicializaJuego = (numJuagadores = 2) => {
       deck = crearDeck();
       puntosJugadores = [];
       for (let i = 0; i < numJuagadores; i++) {
        puntosJugadores.push(0);      
       }
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugador.forEach(elem => elem.innerHTML = '');


     
         btnPedir. disabled = false;
         btnDetener.disabled = false;


     }

     //crea un nueva baraja
     const crearDeck = () =>{
         deck = [];
         for (let i = 2; i <= 10; i++) {
             for (let tipo of tipos) {
                 deck.push(i+tipo);
             }        
         }
         for (let tipo of tipos) {
             for (let esp of especiales) {
                 deck.push(esp + tipo);
                 
             }
             
         }
       return _.shuffle(deck);
     }
     //funcion me permite tomar una carta
     const pedirCarta = () => {
     
         if (deck.length === 0) {
             throw 'no hay cartas';
         }
          return deck.pop();;
     }
     
     const valorCarta = (carta) =>{
           const valor = carta.substring(0,carta.length-1);
           return (isNaN(valor)) ?
                 (valor === 'A') ? 11 : 10
                 :valor * 1;
     }
     // turno de la computadora

     const acumularPuntos = (carta,turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
     }

     const crearCarta = (carta,turno) =>{

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta);
        
     }

     const determinarGanador = () => {
         const [puntosMinimos,puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('nadie gana');
                
            } else if( puntosMinimos > 21){
                alert('computadora gana');
            }else if (puntosComputadora > 21) {
                alert ('juagador gana');
            }else{
                alert('computador gana');
            }
          }, 10);

     }
     
     const turnoComputadora = (puntosMinimos) =>{
        let puntosComputadora = 0;
         do{
         const carta = pedirCarta();
         puntosComputadora = acumularPuntos(carta , puntosJugadores.length -1 );
         crearCarta(carta,puntosJugadores.length -1);
            
     }while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
     
       determinarGanador();
     
         
     }
     
     //eventos
     
     btnPedir.addEventListener('click',() =>{
        
         const carta = pedirCarta();
         const puntosJugador = acumularPuntos(carta,0);

         crearCarta(carta ,0);
     
        if (puntosJugador > 21) {
         console.warn('perdiste');
         btnPedir.disabled = true;
         btnDetener.disabled = true;
     
         turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21){
         console.warn('ganaste');
         btnPedir. disabled = true;
         btnDetener.disabled = true;
         turnoComputadora(puntosJugador);   
        }
     });


     btnDetener.addEventListener('click',() =>{
         btnDetener.disabled = true;
         btnPedir. disabled = true;
     
         turnoComputadora(puntosJugadores[0]);
     });

     btnNuevo.addEventListener('click',() =>{
        
         inicializaJuego();
         
     
     
       });

})();








