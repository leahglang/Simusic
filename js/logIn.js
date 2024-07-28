document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);


let gamersArr = [];


function logInIsValid(addEvent) {
    addEvent.preventDefault();

    const email = document.getElementById("logInEmail").value;
    const password = document.getElementById("logInPassword").value;
    gamersArr = JSON.parse(localStorage.getItem("users")) || [];
    const exist = gamersArr.find(element => element.email === email);

    if (!exist || exist == undefined) {
        document.getElementById("logInMassage").innerText = "עדיין לא נרשמת";
        return;
    }

    const validPassword = gamersArr.find(element => element.password === password);
    if (validPassword) {
        localStorage.setItem("curentUser", JSON.stringify(exist));
        self.location="home.html";

    }
    else {
        document.getElementById("logInMassage").innerText = "Incorrect password";
    }
}
 

function signUpIsValid(addEvent) {
    addEvent.preventDefault();

    const u_email = document.getElementById("signUpEmail").value;
    const u_password = document.getElementById("signUpPassword").value;
    const u_name = document.getElementById("signUpName").value;
    gamersArr = JSON.parse(localStorage.getItem("users")) || [];
    const exist = gamersArr.find(element => element.email === u_email);
    if (exist) {
        document.getElementById("signUpMassage").innerText = "יש לנו כבר חשבון כזה, גון במשהו חדש";
    }
    else {
        let newGamer = {name: u_name,  email: u_email, password: u_password};
        gamersArr.push(newGamer);
        localStorage.setItem("users", JSON.stringify(gamersArr));
        localStorage.setItem("curentUser", JSON.stringify(newGamer));
        self.location="home.html";
		
    }
}