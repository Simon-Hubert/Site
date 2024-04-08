function SetTime(){
    let date = new Date();

    let hh = date.getHours();
    let mm = date.getMinutes();
    let sesh = "am";

    let yy = date.getFullYear();
    let MM = date.getMonth();
    let dd = date.getDate();

    hh = (hh < 10)? "0" + hh : hh;
    mm = (mm < 10)? "0" + mm : mm;
    MM = (MM < 10)? "0" + MM : MM;
    dd = (dd < 10)? "0" + dd : dd;

    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh -= 12;
        sesh = "pm";
    }
    document.getElementById("date").innerHTML = `<span>${dd}-${MM}-${yy.toString().substring(2)}</span><span>${hh}:${mm} ${sesh}</span>`;
    setTimeout(SetTime, 60000);
}

SetTime();