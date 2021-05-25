class FormController{
    static #orderForm;
    static #onFilter = false;
    static openForm(){
        this.#onFilter = true;
        document.getElementById("main-content").style.display = "none";
        if(this.#orderForm!==undefined&&this.#orderForm!=null){
            this.#orderForm.style.display = "block";
        }else{
            this.#orderForm = document.createElement('div');
            this.#orderForm.setAttribute("id","order_form");
            this.#orderForm.innerHTML = `
                       <p>Name<br><input id="name" type="text"></p>
                       <p>Phone<br><input id="phone" type="text"></p>
                       <p>Company<br><select id="company">
                            <option value="KSL">KSL</option>
                            <option value="LPT">LPT</option>
                            <option value="Yandex">Yandex</option>
                       </select></p>
                       <p>Taxi Num<br><input id="taxi_num" type="text"></p>
                       <div>
                            <button id="form_ok_button" onclick="FormController.order()">OK</button>
                            <button id="form_cancel_button" onclick="FormController.cancel()">Cancel</button>
                       </div>`;
            document.getElementById('load_content').appendChild(this.#orderForm);
        }

        localStorage.setItem("orderFormFormShow", "block");
        localStorage.setItem("orderForm",this.#orderForm);
        localStorage.setItem("mainShown","none");
        localStorage.setItem("onFilter",this.#onFilter.toString());
    }
    static order(){
        let name = this.#orderForm.querySelector('#name').value;
        let phone = this.#orderForm.querySelector('#phone').value;
        let company = this.#orderForm.querySelector('#company').value;
        let taxi_num = this.#orderForm.querySelector('#taxi_num').value;
        myPosts.addPost(makePost(name,phone,myPosts.getNextID().toString(),User.getName(),new Date(),company,taxi_num));
        this.cancel();
    }
    static edit(id){
        let name = this.#orderForm.querySelector('#name').value;
        let phone = this.#orderForm.querySelector('#phone').value;
        let company = this.#orderForm.querySelector('#company').value;
        let taxi_num = this.#orderForm.querySelector('#taxi_num').value;
        myPosts.editPost(id,makePost(name,phone,myPosts.length,User.getName(),new Date(),company,taxi_num));
    }
    static remove(id){
        myPosts.removePost(id);
    }
    static cancel(){
        this.#onFilter = false;
        document.getElementById("main-content").style.display = "block";
        this.#orderForm.style.display = "none";
        localStorage.setItem("orderForm",this.#orderForm.innerHTML);
        localStorage.setItem("mainShown","block");
        localStorage.setItem("onFilter",this.#onFilter.toString());
        localStorage.setItem("orderFormFormShow", "none");
    }
    static loadFromLocal(){
        if(localStorage.getItem("orderForm")!=null){
            this.#orderForm = document.createElement('div');
            this.#orderForm.setAttribute("id","order_form");
            this.#orderForm.innerHTML = localStorage.getItem("orderForm");
            document.getElementById('load_content').appendChild(this.#orderForm);
            this.#orderForm.style.display = localStorage.getItem("orderFormFormShow");
        }
        this.#onFilter = Boolean(localStorage.getItem("onFilter"));
    }
}