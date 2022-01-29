import React, {useState} from 'react';
import "./style.css"

function Main(){
    const [easyMode, setEasyMode] = useState(0);
    const [hardMode, setHardMode] = useState(0);
    const [normalMode, setNormalMode] = useState(0);

    function getData(){
        fetch('https://demo1030918.mockable.io/')
        .then(response => response.json())
        .then(data => setData(data));
    }

    function setData(data){
        // console.log(JSON.parse(data));
        setEasyMode(data.easyMode.field);
        setHardMode(data.hardMode.field);
        setNormalMode(data.normalMode.field);
    }
    
    function drawOnClick(){
        let select = document.querySelector("select");
        let squareZone = document.querySelector(".square-zone");

        for(let row = 0; row < select.value; row++){
                        
            console.log("row is: " + row);
            let square = document.createElement("div");
            squareZone.appendChild(square);

            for(let col=0; col < select.value; col++){
                let square = document.createElement("div");
                square.className = 'square-item';
                let setRow = row+1;
                let setCol = col+1;
                square.value = setRow + "_" + setCol;
                squareZone.appendChild(square);
                            
            }
        }
    }

    function listenerHover(e){
        
        if(e.target.classList.contains("square-item") ){
            let row = e.target.value.split("_")[0];
            let col = e.target.value.split("_")[1];
            
            // console.log("constains: " +e.target.classList.contains("checked") );
            if (e.target.classList.contains("checked")){
                e.target.classList.toggle("checked");
                
            } else{
                e.target.classList.toggle("checked");
                console.log("else work");
            }
            let notice = document.createElement("li");
            notice.className = "";
            let textNode = document.createTextNode("row: "+ row + " col: "+col);
            notice.appendChild(textNode);
            document.querySelector(".hover-squares ul").appendChild(notice);
            // e.target.classList.add("checked");
            console.log(e.target);
        }
        
    }


    getData();
    return(
        <div>
            <div className='using-path'>
                <div className='select-path'>
                    
                    <select>
                        <option>Pick mode</option>
                        <option value={easyMode}>Easy mode</option>
                        <option value={hardMode}>Hard mode</option>
                        <option value={normalMode}>Normal mode</option>
                    </select>
                    <button className='select-button' onClick={drawOnClick}>Start</button>
                
                </div>

                <div className='square-zone' onMouseOver={listenerHover} ></div>

            </div>
            <div className='hover-squares'>
                <h2>Hover squares</h2>
                <ul>
                    
                </ul> 
            </div>
        </div>
        
    )
    
}

export default Main;