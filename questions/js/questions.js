var formElement=null;
var respuestaNumber=null;
var respuestaSelect=null;
var respuestasCheckbox = [];
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   corregirNumber();
   corregirSelect();
   corregirCheckbox();
   presentarNota();   
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/questions.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //NUMBER
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var pregunta4=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 ponerDatosInputHtml(pregunta4);
 respuestaNumber=parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);

 // document.getElementsByTagName('h3')[3].innerHTML=
//xmlDoc.getElementsByTagName('title')[3].innerHTML;
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 /*var tituloSelect=xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jklm_007").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("jklm_007").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[6].innerHTML);*/

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 /*var tituloCheckbox = xmlDoc.getElementsByTagName("title")[4].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("jklm_005").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("jklm_005").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById("jklm_005").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("jklm_005").getElementsByTagName("answer")[i].innerHTML;
 }
}*/

//****************************************************************************************************
//implementación de la corrección
function corregirNumber(){
  var s=formElement.elements[3].value;     
  if (s==respuestaNumber) {
   darRespuestaHtml("P1: Correcto!");
   nota +=1;
  } 
  else { 
    darRespuestaHtml("P1: Incorrecto");    
  }
}

/*function corregirSelect(){
  var sel = formElement.elements[6];  
  if (sel.selectedIndex==respuestaSelect) {
   darRespuestaHtml("P2: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P2: Incorrecto");
}*/

/*function corregirCheckbox(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.color.length; i++) {   
   if (f.color[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   }
  }
}*/

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("pregunta4").innerHTML = t;
}

/*function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}*/

/*function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}*/

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 3");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}
