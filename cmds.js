const model =require('./model');
const {log, biglog, errorlog, colorize} = require("./out");

exports.helpCmd=rl=>{
    	console.log('Comandos:');
	 console.log("h|help - Muestra esta ayuda.");
	 console.log("list - Listar los quizzes existentes.");
	 console.log("show <id> - Muestra la pregunta y la respuesta el quiz indicado.");
 	console.log("add - Añadir un nuevo quiz interactivamente.");
 	console.log("delete <id> - Borrar el quiz indicado.");
 	console.log("edit <id> - Editar el quiz indicado");
 	console.log("test <id> - Probar el quiz indicado");
 	console.log("p|play - Jugar a preguntar aleatoriamente todos los quizzes.");
 	console.log("credits - Créditos.");
 	console.log("q|quiz - Salir del programa.");
      rl.prompt();
     };
exports.quitCmd=rl=>{
    rl.close();
    rl.prompt();
   };
 exports.addCmd=rl=>{
     rl.question(colorize('Introduzca una pregunta:','red'), question =>{
     rl.question(colorize('Introduzca la respuesta','red'), answer => {
       model.add(question,answer);
       log(`${colorize('Se ha añadido','magenta')}: ${question} ${colorize('=>','magenta')} ${answer}`);
       rl.prompt();
        
     });
    
   });
   
    };
  exports.listCmd=rl=>{
     model.getAll().forEach((quiz,id) => {
     log(`[${colorize(id,'magenta')}]: ${quiz.question}` ) ;
     
   });
   
    rl.prompt();
   };
   exports.showCmd=(rl,id)=>{
     
      if(typeof id === "undefined"){
       errorlog(`Falta el parámetro id`);
     } else {
       try{
         const quiz = model.getByIndex(id);
         log(`[${colorize(id,'magenta')}]: ${quiz.question} ${colorize('=>','magenta')} ${quiz.answer}`);
       }catch(error){
       errorlog(error.message);
     }
     }

    rl.prompt();
    };
   
    exports.testCmd=(rl,id)=>{
      if(typeof id === "undefined"){
       errorlog(`Falta el parámetro id`);
     } else {
       try{
         const quiz = model.getByIndex(id);
         
        
         
  
          rl.question(`${colorize(quiz.question, 'red')}`, answer=>{
            
            const bien = answer.trim();
            
            if(bien==quiz.answer){
              
              log("Su respuesta es correcta");
              rl.prompt();
            }
            
            else{
              
              log("Su respuesta es incorrecta");
              rl.prompt();
            }
              
                          });
            
              
            
        
       }catch(error){
       errorlog(error.message);
       rl.prompt();
     }
     }

  
    };
   
   exports.playCmd=rl=>{
     
     let score = 0;
     
     let contador = model.count();
     
     let toBeResolved=[];
     
     for (i=0; i<model.count(); i++){
       
       toBeResolved[i]=i;

     }
       const play = () => {
       if(contador===0){
         rl.prompt();
         
          log(`Fin del juego. Aciertos ${colorize(score,'magenta')}`);
          
 
     }
       else{
         
         let idaux= Math.round(Math.random()*(toBeResolved.length -1));
         let id= toBeResolved[idaux];
         let quiz = model.getByIndex(id);
         toBeResolved.splice(idaux,1);
         contador --;
         rl.question(`${colorize(quiz.question, 'red')}`, answer=>{
           
           const bien = answer.trim();
           
           if(bien===quiz.answer){
             
             score++;
             log(`Su respuesta es correcta Aciertos ${colorize(score,'magenta')}`);
             
             play();
                        }
           else{
             
              log(`Su respuesta es incorrecta Aciertos ${colorize(score,'magenta')}`);
               rl.prompt();
         }
        
        
         });
       
    }
       };
       play();
   };
   exports.deleteCmd=(rl,id)=>{
    if(typeof id === "undefined"){
       errorlog(`falta el parametro id`);
     } else {
       try{
        model.deleteByIndex(id);
       }catch(error){
       errorlog(error.message);
     }
     }
    rl.prompt();
    };
   exports.editCmd=(rl,id)=>{
    if(typeof id === "undefined"){
       errorlog(`Falta el parametro id`);
       rl.prompt();
     } else {
       try{
         const quiz = model.getByIndex(id);
         
         process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)}, 0);
         
         rl.question(colorize('Introduzca una pregunta: ', 'red'), question=>{
           
            process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)}, 0);
           rl.question(colorize('Introduzca una respuesta: ', 'red'),answer=>{
             model.update(id,question,answer);
             log(`se ha cambiado el quiz ${colorize(id,'magenta')}por: ${question} `);
             rl.prompt();
           });
         });   
          }catch(error){
       errorlog(error.message);
       rl.prompt();
     }}
         };
    
    exports.creditsCmd=rl=>{
    console.log("Autores de la practica:");
    console.log('nombre 1');
    console.log('nombre 2');
    rl.prompt();
};
