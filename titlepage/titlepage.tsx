"use client"
//"use server"
//import { signIn } from "next-auth/react";
import Image from "next/image";
import {useEffect, useState} from "react";
import useSound from 'use-sound';
//import boopSfx from 'public/sounds/LegoYodaDead.mp3';
//import { usePersistantState } from '.';
//import {mysound} from "C:/Users/victo/jsmusic/public/sounds/LegoYodaDead.mp3"
//import megasound from "../../sounds/LegoYodaDead.mp3"


export default function Titlepage()
{
    // async function getData()
    // {
    //     const response = await fetch("/api/events", {method: "GET"});
    //     if (response.ok)
    //     {
    //         const {events} = await response.json()

    //         console.table(events);
    //     }
    // }
    // const [a, setA] = useState(0);
    // const [b, setB] = useState(0);
    // const [r, setR] = useState(0);

    // async function calculate()
    // {
    //     const response = await fetch(`/api/events?a=${a}&b=${b}`, {method: "GET", headers: {Authorization: "skibiditoilet"}})
    //     if (response.ok)
    //     {
    //         const data = await response.json();
    //         setR(data.result);
    //     }
    // }



    let myimage = "/trunksimg.png";
    const [myval, myvalSet] = useState(0);
    const [counter, counterSet] = useState(0);
    function clicktrunks()
    {
        if (counter % 2 == 0)
        {
            myvalSet(69);
        }
        else
        {
            myvalSet(420);
        }
        counterSet(counter + 1);
    }

    //start of keyboard
    const [keyval, keyvalSet] = useState("hello");
    const [isPressed, isPressedSet] = useState(false);

    const keyupimg: string = "/keyup.png";
    const keydownimg: string = "/keydown.png";
    const [keyimg, keyimgSet] = useState(keyupimg);
    const [keyimg2, keyimg2Set] = useState(keyupimg);

    //const myaudio = new Audio("file:///C:/Users/victo/Downloads/LegoYodaDead.mp3");
    // const mysound = "/sounds/LegoYodaDead.mp3"
    // const [play] = useSound(mysound)

    const boopSfx = '/sounds/LegoYodaDead.mp3'
    const [playBoop] = useSound(boopSfx, {volume: 0.5});

    const [isplaying, setisplaying] = useState(false);
    function downHandler({key}: any)
    {
        // isPressedSet(true);
        // // keyvalSet("true");
        // keyimgSet(keydownimg);
        switch (key)
        {
            case '1':
                //clicktrunks()
                keyimgSet(keydownimg);
                //{() => play}
                setisplaying(true)
                break;
            case '2':
                keyimg2Set(keydownimg);
                //{() => playBoop}
                setisplaying(true)
                break;
        }
    }
    function upHandler({key}: any)
    {
        // isPressedSet(false);
        // // keyvalSet("false");
        // keyimgSet(keyupimg);
        switch (key)
        {
            case '1':
                keyimgSet(keyupimg);
                setisplaying(false);
                break;
            case '2':
                keyimg2Set(keyupimg);
                setisplaying(false);
                break;
        }
    }


    useEffect(() => {
        //const keyDownHandler = (e: { code: any; }) => keyvalSet(`You pressed ${e.code}`);
        //document.addEventListener("keydown", keyDownHandler);
        //keyimgSet("/keydown.png");
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
            //document.removeEventListener("keydown", keyDownHandler);
            //keyimgSet("/keyup.png");
        }
    }, []);

    //use effect checks if whatever variable inside the square brackets changes. if it does, do the thing inside
    useEffect(() => {
        if (isplaying)
        {
            playBoop();
        }
    }, [isplaying]);

    // useEffect(() => {
    //     if (isPressed)
    //     {
    //         console.log("hello");
    //         keyimgSet(keydownimg);
    //         keyvalSet("true");
    //     }
    //     else
    //     {
    //         console.log("goodbye");
    //         keyimgSet(keyupimg);
    //         keyvalSet("false");
    //     }
    // }, []);

    // const imageStyle = {
    //     borderRadius: '50%',
    //     border: '1px solid #fff',
    //   }

    function pianoEvent()
    {
        playBoop();
    }

    return (
        <div className = "flex container">
            <button onClick={() => pianoEvent()}>
                <Image src={myimage} width={500} height={500} alt="thedrink"/>
            </button>
            <p>
                I HATE EVERYTHING ABOUT YOU 
            </p>
            <p>
                WHY DO I LOVE YOU
            </p>
            <p>
                {myval}
            </p>
            <p>
                {keyval}
            </p>
            <div style = {{display:"flex", gap:"10px"}}>
                <Image src = {keyimg} width = {500} height = {500} alt="key1"/>
                <Image src = {keyimg2} width = {500} height = {500} alt="key2"/>
            </div>

            {/* <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
                >
                    <button type="submit">Signin with Google</button>
            </form> */}

            {/* <div >
                <p>
                    A: 
                </p>
                <input value={a.toString()} onChange={e => setA(Number.parseInt(e.target.value || "0"))} className = "p-2 rounded shadow text-black"/>
                <p>
                    B: 
                </p>
                <input value={b.toString()} onChange={e => setB(Number.parseInt(e.target.value || "0"))}/>
                <button onClick = {() => getData()}>
                    Calculate
                </button>
                <p>
                    {r}
                </p>
            </div> */}

        </div>
    );
}