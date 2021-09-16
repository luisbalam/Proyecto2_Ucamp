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
            listaActividadesUI.innerHTML += `<div class="alert alert-primary" role="alert">
            <i class="material-icons float-left mr-3">
                star
              </i>
            <b>${element.actividad}</b> - ${element.estado}
            <span class="float-right">
            <i class="material-icons">
                done
              </i>
              <i class="material-icons">
                delete
              </i>
            </span>
        </div>`
        });
    }       
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


