import React from "react";
import Die from "./Die";
import Confetti from 'react-confetti'

export default function Tenzie() {

    const [Dice , settDice] = React.useState(allNewDice());
    const [tenzies , setTenzies] = React.useState(false)

    React.useEffect(function(){
        let allHeld = Dice.every(element => element.isHeld === true);
        let First_Value = Dice[0].value;

        let allDiceIsHeld = Dice.every(element => element.value === First_Value);

        if(allHeld && allDiceIsHeld){
            setTenzies(true);
            console.log("You have won the game");
        }

    }, [Dice])

    function generateNewDie(i){
        return {
            value : Math.ceil(Math.random()*6),
            isHeld: false,
            id : i
        }
    }

    function allNewDice(){
        const arr = [];
        for(let i = 0; i < 10; i++){
            arr.push({ value : Math.ceil(Math.random()*6) , isHeld : false , id : i})
        }
        return arr
    }

    function rollDice(){
        if(tenzies){
            settDice(allNewDice())
            setTenzies(false)
        }
        settDice(oldDice => oldDice.map(element => {
            return element.isHeld ? element : generateNewDie(element.id)
        }))
    }

    function holdDice(id){
        settDice(oldDice => 
            oldDice.map(die => {
                return die.id === id ? 
                    {...die , isHeld : !die.isHeld} : die
            }))
    }

    const DieElements = Dice.map((element) => {
       return <Die 
       value = {element.value} 
       key = {element.id} 
       isHeld = {element.isHeld}
       holdDice = { () => holdDice(element.id)} 
       />
    })

    // if(tenzies){
    //     alert("You have Won the game")
    // }
    

    return (
        <>
        {tenzies ? <Confetti/> : null}
        <div className="dice--Main">
            <div className="above--section">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="dice--container">
                {DieElements}
            </div>
            <button className= "Roll--Dice" onClick={rollDice}> {tenzies ? "New Game" : "Roll"} </button>
        </div>
        </>
    )
}