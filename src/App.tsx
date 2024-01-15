import { useEffect, useState } from 'react'
import './app.scss'

function App() {
  interface user{
    id:number,
    name:string,
    point:number,
    star:Boolean
  }
  const [ users , setUsers ] = useState<user[]>(JSON.parse(localStorage.getItem("userList") as string) || [])
  const [ maxPoint , setMaxPoint ] = useState(0)
  useEffect(()=>{
    let maxPoint = 0
    users.map(player => {
      if(player.point > maxPoint){
        maxPoint = player.point
      }
    })
    setMaxPoint(maxPoint)
  },[users])
  
  const handleAdd = (e:React.SyntheticEvent) => {
    e.preventDefault();
    let newPlayer:user ={
      id:Math.random()*Date.now(),
      name:(e.target as any).playerName.value,
      point:0,
      star:false
    };
    const playerList:user[]= [...users]
    playerList.push(newPlayer)
    setUsers(playerList)
    localStorage.setItem("userList",JSON.stringify(playerList as user[]));
    (e.target as any).playerName.value = ""
  }

  const handleDelete = (userId:number) => {
    if(confirm("Chắc muốn xoá người chơi chứ?")){
      const playerList:user[]= [...users]
      const newPlayerList = playerList.filter(player => player.id != userId)
      setUsers(newPlayerList)
      localStorage.setItem("userList",JSON.stringify(newPlayerList as user[]));
      if (newPlayerList.length == 0) {
        alert("Đã hết người chơi")
      }
    }
  }

  const adjustPoint = (userId:number , type:string) => {
    const playerList:user[]= [...users]
    if (type=="+") {
      playerList.map(player => {
        if (player.id == userId) {
          player.point++
        }
      })
      setUsers(playerList)
      localStorage.setItem("userList",JSON.stringify(playerList as user[]));
    }
    if (type=="-") {
      playerList.map(player => {
        if (player.id == userId) {
          if (player.point >= 1) {
            player.point--
          }else{
            player.point = 0
          }
        }
      })
      setUsers(playerList)
      localStorage.setItem("userList",JSON.stringify(playerList as user[]));
    }
  }

  return (
    <div className="scoreApp_page">
      <div className="scoreApp_container">
        <div className='board_header'>
          <div className='board_summary'>
            <p>Player: <span>{users.length}</span></p>
            <p>Total Point: <span>{users.reduce((acc,current)=>acc+current.point,0)}</span></p>
          </div>
          <div className='board_title'>
            <h1>Bảng điểm</h1>
          </div>
        </div>
        <div className='board_body'>
          {users.length == 0 ? <div className='emptyText'>Tạm thời vẫn chưa có người chơi</div> : users.map(player =>(
            <ul key={player.id} className='playerCard'>
            <li className='icon_field'>
              <span className="material-symbols-outlined crossIcon" onClick={()=>{handleDelete(player.id)}}>
                close
              </span>
            </li>
            <li className='icon_field'>
              <span style={{color: player.point == maxPoint? "rgb(252, 238, 111)" : "black"}} className="material-symbols-outlined starIcon">
                star
              </span>
            </li>
            <li className='playerName_field'>
              <span>{player.name}</span>
            </li>
            <li className='point_field'>
              <span className='decreaseBtn' onClick={()=>{adjustPoint(player.id , "-")}}>-</span>
              <span className='pointRender'>{player.point}</span>
              <span className='increaseBtn' onClick={()=>{adjustPoint(player.id , "+")}}>+</span>
            </li>
          </ul>
          ))
        }
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
