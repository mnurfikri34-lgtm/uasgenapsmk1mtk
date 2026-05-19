let database = [];

let databaseReady = false;



async function loadDatabase(){

    try{

        console.log("Loading database...");

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxRtFc5mHh1w02JU6Hxi56QVa1G36Tlyf4fI1HSvhydOgUYF_FkLgNf9N4eazUUMdXQ/exec"
        );

        database = await response.json();

        console.log(database);

        databaseReady = true;
        document.getElementById("loadingScreen").style.display =
"none";

        document.getElementById("loginBtn").disabled = false;

        document.getElementById("loginBtn").innerText =
        "Masuk Ujian";

        console.log("Database Loaded!");

    }catch(error){

        console.log(error);

        document.getElementById("loginBtn").innerText =
        "Refresh Halaman";

        alert("Gagal memuat database!");
    }
}



window.onload = function(){

    loadDatabase();
};



async function login(){

    if(!databaseReady){

        alert("Database belum siap!");

        return;
    }

    let kode =
    document.getElementById("kode").value;

    let token =
    document.getElementById("token").value;

    if(kode === "" || token === ""){

        alert("Lengkapi data!");

        return;
    }

    for(const siswa of database){

        let kodeDB =
        String(siswa.kode).trim().toLowerCase();

        let tokenDB =
        String(siswa.token).trim().toLowerCase();

        let statusDB =
        String(siswa.status).trim().toLowerCase();

        let sessionLogin =
        String(siswa.session_login).trim().toLowerCase();

        let currentSession =
        String(siswa.current_session).trim().toLowerCase();

        let kodeInput =
        kode.trim().toLowerCase();

        let tokenInput =
        token.trim().toLowerCase();

        if(

            kodeDB === kodeInput &&
            tokenDB === tokenInput &&
            statusDB === "aktif"

        ){

            if(sessionLogin === currentSession){

                alert("Akun sudah digunakan!");

                return;
            }

            try{

                await fetch(
                    "https://script.google.com/macros/s/AKfycbxRtFc5mHh1w02JU6Hxi56QVa1G36Tlyf4fI1HSvhydOgUYF_FkLgNf9N4eazUUMdXQ/exec",
                    {

                        method:"POST",

                        body:JSON.stringify({

                            row:siswa.row,

                            session:siswa.current_session
                        })
                    }
                );

            }catch(error){

                console.log(error);
            }

            alert("Login berhasil!");

            window.location.href = siswa.link;

            return;
        }
    }

    alert("Kode atau token salah!");
}
function startCountdown(duration){

    let timer = duration;

    setInterval(function(){

        let hours =
        Math.floor(timer / 3600);

        let minutes =
        Math.floor((timer % 3600) / 60);

        let seconds =
        timer % 60;

        document.getElementById("timer").innerText =

        String(hours).padStart(2,'0') + ":" +

        String(minutes).padStart(2,'0') + ":" +

        String(seconds).padStart(2,'0');

        if(timer > 0){

            timer--;

        }else{

            alert("Waktu ujian habis!");

            location.reload();
        }

    },1000);
}
