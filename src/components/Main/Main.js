import React, {useState} from 'react';
import "./style.css"

function Main(){
    document.onload = getData();
    const [easyMode, setEasyMode] = useState(0);
    const [hardMode, setHardMode] = useState(0);
    const [normalMode, setNormalMode] = useState(0);

    function getData(){
        fetch('https://demo1030918.mockable.io/')
        .then(response => response.json())
        .then(data => setData(data));
    }

    function setData(data){
        //this function set values from API to State for future manipulating 
        setEasyMode(data.easyMode.field);
        setHardMode(data.hardMode.field);
        setNormalMode(data.normalMode.field);
    }
    
    function drawOnClick(){
        let select = document.querySelector("select");
        let squareZone = document.querySelector(".square-zone");
        squareZone.style.visibility = "visible";

        //this loop for create row of squares field
        for(let row = 0; row < select.value; row++){
            let square = document.createElement("div");
            squareZone.appendChild(square);

            //loop for create squares
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

    function listenerHover(event){
        
        if(event.target.classList.contains("square-item")){
            let row = event.target.value.split("_")[0];
            let col = event.target.value.split("_")[1];
            
            
            let notice = document.createElement("li");
            let textNode = document.createTextNode("row: "+ row + " col: "+col);
            let hoverSquaresList = document.querySelector(".hover-squares ul");
            notice.setAttribute("data-number", `${row}_${col}`);
            notice.appendChild(textNode);
            hoverSquaresList.appendChild(notice);

            //I used  toggle function in if and else   in both cases, because without toggle in else
            // we can't add class "checked" when we hover any square first time
            if (event.target.classList.contains("checked")){
                event.target.classList.toggle("checked");
                let squareValue = event.target.value;

              
                for(let child = 0; child < hoverSquaresList.childNodes.length; child++){
                    let childDataValue =  hoverSquaresList.childNodes[child].getAttribute("data-number");
                    if (squareValue === childDataValue){
                    
                        let deleteObject = hoverSquaresList.childNodes[child];
                        let deleteObjectChild = deleteObject.firstChild;
                        deleteObjectChild.textContent = null;
                        delete deleteObject.childNodes[deleteObjectChild];
                        hoverSquaresList.removeChild(deleteObject);    
                    }
                }
                
            } else{
                event.target.classList.toggle("checked");
                
            }
        }
    }

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