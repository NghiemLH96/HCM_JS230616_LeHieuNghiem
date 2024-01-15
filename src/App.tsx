import { useEffect, useState } from 'react'
import './app.scss'

function App() {
  interface user{
    id:number,
    name:string,
    point:number
  }
  const [ users , setUsers ] = useState<user | []>([])

  useEffect(()=>{
    const usersList =():user | [] =>{
      const users = localStorage.getItem("userList");
      return users ? JSON.parse(users) as user : []
    }
    setUsers(usersList())
  },[])

  const handleAdd = (e:React.SyntheticEvent) => {
    e.preventDefault();
    let newPlayer:user ={
      id:Math.random()*Date.now(),
      name:(e.target as any).playerName.value,
      point:0
    };
    
    
    
  }
  return (
    <div className="scoreApp_page">
      <div className="scoreApp_container">
        <div className='board_header'>
          <div className='board_summary'>
            <p>Player: <span>123</span></p>
            <p>Total Point: <span>123</span></p>
          </div>
          <div className='board_title'>
            <h1>Bảng điểm</h1>
          </div>
        </div>
        <div className='board_body'>
          <ul className='playerCard'>
            <li className='icon_field'>
              <span className="material-symbols-outlined crossIcon">
                close
              </span>
            </li>
            <li className='icon_field'>
              <span className="material-symbols-outlined starIcon">
                star
              </span>
            </li>
            <li className='playerName_field'>
              <span>Le Hieu Nghiem</span>
            </li>
            <li className='point_field'>
              <span className='decreaseBtn'>-</span>
              <span className='pointRender'>10</span>
              <span className='increaseBtn'>+</span>
            </li>
          </ul>
        </div>
        <form onSubmit={(e:React.SyntheticEvent)=>{handleAdd(e)}} className='board_footer'>
          <div className='footer_left'>
            <input name='playerName' type="text" className='newNameInput'/>
          </div>
          <div className='footer_right'>
            <button type="submit" className='addNewBtn'>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
