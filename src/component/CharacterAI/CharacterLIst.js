import './Character.css'
const CharacterList = ({Name,Desc,img,onClick}) => {

    return (
        <div>
            <div className='chatbot-list' onClick={onClick}>
               <div className='character-img'>
                    <img src={img}/>
                    
               </div>
               <div className='character-body'>
                    <h5>{Name}</h5>
                    <p>{Desc}</p>
               </div>
            </div>
        </div>
    )

}

export default CharacterList
