var formElement=null;
var respuestaNumber=null;
var respuestaText=null;
var respuestaSelect=null;
var respuestaSelect2=null;
var respuestasCheckbox = [];
var respuestasCheckbox2 = [];
var respuestasRadio = [];
var respuestasRadio2 = [];
var respuestasMulti = [];
var respuestasMulti2 = [];
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
inicializar();
   if (comprobar()){
    corregirRadio();
    corregirRadio2();
    corregirText();
    corregirNumber();
    corregirCheckbox();
    corregirCheckbox2();
    corregirSelect();
    corregirSelect2();    
    corregirMulti();
    corregirMulti2();
    presentarNota();
   }
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/marcbunyola/questions/master/questions/xml/questions.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
//RADIO
 var preg1 = xmlDoc.getElementsByTagName("title")[0].innerHTML;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("pregunta1").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio[i]=xmlDoc.getElementById("pregunta1").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadioHtml(preg1,opcionesRadio);
 var nres = xmlDoc.getElementById("pregunta1").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio[i]=xmlDoc.getElementById("pregunta1").getElementsByTagName("answer")[i].innerHTML;
 }

//RADIO
 var preg2 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesRadio2 = [];
 var nopt = xmlDoc.getElementById("pregunta2").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio2[i]=xmlDoc.getElementById("pregunta2").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosRadioHtml2(preg2,opcionesRadio2);
 var nres = xmlDoc.getElementById("pregunta2").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio2[i]=xmlDoc.getElementById("pregunta2").getElementsByTagName("answer")[i].innerHTML;
 }
 
//TEXT
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
var preg3=xmlDoc.getElementsByTagName("title")[2].innerHTML;
ponerDatosInputHtml(preg3);
respuestaText=(xmlDoc.getElementsByTagName("answer")[2].innerHTML);


 //NUMBER
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
var preg4=xmlDoc.getElementsByTagName("title")[3].innerHTML;
ponerDatosInputHtml2(preg4);
respuestaNumber=parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);
 
 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var preg5 = xmlDoc.getElementsByTagName("title")[4].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("pregunta5").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("pregunta5").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(preg5,opcionesCheckbox);
 var nres = xmlDoc.getElementById("pregunta5").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("pregunta5").getElementsByTagName("answer")[i].innerHTML;
 }

 //CHECKBOX2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var preg6 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
 var opcionesCheckbox2 = [];
 var nopt = xmlDoc.getElementById("pregunta6").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox2[i]=xmlDoc.getElementById("pregunta6").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml2(preg6,opcionesCheckbox2);
 var nres = xmlDoc.getElementById("pregunta6").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById("pregunta6").getElementsByTagName("answer")[i].innerHTML;
 }


 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var preg7=xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("pregunta7").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("pregunta7").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(preg7,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[6].innerHTML);

//SELECT2
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var preg8=xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var opcionesSelect2 = [];
 var nopt = xmlDoc.getElementById("pregunta8").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect2[i] = xmlDoc.getElementById("pregunta8").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml2(preg8,opcionesSelect2);
 respuestaSelect2=parseInt(xmlDoc.getElementsByTagName("answer")[7].innerHTML);

 //MULTI
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var preg9 = xmlDoc.getElementsByTagName("title")[8].innerHTML;
 var opcionesMulti = [];
 var nopt = xmlDoc.getElementById("pregunta9").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesMulti[i]=xmlDoc.getElementById("pregunta9").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosMultiHtml(preg9,opcionesMulti);
 var nres = xmlDoc.getElementById("pregunta9").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasMulti[i]=xmlDoc.getElementById("pregunta9").getElementsByTagName("answer")[i].innerHTML;
 }

 var preg10 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var opcionesMulti2 = [];
 var nopt = xmlDoc.getElementById("pregunta10").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesMulti2[i]=xmlDoc.getElementById("pregunta10").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosMultiHtml2(preg10,opcionesMulti2);
 var nres = xmlDoc.getElementById("pregunta10").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasMulti2[i]=xmlDoc.getElementById("pregunta10").getElementsByTagName("answer")[i].innerHTML;
 }
 
}




//****************************************************************************************************
//implementación de la corrección

//1
function corregirRadio(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
   var f=formElement;
  var escorrecta = [];
  var correcta=null;
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    correcta = i;     
    
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (correcta==respuestasRadio) {
     nota +=1.0;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 1: "+i+" correcta");    
    } else {
     nota -=1.0;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 1: "+i+" incorrecta");
    }   
   }
  }
}

//2
function corregirRadio2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
   var f=formElement;
  var escorrecta = [];
  var correcta=null;
  for (i = 0; i < f.mil.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.mil[i].checked) {
    correcta = i;     
    
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (correcta==respuestasRadio2) {
     nota +=1.0;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 2: "+i+" correcta");    
    } else {
     nota -=1.0;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 2: "+i+" incorrecta");
    }   
   }
  }
}

//3
function corregirText(){
  var f=document.getElementById("tex").value;     
  if (f==respuestaText) {
   darRespuestaHtml("Pregunta 3: correcta");
   nota +=1;
  } 
  else darRespuestaHtml("Pregunta 3: incorrecta");
}

//4
function corregirNumber(){
  var f=document.getElementById("num").value;     
  if (f==respuestaNumber) {
   darRespuestaHtml("Pregunta 4: correcta");
   nota +=1;
  } 
  else darRespuestaHtml("Pregunta 4: incorrecta");
}

//5
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.grupo.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.grupo[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 5: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 5: "+i+" incorrecta");
    }   
   }
  }
}

//6
function corregirCheckbox2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.cuenca.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.cuenca[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 6: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 6: "+i+" incorrecta");
    }   
   }
  }
}

