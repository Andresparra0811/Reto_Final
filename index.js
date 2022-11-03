import {save_estudiante,save_clase,get_estudiante,on_get_estudiante, on_get_clase,deleteClase,deleteEstudiante, getEstudiante,getClase,save_matricula,
    on_get_matricula,deleteMatricula,getMatricula,updateEstudiante,updateClase,updateMatricula} from "./firebase.js"

const estudiantesForm= document.getElementById("estudiantes-form")
const estudianteContainer= document.getElementById("estudiante-container")
const clasesContainer= document.getElementById("clase-container")
const matriculasContainer= document.getElementById("matriculas-container")
let editStatus= false;
let id= '';

window.addEventListener("DOMContentLoaded",async() => {
    
    // mostrar estudiantes
    on_get_estudiante((estudiantes) => {
        let html = "";

        estudiantes.forEach(doc => {

            const estudiante= doc.data()
            html += `
                <div>
                    <h3>${estudiante.id_estudiante}</h3>
                    <p>${estudiante.nombre_estudiante}</p>
                    <p>${estudiante.apellidos_estudiante}</p>
                    <button class= 'delete_estudiante' data-id="${doc.id}">Borrar</button>
                    <button class= 'edit_estudiante' data-id="${doc.id}">Editar</button>
                </div>
            `; 
    });

    estudianteContainer.innerHTML= html;
    //borrar estudiante
    const btn_delete_Estudiante= estudianteContainer.querySelectorAll(".delete_estudiante");
    btn_delete_Estudiante.forEach(btn => {
        btn.addEventListener("click",({target:{dataset}}) => {
            deleteEstudiante(dataset.id) 
        })
    })

    // botones editar estudiante
    const btn_edit_Estudiante= estudianteContainer.querySelectorAll(".edit_estudiante");
    btn_edit_Estudiante.forEach(btn => {
        btn.addEventListener("click",async(e) => {
        const doc = await getEstudiante(e.target.dataset.id)
        const estudiante = doc.data()
        estudiantesForm["id-estudiante"].value = estudiante.id_estudiante
        estudiantesForm["apellido-estudiante"].value = estudiante.apellidos_estudiante
        estudiantesForm["nombre-estudiante"].value = estudiante.nombre_estudiante
        editStatus= true
        id= e.target.dataset.id
        estudiantesForm["boton-guardar-estudiante"].innerText="Actualizar"

        });
    })


    //mostrar clases
    on_get_clase((clases) => {
        let html2 = "";

        clases.forEach(doc => {

            const clase= doc.data()
            html2 += `
                <div>
                    <h3>${clase.id_clase}</h3>
                    <p>${clase.titulo}</p>
                    <p>${clase.descripcion}</p>
                    <button class= 'delete_clase' data-id="${doc.id}">Borrar</button>
                    <button class= 'edit_clase' data-id="${doc.id}">Editar</button>
                
                </div>
            `; 
    });
        clasesContainer.innerHTML= html2;
    // borrar clase
        const btn_delete_Clase= clasesContainer.querySelectorAll(".delete_clase");
        btn_delete_Clase.forEach(btn => {
            btn.addEventListener("click",({target:{dataset}}) => {
                deleteClase(dataset.id)
            })
        })
    })

    // editar clase
    const btn_edit_clase= clasesContainer.querySelectorAll(".edit_clase");
    btn_edit_clase.forEach(btn => {
        btn.addEventListener("click",async(e) => {
        const doc = await getClase(e.target.dataset.id)
        const clase = doc.data()
        clasesForm["id-clase"].value = clase.id_clase
        clasesForm["titulo"].value = clase.titulo
        clasesForm["descripcion"].value = clase.descripcion
        editStatus= true
        id= e.target.dataset.id
        clasesForm["boton-guardar-clase"].innerText="Actualizar"

        });
    })

    // mostrar matriculas
    on_get_matricula((matriculas) => {
        let html3 = "";

        matriculas.forEach(doc => {

            const matricula= doc.data()
            html3 += `
                <div>
                    <h3>${matricula.id_matricula}</h3>
                    <p>${matricula.id_estudiante}</p>
                    <p>${matricula.id_clase}</p>
                    <button class= 'delete_matricula' data-id="${doc.id}">Borrar</button>
                    <button class= 'edit_matricula' data-id="${doc.id}">Editar</button>
                </div>
            `; 
    });

    matriculasContainer.innerHTML= html3;
    //borrar Matricula
    const btn_delete_Matricula= matriculasContainer.querySelectorAll(".delete_matricula");
    btn_delete_Matricula.forEach(btn => {
        btn.addEventListener("click",({target:{dataset}}) => {
            deleteMatricula(dataset.id) 
        })
    })

    // botones editar Matricula
    const btn_edit_Matricula= matriculasContainer.querySelectorAll(".edit_matricula");
    btn_edit_Matricula.forEach(btn => {
        btn.addEventListener("click",async(e) => {
        const doc = await getMatricula(e.target.dataset.id)
        const matricula = doc.data()
        matriculasForm["id-matricula"].value = matricula.id_matricula
        matriculasForm["M-id-estudiante"].value = matricula.id_estudiante
        matriculasForm["M-id-clase"].value = matricula.id_clase
        editStatus= true
        id= e.target.dataset.id
        matriculasForm["boton-guardar-Matricula"].innerText="Actualizar"
        

        });
    })

})
})


//editar-añadir Estudiante
estudiantesForm.addEventListener("submit",(e) =>{
    e.preventDefault()
    const id_estudiante= estudiantesForm["id-estudiante"]
    const apellidos_estudiante= estudiantesForm["apellido-estudiante"]
    const nombre_estudiante= estudiantesForm["nombre-estudiante"]

    if(!editStatus){
        save_estudiante(id_estudiante.value,apellidos_estudiante.value,nombre_estudiante.value)
    }
    else{
      
        updateEstudiante(id,{id_estudiante:id_estudiante.value,apellidos_estudiante:apellidos_estudiante.value,nombre_estudiante:nombre_estudiante.value})
        editStatus=false
    }
    estudiantesForm.reset()
    })


const clasesForm= document.getElementById("clases-form")
// editar-añadir clases
clasesForm.addEventListener("submit",(e) =>{
    e.preventDefault()
    const id_clase= clasesForm["id-clase"]
    const titulo= clasesForm["titulo"]
    const descripcion= clasesForm["descripcion"]
    
    if(!editStatus){
        save_clase(id_clase.value,titulo.value,descripcion.value)
    }
    else{
      
        updateClase(id,{id_clase:id_clase.value,titulo:titulo.value,descripcion:descripcion.value})
        editStatus=false
    }

    clasesForm.reset();
})

const matriculasForm= document.getElementById("matriculas-form")
// editar y añadir matriculas
matriculasForm.addEventListener("submit",(e) =>{
    e.preventDefault()
    const id_matricula= matriculasForm["id-matricula"]
    const m_id_estudiante= matriculasForm["M-id-estudiante"]
    const m_id_clase= matriculasForm["M-id-clase"]
    
    if(!editStatus){
        save_matricula(id_matricula.value,m_id_estudiante.value,m_id_clase.value)
    }
    else{
      
        updateMatricula(id,{id_matricula:id_matricula.value,id_estudiante:m_id_estudiante.value,id_clase:m_id_clase.value})
        editStatus=false
    }
    
    matriculasForm.reset();
})


})
