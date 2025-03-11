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

    const keyupimg: string = "/keyupfr.png";
    const keydownimg: string = "/keydownfr.png";
    const sharpkeyupimg: string = "/sharpkeyup.png"
    const [keyimg, keyimgSet] = useState(keyupimg);
    const [keyimg2, keyimg2Set] = useState(keyupimg);

    const[key1, key1Set] = useState(keyupimg);
    const[key2, key2Set] = useState(keyupimg);
    const[key3, key3Set] = useState(keyupimg);
    const[key4, key4Set] = useState(keyupimg);
    const[key5, key5Set] = useState(keyupimg);
    const[key6, key6Set] = useState(keyupimg);
    const[key7, key7Set] = useState(keyupimg);

    const[key1h, key1hSet] = useState(sharpkeyupimg);
    const[key2h, key2hSet] = useState(sharpkeyupimg);
    const[key4h, key4hSet] = useState(sharpkeyupimg);
    const[key5h, key5hSet] = useState(sharpkeyupimg);
    const[key6h, key6hSet] = useState(sharpkeyupimg);

    //const myaudio = new Audio("file:///C:/Users/victo/Downloads/LegoYodaDead.mp3");
    // const mysound = "/sounds/LegoYodaDead.mp3"
    // const [play] = useSound(mysound)

    const boopSfx = '/sounds/LegoYodaDead.mp3'
    const [playBoop] = useSound(boopSfx, {volume: 0.5});

    const a3 = 'sounds/a3.mp3'
    const b3 = 'sounds/b3.mp3'
    const c3 = 'sounds/c3.mp3'
    const d3 = 'sounds/d3.mp3'
    const e3 = 'sounds/e3.mp3'
    const f3 = 'sounds/f3.mp3'
    const g3 = 'sounds/g3.mp3'

    const a3sharp = 'sounds/a3sharp.mp3'
    const c3sharp = 'sounds/c3sharp.mp3'
    const d3sharp = 'sounds/d3sharp.mp3'
    const f3sharp = 'sounds/f3sharp.mp3'
    const g3sharp = 'sounds/g3sharp.mp3'

    const normalvolume: number = 0.5;

    const [a3sound] = useSound(a3, {volume: normalvolume});
    const [b3sound] = useSound(b3, {volume: normalvolume});
    const [c3sound] = useSound(c3, {volume: normalvolume});
    const [d3sound] = useSound(d3, {volume: normalvolume});
    const [e3sound] = useSound(e3, {volume: normalvolume});
    const [f3sound] = useSound(f3, {volume: normalvolume});
    const [g3sound] = useSound(g3, {volume: normalvolume});

    const sharpvolume: number = 2;

    const [a3sharpsound] = useSound(a3sharp, {volume: sharpvolume});
    const [c3sharpsound] = useSound(c3sharp, {volume: sharpvolume});
    const [d3sharpsound] = useSound(d3sharp, {volume: sharpvolume});
    const [f3sharpsound] = useSound(f3sharp, {volume: sharpvolume});
    const [g3sharpsound] = useSound(g3sharp, {volume: sharpvolume});


    const [a3play, a3playSet] = useState(false);
    const [b3play, b3playSet] = useState(false);
    const [c3play, c3playSet] = useState(false);
    const [d3play, d3playSet] = useState(false);
    const [e3play, e3playSet] = useState(false);
    const [f3play, f3playSet] = useState(false);
    const [g3play, g3playSet] = useState(false);

    const [a3sharpplay, a3sharpplaySet] = useState(false);
    const [c3sharpplay, c3sharpplaySet] = useState(false);
    const [d3sharpplay, d3sharpplaySet] = useState(false);
    const [f3sharpplay, f3sharpplaySet] = useState(false);
    const [g3sharpplay, g3sharpplaySet] = useState(false);

    const [isplaying, setisplaying] = useState(false);
    function downHandler({key}: any)
    {
        // isPressedSet(true);
        // // keyvalSet("true");
        // keyimgSet(keydownimg);
        switch (key)
        {
            case 'q':
            case 'Q':
                key1Set(keydownimg)
                c3playSet(true);
                break;
            case 'w':
            case 'W':
                key2Set(keydownimg)
                d3playSet(true);
                break;
            case 'e':
            case 'E':
                key3Set(keydownimg)
                e3playSet(true);
                break;
            case 'r':
            case 'R':
                key4Set(keydownimg)
                f3playSet(true);
                break;
            case 't':
            case 'T':
                key5Set(keydownimg)
                g3playSet(true);
                break;
            case 'y':
            case 'Y':
                key6Set(keydownimg)
                a3playSet(true);
                break;
            case 'u':
            case 'U':
                key7Set(keydownimg)
                b3playSet(true);
                break;
            case '2':
                key1hSet(keydownimg)
                c3sharpplaySet(true);
                break;
            case '3':
                key2hSet(keydownimg)
                d3sharpplaySet(true);
                break;
            case '5':
                key4hSet(keydownimg)
                f3sharpplaySet(true);
                break;
            case '6':
                key5hSet(keydownimg)
                g3sharpplaySet(true);
                break;
            case '7':
                key6hSet(keydownimg)
                a3sharpplaySet(true);
                break;
        }
    }
    function upHandler({key}: any)
    {
        switch (key)
        {
            case 'q':
            case 'Q':
                key1Set(keyupimg)
                c3playSet(false);
                break;
            case 'w':
            case 'W':
                key2Set(keyupimg)
                d3playSet(false);
                break;
            case 'e':
            case 'E':
                key3Set(keyupimg)
                e3playSet(false);
                break;
            case 'r':
            case 'R':
                key4Set(keyupimg)
                f3playSet(false);
                break;
            case 't':
            case 'T':
                key5Set(keyupimg)
                g3playSet(false);
                break;
            case 'y':
            case 'Y':
                key6Set(keyupimg)
                a3playSet(false);
                break;
            case 'u':
            case 'U':
                key7Set(keyupimg)
                b3playSet(false);
                break;
            case '2':
                key1hSet(sharpkeyupimg)
                c3sharpplaySet(false);
                break;
            case '3':
                key2hSet(sharpkeyupimg)
                d3sharpplaySet(false);
                break;
            case '5':
                key4hSet(sharpkeyupimg)
                f3sharpplaySet(false);
                break;
            case '6':
                key5hSet(sharpkeyupimg)
                g3sharpplaySet(false);
                break;
            case '7':
                key6hSet(sharpkeyupimg)
                a3sharpplaySet(false);
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

    useEffect(() => {
        if (a3play)
        {
            a3sound();
        }
        if (b3play)
        {
            b3sound();
        }
        if (c3play)
        {
            c3sound();
        }
        if (d3play)
        {
            d3sound();
        }
        if (e3play)
        {
            e3sound();
        }
        if (f3play)
        {
            f3sound();
        }
        if (g3play)
        {
            g3sound();
        }
        if (c3sharpplay)
        {
            c3sharpsound();
        }
        if (d3sharpplay)
        {
            d3sharpsound();
        }
        if (f3sharpplay)
        {
            f3sharpsound();
        }
        if (g3sharpplay)
        {
            g3sharpsound();
        }
        if (a3sharpplay)
        {
            a3sharpsound();
        }


    }, [a3play, b3play, c3play, d3play, e3play, f3play, g3play, c3sharpplay, d3sharpplay, f3sharpplay, g3sharpplay, a3sharpplay])

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
    //style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}

    function pianoEvent()
    {
        playBoop();
    }

    return (
        <div className = "flex container" style = {{display:"flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            {/* <button onClick={() => pianoEvent()}>
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
            </p> */}
            <div style = {{display:"flex"}}>
                <Image src = {key1} width = {100} height = {100} alt="key1"/>

                <Image src = {key1h} width = {75} height = {75} alt="key1h" style={{position: "absolute", transform: "translate(83%, 0%)"}}/>

                <Image src = {key2} width = {100} height = {100} alt="key2"/>

                <Image src = {key2h} width = {75} height = {75} alt="key2h" style={{position: "absolute", transform: "translate(217%, 0%)"}}/>

                <Image src = {key3} width = {100} height = {100} alt="key3"/>
                <Image src = {key4} width = {100} height = {100} alt="key4"/>

                <Image src = {key4h} width = {75} height = {75} alt="key4h" style={{position: "absolute", transform: "translate(483%, 0%)"}}/>

                <Image src = {key5} width = {100} height = {100} alt="key5"/>

                <Image src = {key5h} width = {75} height = {75} alt="key5h" style={{position: "absolute", transform: "translate(617%, 0%)"}}/>

                <Image src = {key6} width = {100} height = {100} alt="key6"/>

                <Image src = {key6h} width = {75} height = {75} alt="key6h" style={{position: "absolute", transform: "translate(750%, 0%)"}}/>

                <Image src = {key7} width = {100} height = {100} alt="key7"/>
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