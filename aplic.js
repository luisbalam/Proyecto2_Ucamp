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
    localStorage.setItem('tareas', JSON.stringify(arrayActividades));
    PintarDB();
}

const PintarDB = () => {
    listaActividadesUI.innerHTML ='';
    arrayActividades = JSON.parse(localStorage.getItem('tareas'));
    if(arrayActividades === null){
        arrayActividades = [];
    }
    else
    {
        arrayActividades.forEach(element => {
            listaActividadesUI.innerHTML += `<div class="alert alert-primary" role="alert"> <i class="material-icons float-left mr-3">star</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
        });
    }       
}

const eliminarTarea = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if(elemento.actividad === 'actividad'){
            indexArray = index ;
        }
    });
    arrayActividades.splice(indexArray, 1);
    GuardarDB();
}

const editarTarea = (actividad) => {
    let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);
    console.log(arrayActividades[indexArray]);
    arrayActividades[indexArray].estado = true;
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

document.addEventListener('DOMContentLoad', PintarDB());

listaActividadesUI.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
        if (e.target.innerHTML === 'delete'){
             eliminarTarea(e.path[2].childNodes[2].innerHTML);
        }
        if (e.target.innerHTML === 'done'){
            editarTarea();
        }
    }
});

 
