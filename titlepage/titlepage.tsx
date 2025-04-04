"use client"
import Image from "next/image";
import {useEffect, useState, useRef} from "react";
import useSound from 'use-sound';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { saveAs } from "file-saver";




const ffmpeg = createFFmpeg({ log: true });
export default function Titlepage()
{
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const audioChunksRef = useRef<BlobPart[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);

    // ✅ Load FFmpeg once when component mounts
    useEffect(() => {
        const loadFFmpeg = async () => {
        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }
        };
        loadFFmpeg();
    }, []);

  // ✅ Request microphone access and initialize MediaRecorder
  useEffect(() => {
    audioContextRef.current = new AudioContext();
    destinationRef.current = audioContextRef.current.createMediaStreamDestination();

    // ✅ Use MediaRecorder on the new destination stream
    const recorder = new MediaRecorder(destinationRef.current.stream, { mimeType: "audio/webm" });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    setMediaRecorder(recorder);
  }, []);

  // ✅ Start recording
  const startRecording = () => {
    if (mediaRecorder) {
      audioChunksRef.current = [];
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  // ✅ Stop recording and play WebM file
  const stopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);

      setTimeout(async () => {
        console.log("Recording stopped. Converting to MP3...");
        const webmBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(webmBlob);

        const mp3Blob = await convertToMp3(webmBlob);
        console.log("MP3 file size:", mp3Blob.size);
        if (mp3Blob.size === 0) {
            console.error("MP3 conversion failed, file is empty.");
            return;
        }

        saveAs(mp3Blob, "recording.mp3")
      }, 500); // Small delay to allow MediaRecorder to finalize data
    }
  };

  // ✅ Convert WebM to MP3
  const convertToMp3 = async  (audioBlob: Blob): Promise<Blob> => {
    if (!ffmpeg.isLoaded()) {
        console.log("Loading FFmpeg...");
        await ffmpeg.load();
        console.log("FFmpeg Loaded!");
      }
  
    const inputFileName = "input.webm";
    const outputFileName = "output.mp3";
  
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
  
    await ffmpeg.FS("writeFile", inputFileName, await fetchFile(audioBlob));
    console.log("File written to FFmpeg:", inputFileName);

    ffmpeg.setLogger(({ type, message }) => {
        console.log(`[FFmpeg ${type}]: ${message}`);
      });
      await ffmpeg.run("-i", inputFileName, "-acodec", "libmp3lame", "-b:a", "240k", "-ac", "2", "-ar", "44100", outputFileName);
    console.log("FFmpeg conversion complete!");
  
  try {
    const data = ffmpeg.FS("readFile", outputFileName);
    console.log("MP3 file successfully generated:", outputFileName);
    return new Blob([data], { type: "audio/mp3" });
  } catch (err) {
    console.error("FFmpeg output error:", err);
    throw new Error("MP3 conversion failed. Check browser compatibility.");
  }
  };

    const recordDef: string = '/record_def.png'
    const recordStream: string = '/record_stream.png'
    const recordDone: string = '/record_done.png'

    const [recordButton, recordButtonSet] = useState(recordDef)
    const [recordState, recordStateSet] = useState(0)

    function record()
    {
        recordStateSet(recordState + 1)
        if (recordState == 2)
        {
            recordStateSet(0)
        }
    }

    useEffect(() => {
        switch (recordState)
        {
            case 0:
                recordButtonSet(recordDef)
                //convertToMp3()
                break;
            case 1:
                recordButtonSet(recordStream)
                startRecording();
                break;
            case 2:
                recordButtonSet(recordDone)
                stopRecording()
                break;
        }
    }, [recordState])

    //start of keyboard

    const keyupimg: string = "/keyupfr.png";
    const keydownimg: string = "/keydownfr.png";
    const sharpkeyupimg: string = "/sharpkeyup.png"

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


    const boopSfx = '/sounds/LegoYodaDead.mp3'
    const [playBoop] = useSound(boopSfx, {volume: 0.5});

    const a3 = 'sounds/oct3/a3.mp3'
    const b3 = 'sounds/oct3/b3.mp3'
    const c3 = 'sounds/oct3/c3.mp3'
    const d3 = 'sounds/oct3/d3.mp3'
    const e3 = 'sounds/oct3/e3.mp3'
    const f3 = 'sounds/oct3/f3.mp3'
    const g3 = 'sounds/oct3/g3.mp3'
    const a3sharp = 'sounds/oct3/a3sharp.mp3'
    const c3sharp = 'sounds/oct3/c3sharp.mp3'
    const d3sharp = 'sounds/oct3/d3sharp.mp3'
    const f3sharp = 'sounds/oct3/f3sharp.mp3'
    const g3sharp = 'sounds/oct3/g3sharp.mp3'

    const fun1 = 'sounds/funky/bone.mp3'
    const fun2 = 'sounds/funky/estoesparagohan.mp3'
    const fun3 = 'sounds/funky/fart.mp3'
    const fun4 = 'sounds/funky/fortnite.mp3'
    const fun5 = 'sounds/funky/laugh.mp3'
    const fun6 = 'sounds/funky/LegoYodaDead.mp3'
    const fun7 = 'sounds/funky/metalpipe.mp3'
    const fun8 = 'sounds/funky/prowler.mp3'
    const fun9 = 'sounds/funky/table.mp3'
    const funa = 'sounds/funky/vineboom.mp3'
    const funb = 'sounds/funky/yippie.mp3'
    const func = 'sounds/funky/nerd.mp3'

    const a4 = 'sounds/oct4/a4.mp3'
    const b4 = 'sounds/oct4/b4.mp3'
    const c4 = 'sounds/oct4/c4.mp3'
    const d4 = 'sounds/oct4/d4.mp3'
    const e4 = 'sounds/oct4/e4.mp3'
    const f4 = 'sounds/oct4/f4.mp3'
    const g4 = 'sounds/oct4/g4.mp3'
    const a4sharp = 'sounds/oct4/a4sharp.mp3'
    const c4sharp = 'sounds/oct4/c4sharp.mp3'
    const d4sharp = 'sounds/oct4/d4sharp.mp3'
    const f4sharp = 'sounds/oct4/f4sharp.mp3'
    const g4sharp = 'sounds/oct4/g4sharp.mp3'

    const [a, aSet] = useState(a3)
    const [b, bSet] = useState(b3)
    const [c, cSet] = useState(c3)
    const [d, dSet] = useState(d3)
    const [e, eSet] = useState(e3)
    const [f, fSet] = useState(f3)
    const [g, gSet] = useState(g3)
    const [ash, ashSet] = useState(a3sharp)
    const [csh, cshSet] = useState(c3sharp)
    const [dsh, dshSet] = useState(d3sharp)
    const [fsh, fshSet] = useState(f3sharp)
    const [gsh, gshSet] = useState(g3sharp)

    const normalvolume: number = 0.5;


    const [a3sound] = useSound(a, {volume: normalvolume});
    const [b3sound] = useSound(b, {volume: normalvolume});
    const [c3sound] = useSound(c, {volume: normalvolume});
    const [d3sound] = useSound(d, {volume: normalvolume});
    const [e3sound] = useSound(e, {volume: normalvolume});
    const [f3sound] = useSound(f, {volume: normalvolume});
    const [g3sound] = useSound(g, {volume: normalvolume});

    const sharpvolume: number = 2;

    const [a3sharpsound] = useSound(ash, {volume: sharpvolume});
    const [c3sharpsound] = useSound(csh, {volume: sharpvolume});
    const [d3sharpsound] = useSound(dsh, {volume: sharpvolume});
    const [f3sharpsound] = useSound(fsh, {volume: sharpvolume});
    const [g3sharpsound] = useSound(gsh, {volume: sharpvolume});


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

    let numModes = 2;

    const [pianoshift, pianoshiftSet] = useState(0);

    const nextoct = "/nextoct.png"
    const prevoct = "/prevoct.png"
    const funkyon = "/funkyon.png"
    const funkyoff = "/funkyoff.png"

    function incOct()
    {
        pianoshiftSet((pianoshift + 1) % numModes)
    }
    function decOct()
    {
        pianoshiftSet(pianoshift - 1)
    }

    const [funkymode, funkymodeSet] = useState(false);
    const [funkyimage, funkyimageSet] = useState(funkyoff)

    function changefunky()
    {
        funkymodeSet(!funkymode)
    }

    useEffect(() => {
        funkyimageSet(funkyoff)
        funkymodeSet(false)
        if (pianoshift < 0)
        {
            pianoshiftSet(numModes - 1);
        }
        switch (pianoshift)
        {
            case 0:
                aSet(a3)
                bSet(b3)
                cSet(c3)
                dSet(d3)
                eSet(e3)
                fSet(f3)
                gSet(g3)
                ashSet(a3sharp)
                cshSet(c3sharp)
                dshSet(d3sharp)
                fshSet(f3sharp)
                gshSet(g3sharp)
                break;
            case 1:
                aSet(a4)
                bSet(b4)
                cSet(c4)
                dSet(d4)
                eSet(e4)
                fSet(f4)
                gSet(g4)
                ashSet(a4sharp)
                cshSet(c4sharp)
                dshSet(d4sharp)
                fshSet(f4sharp)
                gshSet(g4sharp)
                break;
        }
    }, [pianoshift])

    useEffect(() => {
        if (funkymode)
        {
            funkyimageSet(funkyon)
            aSet(fun1)
            bSet(fun2)
            cSet(fun3)
            dSet(fun4)
            eSet(fun5)
            fSet(fun6)
            gSet(fun7)
            ashSet(fun8)
            cshSet(fun9)
            dshSet(funa)
            fshSet(funb)
            gshSet(func)
        }
        else
        {
            funkyimageSet(funkyoff)
            pianoshiftSet(0);
            aSet(a3)
            bSet(b3)
            cSet(c3)
            dSet(d3)
            eSet(e3)
            fSet(f3)
            gSet(g3)
            ashSet(a3sharp)
            cshSet(c3sharp)
            dshSet(d3sharp)
            fshSet(f3sharp)
            gshSet(g3sharp)
        }
    }, [funkymode])

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
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
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
        if (a3play && audioContextRef.current && destinationRef.current)
        {
            a3sound();
            const audioElement = new Audio(a);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (b3play && audioContextRef.current && destinationRef.current)
        {
            b3sound();
            const audioElement = new Audio(b);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (c3play && audioContextRef.current && destinationRef.current)
        {
            c3sound();
            const audioElement = new Audio(c);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }

        if (d3play && audioContextRef.current && destinationRef.current)
        {
            d3sound();
            const audioElement = new Audio(d);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (e3play && audioContextRef.current && destinationRef.current)
        {
            e3sound();
            const audioElement = new Audio(e);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (f3play && audioContextRef.current && destinationRef.current)
        {
            f3sound();
            const audioElement = new Audio(f);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (g3play && audioContextRef.current && destinationRef.current)
        {
            g3sound();
            const audioElement = new Audio(g);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (c3sharpplay && audioContextRef.current && destinationRef.current)
        {
            c3sharpsound();
            const audioElement = new Audio(csh);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (d3sharpplay && audioContextRef.current && destinationRef.current)
        {
            d3sharpsound();
            const audioElement = new Audio(dsh);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (f3sharpplay && audioContextRef.current && destinationRef.current)
        {
            f3sharpsound();
            const audioElement = new Audio(fsh);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (g3sharpplay && audioContextRef.current && destinationRef.current)
        {
            g3sharpsound();
            const audioElement = new Audio(gsh);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
        if (a3sharpplay && audioContextRef.current && destinationRef.current)
        {
            a3sharpsound();
            const audioElement = new Audio(ash);
            const source = audioContextRef.current.createMediaElementSource(audioElement);
            source.connect(destinationRef.current);
            source.connect(audioContextRef.current.destination);
            audioElement.play();
        }
    }, [a3play, b3play, c3play, d3play, e3play, f3play, g3play, c3sharpplay, d3sharpplay, f3sharpplay, g3sharpplay, a3sharpplay])

    const whitekeysize = 50;
    const blackkeysize = 30;
    const textfont = "Consolas"
    const funkyfont = "Papyrus"

    return (
        <div>
            <title>
                Online Keyboard
            </title>

            {/* <main>
                <form onSubmit={onSubmit}>
                    <input 
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    />
                    <input type="submit" value="upload" />
                </form>
            </main> */}

            <div>
                <button onClick={() => record()}>
                    <Image src={recordButton} width={200} height={200} alt="recordButton" style={{position: "absolute", transform: "translate(600%, 50%)"}}/>
                </button>
                {/* <button onClick={() => startRecording()}>Start</button>
                <br />
                <button onClick={() => stopRecording()}>End</button>
                <button onClick={() => convertToMp3()}>Convert</button> */}
            </div>
            {/* <div className = "flex container" style = {{display:"flex", justifyContent: "center", alignItems: "center"}}>
                <button onClick={() => record()}>
                    <Image src={recordButton} width={200} height={200} alt="recordButton" style={{position: "absolute", transform: "translate(125%, 150%)"}}/>
                </button>
                <button onClick={() => startRecording()}>Start</button>
                <br />
                <button onClick={() => stopRecording()}>End</button>
                <button onClick={() => convertToMp3()}>Convert</button>
            </div> */}

            <div className = "flex container" style = {{display:"flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <div style = {{display:"flex"}}>
                    <Image src = {key1} width = {whitekeysize} height = {whitekeysize} alt="key1"/>

                    <Image src = {key1h} width = {blackkeysize} height = {blackkeysize} alt="key1h" style={{position: "absolute", transform: "translate(115%, 0%)"}}/>

                    <Image src = {key2} width = {whitekeysize} height = {whitekeysize} alt="key2"/>

                    <Image src = {key2h} width = {blackkeysize} height = {blackkeysize} alt="key2h" style={{position: "absolute", transform: "translate(285%, 0%)"}}/>

                    <Image src = {key3} width = {whitekeysize} height = {whitekeysize} alt="key3"/>
                    <Image src = {key4} width = {whitekeysize} height = {whitekeysize} alt="key4"/>

                    <Image src = {key4h} width = {blackkeysize} height = {blackkeysize} alt="key4h" style={{position: "absolute", transform: "translate(619%, 0%)"}}/>

                    <Image src = {key5} width = {whitekeysize} height = {whitekeysize} alt="key5"/>

                    <Image src = {key5h} width = {blackkeysize} height = {blackkeysize} alt="key5h" style={{position: "absolute", transform: "translate(785%, 0%)"}}/>

                    <Image src = {key6} width = {whitekeysize} height = {whitekeysize} alt="key6"/>

                    <Image src = {key6h} width = {blackkeysize} height = {blackkeysize} alt="key6h" style={{position: "absolute", transform: "translate(950%, 0%)"}}/>

                    <Image src = {key7} width = {whitekeysize} height = {whitekeysize} alt="key7"/>
                </div>
            </div>
            {/*dealing with octave buttons*/}
            <div style={{justifyContent: "center", alignItems: "center"}}>
                <button onClick={() => decOct()}>
                    <Image src = {prevoct} width = {100} height = {100} alt = "NextOct" style={{position: "absolute", transform: "translate(450%, -420%)"}}/>
                </button>
                <button onClick={() => incOct()}>
                    <Image src = {nextoct} width = {100} height = {100} alt = "NextOct" style={{position: "absolute", transform: "translate(975%, -420%)"}}/>
                </button>
                <button onClick={() => changefunky()}>
                    <Image src = {funkyimage} width = {200} height = {200} alt = "funky" style={{position: "absolute", transform: "translate(600%, -235%)"}}/>
                </button>
            </div>
            {/*Text and stuff*/}
            <div>
                <u style={{color:"black", fontSize:"100px", fontFamily:textfont, font:textfont, position:"absolute", transform: "translate(40%, -500%)"}}>
                    <b>Online Keyboard</b>
                </u>
                <p style={{fontSize:"30px", fontFamily:textfont, font:textfont, position:"absolute", transform: "translate(0%, -100%)"}}>
                    Here is an online keyboard you can play on. Use the arrow keys to change the octave, and press the Funky button to get <b><i><u>funky</u></i></b>. <br />
                    {/* Future additions will include more octaves, a nicer website design and locked text, <br />
                    as well as possible backend support for making recordings and saving them. <br /> */}
                    Additionally, you can record your audio with the Record button, then press it again to download it. <br />
                    (Unfortunately, the download only works for FireFox browsers, from what I have tested) <br />
                    <b>Use the keys Q -{">"} U and 2 -{">"} 7 to play</b>
                </p>
            </div>
        </div>
    );
}