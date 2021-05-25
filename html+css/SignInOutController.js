class SignInOutController{
    static #login = false;
    static #signInOut = document.getElementById("sign_in_out");
    static #logForm = undefined;
    static resetFlag(){
        if(this.#login){
            this.#login = false;
            localStorage.setItem("SignInOutControllerLogin",this.#login.toString());
            this.pageLogout();
        }else{
            this.#login = true;
            localStorage.setItem("SignInOutControllerLogin",this.#login.toString());
            this.pageLogin();
        }
    }
    static pageLogout(){
        Filter.resetFilter();
        ViewHeader.hide();
        User.setName("");
        this.#signInOut.innerText = "Sing in";
        this.#logForm.style.display = "none";
        document.getElementById("order_taxi").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        localStorage.setItem("signInLogForm",this.#logForm.innerHTML);
        localStorage.setItem("mainShown","block");
        localStorage.setItem("Username",User.getName());
        localStorage.setItem("singInOut","Sing in");
        localStorage.setItem("taxiButton","none");
        localStorage.setItem("signInLogFormShow","none");
    }
    static pageLogin(){
        Filter.resetFilter();
        document.getElementById("main-content").style.display = "none";
        localStorage.setItem("mainShown","none");
        localStorage.setItem("signInLogFormShow","block");
        if(this.#logForm!==undefined&&this.#logForm!=null){
            this.#logForm.style.display = "block";
        }else{
            this.#logForm = document.createElement('div');
            this.#logForm.setAttribute("id","sign_in_form");
            this.#logForm.innerHTML = `
                       <p class="font-Marcellius">Login<input type="text" id="login"></p>
                       <p class="font-Marcellius"> Password<input type="password" id="password"></p>
                       <button id="sign_in_submit_button" onclick="SignInForm.setInfo()">Sign in</button>
                       `;
            document.getElementById('load_content').appendChild(this.#logForm);
        }
        localStorage.setItem("signInLogForm",this.#logForm.innerHTML);
        SignInForm.setElement(this.#logForm);
    }
    static loadFromLocal(){
        if(localStorage.getItem("signInLogForm")!=null){
            this.#logForm = document.createElement('div');
            this.#logForm.setAttribute("id","sign_in_form");
            this.#logForm.innerHTML = localStorage.getItem("signInLogForm");
            document.getElementById('load_content').appendChild(this.#logForm);
            SignInForm.setElement(this.#logForm);
            this.#logForm.style.display = localStorage.getItem("signInLogFormShow");
        }
        this.#login = Boolean(localStorage.getItem("SignInOutControllerLogin"));
    }
}