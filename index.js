import { saveTask, deleteTask, editTask} from "./firebase.js"
import { getTasks, onGetTasks, getTask} from "./firebase.js"

const taskContainer = document.getElementById('task-container')
const form = document.getElementById('form')
let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async() =>{

    // const post = await getTask();
    onGetTasks((post)=> {
        let html = ''
        post.forEach(doc => {
            const postData = doc.data();
     
             html += `
             <div class="card card-body mt-2 border-primary">
                 <h3 class="card-title"> ${postData.titulo} </h3>
                 <p> ${postData.descripcion} </p>
                 <div>
                 <button class="btn-delete btn-danger rounded"  data-id="${doc.id}"> Delete </button>
                 <button class="btn-edit btn-warning rounded" data-id="${doc.id}"> Edit </button>
                 </div>
             </div>
             `
        })

       taskContainer.innerHTML = html
       const buttonsDelete =  taskContainer.querySelectorAll('.btn-delete');
       const buttonsEdit =  taskContainer.querySelectorAll('.btn-edit');

        buttonsDelete.forEach( btn => {
            btn.addEventListener('click', ({target: {dataset}})=>{
                id= dataset.id
                deleteTask(id)
            })
        })

        buttonsEdit.forEach( btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data();

                form['title'].value = task.titulo // task.title es lo contiene doc adentro
                form['content'].value = task.descripcion 

                editStatus = true;
                id = e.target.dataset.id;

                if(!editStatus){
                    form['btn-form'].innerText = 'Enviar'
                }else{
                    form['btn-form'].innerText = 'Actualizar'
                }
            })
        })
    })

   
})

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const title = form['title'].value
    const content = form['content'].value

    if(!editStatus){
        saveTask(title,content)
    }else{
        editTask(
            id,
            {
            titulo: title,
            descripcion:content
            }
        )
        editStatus = false;
    }
   
    form.reset()

} )