import React ,{useEffect, useState} from 'react'
import './todolist.style.css'

function Todolist_component() {

    const [state,setstate]=useState('')
    const [id,setid]=useState('')


// get the data from localStorage
    const localStorageget=()=>{
        const gets= localStorage.getItem("todolist")
        if(gets){
         return JSON.parse(gets)
        }else{
         return []
        }
     }
    const [storeData,setstoreData]=useState(localStorageget())

  
   
    const add=()=>{
    
        if(!state){
            alert('oops')
            
        }else if(id){
          setstoreData(
            storeData.map((obj)=>{
                if(obj.id==id){
                    return {
                        ...obj,name:state,
                    }
                }
                return obj
            })
          )
          setid('')
        }
        else{
            const fun={
                id:new Date().getTime().toString(),
                name:state
            }

            setstoreData([  fun, ...storeData])
            setstate('')
        }
    }

    const remove=(data)=>{
       const update=storeData.filter((obj)=>{
        return obj.id !==data.id
       })
       setstoreData([...update])
        
    }

    // store the data in localStorage
    useEffect(()=>{
        localStorage.setItem("todolist",JSON.stringify(storeData))
    },[storeData])
   


const edit=(data)=>{
  setstate (data.name)
  setid(data.id)
}


  return (
   <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img className='todolisticon' src='./images/imageicon.webp' alt='todoicon'></img>
                <figcaption className='text'>Add your List Here ✌️</figcaption>
            </figure>
            <input type='text' value={state} onChange={(e)=>setstate(e.target.value)} placeholder='✍️ Add Item...'></input>
            <i className="fa fa-plus" onClick={add}></i> 

           
                {nnn.map((obj)=>{
                    return(
                    <div className='parent'>
                     <div key={obj.id} className='parnttochild'>
                    <div className='kush'>{obj.name}❤️</div>
                     <div className='icon'>
                     <i className='far fa-edit' onClick={()=>edit(obj)}></i>
                  <i className="far fa-trash-alt add-btn" onClick={()=>remove(obj)} ></i> 
                     </div>
                 </div>
                 </div>
                    )
                })}
            <div className='button-div'>
             <button className='button' onClick={()=>setstoreData([])}><span>Cheakist</span></button>
           </div>        
        </div>
    </div>
   </>
  )
}

export default Todolist_component


