
    const play_pause_button=document.querySelector(".playbutton")
    
    const audio=document.querySelector("#audio")
    const img=document.querySelector(".cover__container img")

    const title_container=document.querySelector(".title__container h3")
    const title_artist=document.querySelector(".title__container p")
    const forward_button=document.querySelector(".forwardbutton")
    const back_button=document.querySelector(".backwardbutton")
    
    const songStart=document.querySelector(".start")
    const songLength=document.querySelector(".songlength")
    
    const progressBar=document.querySelector(".progressbar")
    const progress=document.querySelector(".progress")

    const volumeBar=document.querySelector(".volume-bar")
    const volume=document.querySelector(".volume")

    const pepe=document.querySelector(".pepeJAM")
    let status=true;
    let timerID;
    let counter=0
    let resume=0;
    const musicObjFiles =[
       {
             
                name:"Dream Latern",
                coverimg:"./cover/dreamlatern.jpg",
                artist:"Radwimps",
                src:"./music/Dream lantern.mp3"
        },
     {
            name:"Rebel Girl",
            coverimg:"./cover/rebel girl.jpg",
            artist:"Angel and Waves",
            src:"./music/Angels & Airwaves Rebel Girl .mp3" },
            {
                name:"Yubi Yubi",
                coverimg:"./cover/yubi-yubi.jpg",
                artist:"Inugami",
                src:"./music/Koro Funk！.mp3" 
            },
            {
                name:"Forget ME too",
                coverimg:"./cover/forgetmetoo.jpg",
                artist:"Machine Gun Kelly",
                src:"./music/Machine Gun Kelly - Forget Me Too ft. Halsey.mp3" 
            }
    ]
    const play=()=>{
       
        audio.src=musicObjFiles[counter].src
        img.src=musicObjFiles[counter].coverimg
        title_container.innerHTML=musicObjFiles[counter].name
        title_artist.innerHTML=musicObjFiles[counter].artist
        play_pause_button.innerHTML=`<i class="fas fa-pause-circle"></i>`
        if(resume===0){
            audio.play()
        }else{
            audio.currentTime=resume;
            audio.play();
        }
        
        status=false
       
        timerID =setInterval(songCurrentTime,100)
        
    }
    const pause=()=>{
     audio.pause()
     status=true;
      resume=audio.currentTime
     clearInterval(timerID)
     play_pause_button.innerHTML=`<i class="fas fa-play-circle"></i>`
    }
    const nextSong=()=>{
        resume=0;
        if(counter>=musicObjFiles.length-1){
            counter=0
        }else if(counter<musicObjFiles.length-1){
            counter++
        }
        play(counter)
       
      

    }
    const prevSong=()=>{
        resume=0;
        if(counter<=0){
            counter=musicObjFiles.length-1
        }else if(counter>0){
            counter--
        }
        
        play(counter)
    }
    function songCurrentTime(){
        
        audio.onloadedmetadata=function(){
         const mins=Math.floor(audio.duration/60);
         const secs=Math.floor(audio.duration%60);
         songLength.innerHTML=`${mins}:${secs}`
        
        }
        const currentMins=Math.floor(audio.currentTime/60)
        let currentSecs=Math.floor(audio.currentTime%60)
        if(currentSecs<10){
            currentSecs=`0${currentSecs}`
        }
        songStart.innerHTML=`${currentMins}:${currentSecs}`
         
        const currentProgress=(audio.currentTime/audio.duration)*100
    
        progress.style.width=`${currentProgress}%`

       }

 songCurrentTime();

 function clickPlay(e){
     const width=this.clientWidth
     const clickX=e.offsetX
     const duration=(clickX/width)*audio.duration;
     resume=duration;
     play()
     
 }

 function firstTimeLoad(){
    counter=Math.floor(Math.random()*musicObjFiles.length)
    audio.src=musicObjFiles[counter].src
    img.src=musicObjFiles[counter].coverimg
    title_container.innerHTML=musicObjFiles[counter].name
    title_artist.innerHTML=musicObjFiles[counter].artist
    play_pause_button.innerHTML=`<i class="fas fa-play-circle"></i>`

    
    
 }
 
  function volumeSet(e){
   const  height=this.clientHeight
   const clickY=e.offsetY
   audio.volume=clickY/height
   volume.style.height=`${audio.volume*100}%`;
  
   
 }

firstTimeLoad()
 play_pause_button.addEventListener("click",()=>{ if(status===true){  play() }else{  pause()} })

 forward_button.addEventListener("click",nextSong)

 back_button.addEventListener("click",prevSong)
 audio.addEventListener("ended",nextSong)

 progressBar.addEventListener("click",clickPlay)
 volumeBar.addEventListener("click",volumeSet)