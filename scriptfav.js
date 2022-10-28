var favarr=JSON.parse(localStorage.getItem("favarr")) || [];

diplaylist(favarr);

function diplaylist(favarr){
    document.getElementById("songlist").innerText="";
    // console.log(favarr)
    favarr.map(function(elem,index){

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
    i2.setAttribute("class", "fa-solid fa-heart-circle-minus");
    i2.setAttribute("id","fav");
    i2.addEventListener("click",function(){
        removefav(index)
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
    var favarr=JSON.parse(localStorage.getItem("favarr"));
        favarr.filter(function(elem, i){

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
                    localStorage.setItem("favarr", JSON.stringify(favarr));
                    diplaylist(favarr);
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
                    localStorage.setItem("favarr", JSON.stringify(favarr));
                    diplaylist(favarr);
                    console.log(i+" "+elem.button);
                    
                }
                
            }
            else{
                
                elem.status="paused";
                elem.button="fa-regular fa-3x fa-circle-play";
                localStorage.setItem("favarr", JSON.stringify(favarr));
                diplaylist(favarr);
            }
        });  
   
}

var favarr=JSON.parse(localStorage.getItem("favarr"))
masterplay.addEventListener("click", function(){playpause(favarr)});

function playpause(favarr){
    var favarr1=JSON.parse(localStorage.getItem("favarr"))
    if(songplayed.paused || songplayed.currentTime<=0){
        songplayed.play();
        songplayed.addEventListener("timeupdate",progressbarcontroller)
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause");
        
        for(var ind=0; ind<favarr1.length;ind++){
            console.log(ind);
            if(favarr1[ind].status==="playing"){
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

        for(var ind=0; ind<favarr1.length;ind++){
            console.log(ind);
            if(favarr1[ind].status==="playing"){
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
        diplaylist(favarr);
     }
     
    // console.log(progresspercentage);
   }


   progressbar.addEventListener("change",()=>{
    songplayed.currentTime=((progressbar.value*songplayed.duration)/100);
   })

var favarr=JSON.parse(localStorage.getItem("favarr"))
document.getElementById("masterfor").addEventListener("click",nextsong)

function nextsong(){
    console.log("next song");
    var favarr=JSON.parse(localStorage.getItem("favarr"))
    // favarr.map(function(elem, index)
    for(var ind=0; ind<favarr.length;ind++){
        if(favarr[ind].status==="playing"){
            var iconid=document.getElementById(ind);
            iconid.classList.remove("fa-circle-pause");
            iconid.classList.add("fa-circle-play");
            console.log("currently this song playing at index : "+ind+"at path "+favarr[ind].path+" The lenghth of arr "+favarr.length);
            favarr[ind].status="paused";
            localStorage.setItem("favarr", JSON.stringify(favarr));
            if(ind===(favarr.length-1)){
                var iconid=document.getElementById(0);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");
                masterplay.classList.remove("fa-circle-play");
                masterplay.classList.add("fa-circle-pause");
                songplayed.src=favarr[0].path;
                songplayed.currentTime=0;
                songplayed.play();
                favarr[0].status="playing";
                localStorage.setItem("favarr", JSON.stringify(favarr));
                var favarr=JSON.parse(localStorage.getItem("favarr"));
                //Giving song name when we click on next
                for(var ind1=0; ind1<favarr.length;ind1++){
                    if(favarr[ind1].status==="playing"){
                        document.getElementById("playedsongname").innerText=favarr[ind1].name;
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
                songplayed.src=favarr[ind+1].path;
                songplayed.currentTime=0;
                songplayed.play();
                favarr[ind+1].status="playing";
                localStorage.setItem("favarr", JSON.stringify(favarr));
                var favarr=JSON.parse(localStorage.getItem("favarr"));
                //Giving song name when we click on next
                for(var ind1=0; ind1<favarr.length;ind1++){
                    if(favarr[ind1].status==="playing"){
                        document.getElementById("playedsongname").innerText=favarr[ind1].name;
                    }
                }
                break;
            }
        }
    }
    
}

var favarr=JSON.parse(localStorage.getItem("favarr"))
document.getElementById("masterback").addEventListener("click",previoussong)

function previoussong(){
    
    console.log("prev songs");
    var favarr=JSON.parse(localStorage.getItem("favarr"))
    // favarr.map(function(elem, index)
    for(var index=0; index<favarr.length;index++){
        if(favarr[index].status==="playing"){
            var iconid=document.getElementById(index);
            iconid.classList.remove("fa-circle-pause");
            iconid.classList.add("fa-circle-play");
            console.log("symbols id class list");
            console.log("currently this song playing at index : "+index+"at path "+favarr[index].path+" The lenghth of arr "+favarr.length);
            favarr[index].status="paused";
            localStorage.setItem("favarr", JSON.stringify(favarr));
            if(index===0){
                var iconid=document.getElementById(favarr.length-1);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");
                masterplay.classList.remove("fa-circle-play");
                masterplay.classList.add("fa-circle-pause");
                songplayed.src=favarr[favarr.length-1].path;
                songplayed.currentTime=0;
                songplayed.play();
                favarr[favarr.length-1].status="playing";
                localStorage.setItem("favarr", JSON.stringify(favarr));
                var favarr=JSON.parse(localStorage.getItem("favarr"));
                //Giving song name when we click on next
                for(var ind1=0; ind1<favarr.length;ind1++){
                    if(favarr[ind1].status==="playing"){
                        document.getElementById("playedsongname").innerText=favarr[ind1].name;
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
                songplayed.src=favarr[index-1].path;
                songplayed.currentTime=0;
                songplayed.play();
                favarr[index-1].status="playing";
                localStorage.setItem("favarr", JSON.stringify(favarr));
                var favarr=JSON.parse(localStorage.getItem("favarr"));
                //Giving song name when we click on next
                for(var ind1=0; ind1<favarr.length;ind1++){
                    if(favarr[ind1].status==="playing"){
                        document.getElementById("playedsongname").innerText=favarr[ind1].name;
                    }
                }
                break;
            }
        }
    }
}
function removefav(index){
    console.log(document.getElementById("playedsongname").innerText+" we are compairing "+favarr[index].name);
    if(document.getElementById("playedsongname").innerText===favarr[index].name){
        console.log("Itselt is deleted.....!!!!");
        favarr.splice(index,1);
        localStorage.setItem("favarr",JSON.stringify(favarr));
        diplaylist(JSON.parse(localStorage.getItem("favarr")));
        songplayed.pause();
        masterplay.classList.remove("fa-circle-pause");
        masterplay.classList.add("fa-circle-play");
        var progressbar=document.getElementById("progressbar");
        progressbar.value=0;
        var gif=document.getElementById("gif");
        gif.style.opacity=0;
    //     var iconid=document.getElementById(index);
    //   iconid.classList.remove("fa-circle-play");
    //   iconid.classList.add("fa-circle-pause");
    }
    else{
        // Logic to retain played song icon in playing mode
        for(var i=0; i<favarr.length;i++){
            if(document.getElementById("playedsongname").innerText===favarr[i].name){
                favarr[i].button="fa-regular fa-3x fa-circle-pause"
                localStorage.setItem("favarr",JSON.stringify(favarr));
                break;
            }
        }

    favarr.splice(index,1);
    localStorage.setItem("favarr",JSON.stringify(favarr));
    diplaylist(JSON.parse(localStorage.getItem("favarr")));
    }
}

// Sorting Algorithm

var flag="false";
localStorage.setItem("flag", JSON.stringify(flag));
var flag=JSON.parse(localStorage.getItem("flag"));
function showsortedarr(){

    var flag=JSON.parse(localStorage.getItem("flag"));
    if(flag==="false"){
        var favarr=JSON.parse(localStorage.getItem("favarr"))
        favarr.sort(function(a,b){
            if(a.name>b.name){
                return -1;
            }
            if(a.name<b.name){
                return 1;
            }
            return 0;
        })
        localStorage.setItem("favarr", JSON.stringify(favarr));
        flag="true";
        localStorage.setItem("flag", JSON.stringify(flag));
        console.log(flag);
        document.getElementById("sort-btn").innerText="Sort A-Z"
        for(var ind=0; ind<favarr.length;ind++){
            if(favarr[ind].status==="playing"){
                var iconid=document.getElementById(ind);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");}
            }
            diplaylist(favarr);
    }
    else if(flag==="true"){
        var favarr=JSON.parse(localStorage.getItem("favarr"))
        favarr.sort(function(a,b){
            if(a.name<b.name){
                return -1;
            }
            if(a.name>b.name){
                return 1;
            }
            return 0;
        })
        localStorage.setItem("favarr", JSON.stringify(favarr));
        flag="false";
        localStorage.setItem("flag", JSON.stringify(flag));
        console.log(flag);
        document.getElementById("sort-btn").innerText="Sort Z-A"
        for(var ind=0; ind<favarr.length;ind++){
            if(favarr[ind].status==="playing"){
                var iconid=document.getElementById(ind);
                iconid.classList.remove("fa-circle-play");
                iconid.classList.add("fa-circle-pause");}
            }
            diplaylist(favarr);
    }
}