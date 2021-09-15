//variables globales

const formularioUI=document.querySelector('#formulario'); //la diferencia es que lleva el # en el id
const listaActividadesUI=document.getElementById('listaActividades');
let arrayActividades=[]



//funciones
const CrearItem= (actividad) => {
    let item={
        actividad: actividad,
        estado: false
    }
    arrayActividades.push(item);
    return item
}

const GuardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades)); //?????
}
//CrearItem('correr'); 
//CrearItem('nadar');
//console.log(arrayActividades);

//eventListener
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault(); //para que no se refresque el sitio web
    let actividadUI = document.querySelector('#actividad').value;

    CrearItem(actividadUI);
    GuardarDB();
    formularioUI.reset();
});



