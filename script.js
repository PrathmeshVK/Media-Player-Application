var listofsongs=[
    {
        name:"Best English",
        path:"/Songs/BestEng.mp3",
        song_icon:"/song_icons/song_icon1.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    },
    {
        name:"Attitude BGM",
        path:"/Songs/AttitudeBGM.mp3",
        song_icon:"/song_icons/song_icon2.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    },
    {
        name:"Bachelor Attitude",
        path:"/Songs/BachelorAtt.mp3",
        song_icon:"/song_icons/song_icon3.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    },
    {
        name:"Its my life!",
        path:"/Songs/ItsMyLife.mp3",
        song_icon:"/song_icons/song_icon4.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    },
    {
        name:"Only me...",
        path:"/Songs/Only_me.mp3",
        song_icon:"/song_icons/song_icon5.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    },
    {
        name:"Rebel...!",
        path:"/Songs/Rebel_d.mp3",
        song_icon:"/song_icons/song_icon6.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    },
    {
        name:"Sola Attitude",
        path:"/Songs/SolaAttitude.mp3",
        song_icon:"/song_icons/song_icon7.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    },
    {
        name:"Stay Justin Bieber",
        path:"/Songs/Stay_Justin.mp3",
        song_icon:"/song_icons/song_icon8.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    },
    {
        name:"Jay Ganesh",
        path:"/Songs/song2.mp3",
        song_icon:"/song_icons/song_icon9.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    },
    {
        name:"We don't talk anymore!",
        path:"/Songs/We_Dont_Talk_Anymore.mp3",
        song_icon:"/song_icons/song_icon10.png"
        ,button: "fa-regular fa-3x fa-circle-play"
        ,favourites:"fa-solid fa-heart-circle-plus"
        ,status:"paused"
    }
]
localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs));
var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"));

diplaylist(listofsongs_local);

function diplaylist(listofsongs_local){
    document.getElementById("songlist").innerText="";
    listofsongs_local.map(function(elem,index){

    var div1= document.createElement("div");
    div1.setAttribute("class", "item");

    var div2=document.createElement("div");

    var img1=document.createElement("img");
        img1.setAttribute("class","song_icon");
        img1.setAttribute("src",elem.song_icon);

    var p1=document.createElement("p");
    p1.innerText=elem.name;
    p1.setAttribute("class","nameOfSong");
    
    var div3=document.createElement("div");
    div3.setAttribute("id","iconHolder")
    // div3.innerHTML=<i class="fa-regular fa-2x fa-circle-play"></i>;
    var i1=document.createElement("i");
    i1.setAttribute("class",elem.button);
    i1.setAttribute("id",index);
    i1.style.cursor="pointer"
    i1.addEventListener("click",function(){
        selectedsong(elem, index)
    })
    var i2=document.createElement("i");
    i2.setAttribute("class", "fa-solid fa-heart-circle-plus");
    i2.setAttribute("id","fav");
    i2.addEventListener("click",function(){
        savefav(index)
    });


    div3.append(i1,i2);
    
    div2.append(img1);
    div1.append(div2,p1,div3);
    document.getElementById("songlist").append(div1);

    })
}

var songplayed=new Audio("");
var gif=document.getElementById("gif");
var masterplay= document.getElementById("masterplay");
songplayed.addEventListener("timeupdate",progressbarcontroller);

function selectedsong(elem, index){
    songplayed.pause();
    var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"));
        listofsongs_local.filter(function(elem, i){

            if(i===index){
                
                if(elem.status==="paused"){
                    songplayed=new Audio(elem.path);
                    songplayed.play();
                    gif.style.opacity=1;
                    masterplay.classList.remove("fa-circle-play");
                    masterplay.classList.add("fa-circle-pause");
                    songplayed.addEventListener("timeupdate",progressbarcontroller);
                    elem.status="playing";
                    elem.button="fa-regular fa-3x fa-circle-pause";
                    document.getElementById("playedsongname").innerText=elem.name;
                    localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
                    diplaylist(listofsongs_local);
                    console.log(i+" "+elem.button);
                }
                else if(elem.status==="playing"){
                    songplayed=new Audio(elem.path);
                    songplayed.pause();
                    gif.style.opacity=0;
                    masterplay.classList.remove("fa-circle-pause");
                    masterplay.classList.add("fa-circle-play");
                    songplayed.addEventListener("timeupdate",progressbarcontroller);
                    console.log("song to be stop "+elem.path);
                    console.log("Playing song please stop")
                    //window.location.reload();
                    elem.status="paused";
                    elem.button="fa-regular fa-3x fa-circle-play";
                    localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
                    diplaylist(listofsongs_local);
                    console.log(i+" "+elem.button);
                    
                }
                
            }
            else{
                
                elem.status="paused";
                elem.button="fa-regular fa-3x fa-circle-play";
                localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
                diplaylist(listofsongs_local);
            }
        });  
   
}

var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"))
masterplay.addEventListener("click", function(){playpause(listofsongs_local)});

function playpause(listofsongs_local){
    var listofsongs_local1=JSON.parse(localStorage.getItem("listofsongs_local"))
    if(songplayed.paused || songplayed.currentTime<=0){
        songplayed.play();
        songplayed.addEventListener("timeupdate",progressbarcontroller)
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");
        
        for(var ind=0; ind<listofsongs_local1.length;ind++){
            console.log(ind);
            if(listofsongs_local1[ind].status==="playing"){
                console.log("got it!");
                var iconid=document.getElementById(ind);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");}
            }

        gif.style.opacity=1;

        
    }
    else{
        songplayed.pause();
        songplayed.addEventListener("timeupdate",progressbarcontroller)
        masterplay.classList.remove("fa-circle-pause");
        masterplay.classList.add("fa-circle-play");

        for(var ind=0; ind<listofsongs_local1.length;ind++){
            console.log(ind);
            if(listofsongs_local1[ind].status==="playing"){
                console.log("got it!");
                var iconid=document.getElementById(ind);
                iconid.classList.remove("fa-circle-pause");
                iconid.classList.add("fa-circle-play");}
            }

        gif.style.opacity=0;
        
    }
}

var progressbar=document.getElementById("progressbar");
function progressbarcontroller(){
    console.log("timeupdate");
     var progresspercentage=parseInt((songplayed.currentTime/songplayed.duration)*100);
     progressbar.value=progresspercentage;
     if(progresspercentage==100){
        gif.style.opacity=0;
        masterplay.classList.remove("fa-circle-pause");
        masterplay.classList.add("fa-circle-play");
        // var btn=document.getElementsByClassName("fa-regular fa-3x fa-circle-pause");
        // btn.classList.remove("fa-circle-pause");
        // btn.classList.add("fa-circle-play");

        var listofsongs_local1=JSON.parse(localStorage.getItem("listofsongs_local"))
        for(var ind=0; ind<listofsongs_local1.length;ind++){
            console.log(ind);
            if(listofsongs_local1[ind].status==="playing"){
                console.log("got it!");
                listofsongs_local1[ind].status="pause";
                localStorage.setItem("listofsongs_local1", JSON.stringify(listofsongs_local1));
                diplaylist(listofsongs_local);
                // var iconid=document.getElementById(ind);
                // iconid.classList.remove("fa-circle-pause");
                // iconid.classList.add("fa-circle-play");}
            }

        gif.style.opacity=0;

     }
    // console.log(progresspercentage);
   }
}


   progressbar.addEventListener("change",()=>{
    songplayed.currentTime=((progressbar.value*songplayed.duration)/100);
   })

var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"))
document.getElementById("masterfor").addEventListener("click",nextsong)

function nextsong(){
    console.log("next song");
    var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"))
    // listofsongs_local.map(function(elem, index)
    for(var ind=0; ind<listofsongs_local.length;ind++){
        if(listofsongs_local[ind].status==="playing"){
            var iconid=document.getElementById(ind);
            iconid.classList.remove("fa-circle-pause");
            iconid.classList.add("fa-circle-play");
            console.log("currently this song playing at index : "+ind+"at path "+listofsongs_local[ind].path+" The lenghth of arr "+listofsongs_local.length);
            listofsongs_local[ind].status="paused";
            localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
            if(ind===(listofsongs_local.length-1)){
                var iconid=document.getElementById(0);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");
                masterplay.classList.remove("fa-circle-play");
                masterplay.classList.add("fa-circle-pause");
                songplayed.src=listofsongs_local[0].path;
                songplayed.currentTime=0;
                songplayed.play();
                listofsongs_local[0].status="playing";
                localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
                //Giving song name when we click on next
                for(var ind1=0; ind1<listofsongs_local.length;ind1++){
                    if(listofsongs_local[ind1].status==="playing"){
                        document.getElementById("playedsongname").innerText=listofsongs_local[ind1].name;
                    }
                }
                break;
            }
            else{
                var iconid=document.getElementById(ind+1);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");
                masterplay.classList.remove("fa-circle-play");
                masterplay.classList.add("fa-circle-pause");
                songplayed.src=listofsongs_local[ind+1].path;
                songplayed.currentTime=0;
                songplayed.play();
                listofsongs_local[ind+1].status="playing";
                localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
                //Giving song name when we click on next
                for(var ind2=0; ind2<listofsongs_local.length;ind2++){
                    if(listofsongs_local[ind2].status==="playing"){
                        document.getElementById("playedsongname").innerText=listofsongs_local[ind2].name;
                    }
                }
                break;
            }
        }
    }
    
}

var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"))
document.getElementById("masterback").addEventListener("click",previoussong)

function previoussong(){
    
    console.log("prev songs");
    var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"))
    // listofsongs_local.map(function(elem, index)
    for(var index=0; index<listofsongs_local.length;index++){
        if(listofsongs_local[index].status==="playing"){
            var iconid=document.getElementById(index);
            iconid.classList.remove("fa-circle-pause");
            iconid.classList.add("fa-circle-play");
            console.log("symbols id class list");
            console.log("currently this song playing at index : "+index+"at path "+listofsongs_local[index].path+" The lenghth of arr "+listofsongs_local.length);
            listofsongs_local[index].status="paused";
            localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
            if(index===0){
                var iconid=document.getElementById(listofsongs_local.length-1);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");
                masterplay.classList.remove("fa-circle-play");
                masterplay.classList.add("fa-circle-pause");
                songplayed.src=listofsongs_local[listofsongs_local.length-1].path;
                songplayed.currentTime=0;
                songplayed.play();
                listofsongs_local[listofsongs_local.length-1].status="playing";
                localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
              //Giving song name when we click on next
                for(var ind3=0; ind3<listofsongs_local.length;ind3++){
                    if(listofsongs_local[ind3].status==="playing"){
                        document.getElementById("playedsongname").innerText=listofsongs_local[ind3].name;
                    }
                }
                break;
            }
            else{
                var iconid=document.getElementById(index-1);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");
                masterplay.classList.remove("fa-circle-play");
                masterplay.classList.add("fa-circle-pause");
                songplayed.src=listofsongs_local[index-1].path;
                songplayed.currentTime=0;
                songplayed.play();
                listofsongs_local[index-1].status="playing";
                localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
                //Giving song name when we click on next
                for(var ind4=0; ind4<listofsongs_local.length;ind4++){
                    if(listofsongs_local[ind4].status==="playing"){
                        document.getElementById("playedsongname").innerText=listofsongs_local[ind4].name;
                    }
                }
                break;
            }
        }
    }
}

//saving to favourites
let favarr= JSON.parse(localStorage.getItem("favarr"))||[];
function savefav(i){
    var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"));
    listofsongs_local.filter(function(elem,index){
        const found = favarr.some(el => el.name === elem.name);
        if(!found){ 
        if(i===index){
            if(elem.status==="playing"){
                elem.status="paused";
                elem.button="fa-regular fa-3x fa-circle-play";
            }   
            var obj=elem;
            favarr.push(obj);
            localStorage.setItem("favarr",JSON.stringify(favarr));
        }
    }
    })
    console.log(favarr);
}

// Sorting Algorithm

var flag="false";
localStorage.setItem("flag", JSON.stringify(flag));
var flag=JSON.parse(localStorage.getItem("flag"));
function showsortedarr(){

    var flag=JSON.parse(localStorage.getItem("flag"));
    if(flag==="false"){
        var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"))
        listofsongs_local.sort(function(a,b){
            if(a.name>b.name){
                return -1;
            }
            if(a.name<b.name){
                return 1;
            }
            return 0;
        })
        localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
        flag="true";
        localStorage.setItem("flag", JSON.stringify(flag));
        console.log(flag);
        document.getElementById("sort-btn").innerText="Sort A-Z"
        for(var ind=0; ind<listofsongs_local.length;ind++){
            if(listofsongs_local[ind].status==="playing"){
                var iconid=document.getElementById(ind);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");}
            }
            diplaylist(listofsongs_local);
    }
    else if(flag==="true"){
        var listofsongs_local=JSON.parse(localStorage.getItem("listofsongs_local"))
        listofsongs_local.sort(function(a,b){
            if(a.name<b.name){
                return -1;
            }
            if(a.name>b.name){
                return 1;
            }
            return 0;
        })
        localStorage.setItem("listofsongs_local", JSON.stringify(listofsongs_local));
        flag="false";
        localStorage.setItem("flag", JSON.stringify(flag));
        console.log(flag);
        document.getElementById("sort-btn").innerText="Sort Z-A"
        for(var ind=0; ind<listofsongs_local.length;ind++){
            if(listofsongs_local[ind].status==="playing"){
                var iconid=document.getElementById(ind);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");}
            }
            diplaylist(listofsongs_local);
    }
}