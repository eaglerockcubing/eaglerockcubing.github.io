let popup;
let header;
let body;
let ok;

//i honestly dont know why html defer never works
setTimeout(function() {
    popup = document.querySelector('.alert');
    header = document.querySelector('.alert .header');
    body = document.querySelector('.alert .body');
    ok = document.querySelector('.alert .close');
}, 500);

const hideAlert = () => popup.style.display = 'none';

function showAlert(h, b) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = "<p>" + b.split('\n').join("<br>") + "</p>";
    ok.style.display = 'block';
    ok.onclick = hideAlert;
}

async function showPrompt(h, b, callback) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = `<p>${b}</p><button class="yes">Yes</button><button class="no">Cancel</button>`;
    ok.style.display = 'none';
    
    document.querySelector('.yes').onclick = () => {
        callback(true);
        hideAlert();
    };

    document.querySelector('.no').onclick = () => {
        callback(false);
        hideAlert();
    }
}

async function showFileAlert(h, b, callback, ...accepted) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = `<p>${b}<p><input type="file" size="30" class="file-selector" accept="${accepted.join(' ')}">`;
    document.querySelector(".file-selector").addEventListener('change', function (event) {
        const files = event.target.files;

        console.log(files);

        const f = files[0];
        const reader = new FileReader();
 
        reader.readAsText(f);

        reader.onload = (function(file) {
            return function(e) {
                hideAlert();
                callback(e);
            }
        })(f);
    });

    ok.style.display = 'none';
}

function showInput(h, b, callback) {
    popup.style.display = 'block';
    header.innerHTML = h;
    body.innerHTML = `<p>${b}</p><textarea class="alertinput" cols="72" rows="10"></textarea>`;
    ok.onclick = () => {
        hideAlert();
        callback(document.querySelector(".alertinput").value)
    };
    ok.style.display = 'block';
}

function downloadFile(filename, content) {
    var a = document.createElement("a");

    a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    a.setAttribute("download", filename);

    a.style.display = "none";
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}

function loadNavigation() {
    const header = `
    <nav class="navegation">
        <div class="img"></div>
        <div class="links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/leaderboards/3x3/single.html">Leaderboards</a>
        </div>
    </nav>`;

    document.body.innerHTML = header + document.body.innerHTML;
}

function loadFooter() {
    const footer = `
    <footer>

        <div class="info">

            <h3>Eagle Rock Cubing</h3>

            <p>The Eagle Rock High School Cubing Club</p>

            <p>1750 Yosemite Dr, Los Angeles, CA 90041</p>

            <br>
            <h4>Contact</h4>

            <p>Discord: <a href="https://discord.gg/yKhXxhXExf">discord.gg/yKhXxhXExf</a></p>

            <p>Email:  <a href="mailto:eaglerockcubing@gmail.com">eaglerockcubing@gmail.com</a></p>

        </div>

        <div class="hyperlinks">

            <h3>Info</h3>

            <p><a href="/about">About</a></p>

            <p><a href="google.com">Join</a></p>

            <p><a href="/leaderboards">Leaderboards</a></p>

            <br><h3>Leaderboards</h3>

            <p><a href="/leaderboards/3x3/single.html">3x3x3 Cube</a></p>
            <p><a href="/leaderboards/3x3onehand/single.html">3x3x3 One Handed</a></p>
            <p><a href="/leaderboards/4x4/single.html">4x4x4 Cube</a></p>

        </div>

        <div class="socials">

            <h3>Socials</h3>

            <p>Instagram: <a href="https://www.instagram.com/eaglerockcubing/" target="_blank" rel="noreferrer noopener">eaglerockcubing</a></p>

            <p>Twitter: <a href="https://twitter.com/EagleRockCubing" target="_blank" rel="noreferrer noopener">@EagleRockCubing</a></p>

        </div>

    </footer>
    `;

    document.body.innerHTML += footer;
}