//7
function corregirSelect(){
   //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = document.getElementById("sel");  
  if (sel.selectedIndex-1==respuestaSelect) {
   darRespuestaHtml("Pregunta 7: "+i+" correcta");
   nota +=1;
  }
  else darRespuestaHtml("Pregunta 7: "+i+" incorrecta");
}

//8
function corregirSelect2(){
   //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel2 = document.getElementById("sel2");  
  if (sel2.selectedIndex-1==respuestaSelect2) {
   darRespuestaHtml("Pregunta 8: "+i+" correcta");
   nota +=1;
  }
  else darRespuestaHtml("Pregunta 8: "+i+" incorrecta");
}

//9
function corregirMulti(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  var opt = document.getElementById("mul").getElementsByTagName("option");
  for (i = 0; i < opt.length; i++) {  
     if (opt[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasMulti.length; j++) {
     if (i==respuestasMulti[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasMulti.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 9: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasMulti.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 9: "+i+" incorrecta");
    }   
   }
  }
}

//10
function corregirMulti2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  var opt = document.getElementById("mul2").getElementsByTagName("option");
  for (i = 0; i < opt.length; i++) {  //"nike" es el nombre asignado a todos los checkbox
   if (opt[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasMulti2.length; j++) {
     if (i==respuestasMulti2[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasMulti2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 10: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasMulti2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 10: "+i+" incorrecta");
    }   
   }
  }
}



//****************************************************************************************************
// poner los datos recibios en el HTML


function ponerDatosRadioHtml(t,opt){
 var radioContainer=document.getElementById('radioDiv');
 document.getElementById('preg1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="radio";
    input.name="color";
    input.id="color_"+i;;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
    radioContainer.appendChild(document.createElement("br"));
 }  
}

function ponerDatosRadioHtml2(t,opt){
 var radioContainer2=document.getElementById('radioDiv2');
 document.getElementById('preg2').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "mil_"+i);
    input.type="radio";
    input.name="mil";
    input.id="mil_"+i;;    
    radioContainer2.appendChild(input);
    radioContainer2.appendChild(label);
    radioContainer2.appendChild(document.createElement("br"));
 }  
}

function ponerDatosInputHtml(t){
 document.getElementById("preg3").innerHTML = t;
}


function ponerDatosInputHtml2(t){
 document.getElementById("preg4").innerHTML = t;
}

function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('preg5').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "grupo_"+i);
    input.type="checkbox";
    input.name="grupo";
    input.id="grupo_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
 }  
}

function ponerDatosCheckboxHtml2(t,opt){
 var checkboxContainer2=document.getElementById('checkboxDiv2');
 document.getElementById('preg6').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "cuenca_"+i);
    input.type="checkbox";
    input.name="cuenca";
    input.id="cuenca_"+i;;    
    checkboxContainer2.appendChild(input);
    checkboxContainer2.appendChild(label);
    checkboxContainer2.appendChild(document.createElement("br"));
 }  
}

function ponerDatosSelectHtml(t,opt){
  document.getElementById("preg7").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosSelectHtml2(t,opt){
  document.getElementById("preg8").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosMultiHtml(t,opt){
  document.getElementById("preg9").innerHTML=t;
  var select = document.getElementsByTagName("select")[2];
  select.multiple = true;
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosMultiHtml2(t,opt){
  document.getElementById("preg10").innerHTML=t;
  var select = document.getElementsByTagName("select")[3];
  select.multiple = true;
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){
   var f=formElement;
   var checked=false;
   var checked2=false;
   var checked3=false;
   var checked4=false;

   for (i = 0; i < f.grupo.length; i++) {  //"colores" es el nombre asignado a todos los radio
      if (f.grupo[i].checked) checked=true;
   }
   for (i = 0; i < f.cuenca.length; i++) {  //"colores" es el nombre asignado a todos los radio
      if (f.cuenca[i].checked) checked2=true;
   }
   for (i = 0; i < f.mil.length; i++) {  //"colores" es el nombre asignado a todos los radio
      if (f.mil[i].checked) checked3=true;
   }
   for (i = 0; i < f.color.length; i++) {  //"colores" es el nombre asignado a todos los radio
      if (f.color[i].checked) checked4=true;
   }

  if (!checked4) {    
    document.getElementById('radioDiv').focus();
    alert("Contesta la pregunta 1");
    return false;
    } 

    if (!checked3) {    
    document.getElementById('radioDiv2').focus();
    alert("Contesta la pregunta 2");
    return false;
   }

  if (document.getElementById('tex').value=="") {
    document.getElementById('tex').focus();
    alert("Contesta la pregunta 3");
    return false;
    } 

   if (document.getElementById('num').value=="") {
    document.getElementById('num').focus();
    alert("Contesta la pregunta 4");
    return false;
    } 
   
    if (!checked) {    
    document.getElementById('checkboxDiv').focus();
    alert("Contesta la pregunta 5");
    return false;
   } 

   if (!checked2) {    
    document.getElementById('checkboxDiv2').focus();
    alert("Contesta la pregunta 6");
    return false;
   } 

   if (document.getElementById('sel').selectedIndex==0) {
    document.getElementById('sel').focus();
    alert("Contesta la pregunta 7");
    return false;
    } 

    if (document.getElementById('sel2').selectedIndex==0) {
    document.getElementById('sel2').focus();
    alert("Contesta la pregunta 8");
    return false;
    } 

    if (document.getElementById('mul').selectedIndex<0) {
    document.getElementById('mul').focus();
    alert("Selecciona al menos una opcion de la pregunta 9");
    return false;
    } 

    if (document.getElementById('mul2').selectedIndex<0) {
    document.getElementById('mul2').focus();
    alert("Selecciona al menos una opcion de la pregunta 10");
    return false;
    } 

   else  return true;


}
