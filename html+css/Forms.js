let Users = new Map();
Users.set("alice",{password:"alice", username:"M Alice"});

class SignInForm{
    static #logForm;
    static #signInOut = document.getElementById("sign_in_out");
    static setElement(logForm) {
        this.#logForm = logForm;
    }
    static setInfo(){
        let login = this.#logForm.querySelector('#login').value;
        let password = this.#logForm.querySelector('#password').value;
        if(Users.has(login)&&Users.get(login).password === password){
            User.setName(Users.get(login).username);
            Filter.resetFilter();
            ViewHeader.display();
            this.#logForm.style.display = "none";
            document.getElementById("main-content").style.display = "block";
            this.#signInOut.innerText = "Sing out";
            document.getElementById("order_taxi").style.display = 'block';
            localStorage.setItem("Username",User.getName());
            localStorage.setItem("singInOut","Sing out");
            localStorage.setItem("taxiButton","block");
            localStorage.setItem("mainShown","block");
            localStorage.setItem("signInLogFormShow","none");
        }else{
            alert("exception: login or password is wrong");
        }
    }

}