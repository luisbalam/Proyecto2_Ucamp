//variables globales

const formularioUI=document.querySelector('#formulario'); //la diferencia es que lleva el # en el id
const listaActividadesUI=document.getElementById('listaActividades');
let arrayActividades=[]




//funciones  funciones    funciones    funciones

//Esta función crea cada una de las tareas o actividades, añadiéndolas al arreglo con push
const CrearItem= (actividad) => {
    let item={
        actividad: actividad,
        estado: 'Pendiente'
    }
    arrayActividades.push(item);
    return item
}

//graba en el localstorage con el identificar tareas los items del arreglo de actividades (formato JSON)
const GuardarDB = () => {
    localStorage.setItem('tareas', JSON.stringify(arrayActividades));
    PintarDB(); //llama al método con este nombre
}

//esta función
const PintarDB = () => {
    listaActividadesUI.innerHTML =''; // deja vacía la lista de tareas que aparecen en el html
    arrayActividades = JSON.parse(localStorage.getItem('tareas')); //el contenido del localstorage con el identifi tareas  se almacena en el arreglo.
    if(arrayActividades === null){ //si el localstorage estuviera vacío
        arrayActividades = []; //el array de actividades queda vacío también.
    }
    else // pero si no no esta vacío el contenido del localstorage
    {
        arrayActividades.forEach(element => { //recorre el arreglo y escribe en el HTML el contenido (aparecen las tareas en el sitio)
            listaActividadesUI.innerHTML += `<div class="alert alert-primary" role="alert"> <i class="material-icons float-left mr-3">star</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
        });
    }       
}

//se llama al hacer click en el bote de basura de cada tarea.
const eliminarTarea = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => { //recorre el arreglo hasta que encuentre la coincidencia del elemento al que se le hizo click
        if(elemento.actividad === 'actividad'){
            indexArray = index ; //toma el index del elemento a eliminar
        }
    });
    arrayActividades.splice(indexArray, 1); //usa el index del elemento a eliminar y lo elimina del arreglo
    GuardarDB(); //actualiza el contenido del localstorage
}

//esta función cambia el estado de la actividad a realizada
const editarTarea = (actividad) => {
    let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);
    //console.log(arrayActividades[indexArray]);
    arrayActividades[indexArray].estado = 'Concluida';
    GuardarDB();
}

//CrearItem('correr'); 
//CrearItem('nadar');
//console.log(arrayActividades);






//eventListener
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault(); //para que no se refresque el sitio web o se ejecuten otras cosas diferentes a lo que quiero
    let actividadUI = document.querySelector('#actividad').value;

    CrearItem(actividadUI);
    GuardarDB();
    formularioUI.reset();
});

document.addEventListener('DOMContentLoad', PintarDB());

listaActividadesUI.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
        if (e.target.innerHTML === 'delete'){
             eliminarTarea(e.path[2].childNodes[2].innerHTML);
        }
        if (e.target.innerHTML === 'done'){
            editarTarea(e.path[2].childNodes[2].innerHTML);
        }
    }
});

 
