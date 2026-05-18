async function login() {

    let kode = document.getElementById("kode").value;
    let token = document.getElementById("token").value;

    if (kode === "" || token === "") {

        alert("Lengkapi data!");
        return;
    }

    try {

        const response = await fetch("https://script.google.com/macros/s/AKfycbxRtFc5mHh1w02JU6Hxi56QVa1G36Tlyf4fI1HSvhydOgUYF_FkLgNf9N4eazUUMdXQ/exec");

        const data = await response.json();

        console.log(data);

        for (const siswa of data) {

            let kodeDB = String(siswa.kode).trim().toLowerCase();
            let tokenDB = String(siswa.token).trim().toLowerCase();
            let statusDB = String(siswa.status).trim().toLowerCase();
            let sessionLogin = String(siswa.session_login).trim().toLowerCase();
            let currentSession = String(siswa.current_session).trim().toLowerCase();

            let kodeInput = kode.trim().toLowerCase();
            let tokenInput = token.trim().toLowerCase();

            if (
                kodeDB === kodeInput &&
                tokenDB === tokenInput &&
                statusDB === "aktif"
            ) {

                if (sessionLogin === currentSession) {

                    alert("Akun sudah digunakan di sesi ini!");
                    return;
                }

                await fetch("https://script.google.com/macros/s/AKfycbxRtFc5mHh1w02JU6Hxi56QVa1G36Tlyf4fI1HSvhydOgUYF_FkLgNf9N4eazUUMdXQ/exec", {

                    method: "POST",

                    body: JSON.stringify({
                        row: siswa.row,
                        session: siswa.current_session
                    })
                });

                alert("Login berhasil!");

                window.location.href = siswa.link;

                return;
            }
        }

        alert("Kode atau token salah!");

    } catch (error) {

        console.log(error);

        alert("Gagal terhubung ke server!");
    }
}