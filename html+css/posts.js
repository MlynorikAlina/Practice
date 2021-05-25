///"01-23-2004 15:30"
function CreateNewPost(Post) {
    let li = document.createElement('li');
    let options = {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
        hour12: false
    };
    let ifUser = "";
    if (Post.user === User.getName()) {
        ifUser = `<div  class="buttons">
                       <img height="30px" src="img/edit.png">
                       <p  class="buttons">Edit</p>
                 </div>`;
    }
    li.innerHTML = `<div class="post font-Marcellius" id="post${Post.id}">
                            <div id="hiden_id_num">${Post.id}</div>
							<img id="User-img" src="img/user.png">
						    <p class="User content">${Post.user}</p>
						    <p class="Time content">${Post.date.toLocaleString('en', options)}</p>
						<div class="main-context">
						<div>
							<p class="content">Taxi company:</p>
							<p class="content">${Post.company}</p>
						</div>
						<div>
							<p class="content">Taxi number:</p>
						    <p class="content">${Post.taxiNum}</p>
						</div>\
						<div>\
							<img height="30px" src="img/like.png">\
							<p class="buttons">Do you like<br>this service?</p>\
                             ${ifUser}
						</div>\
					</div>`
    return li;
}


class ViewPosts {
    static postsOnPage = 0;
    static maxPostsCount = 0;
    static #button;
    constructor() {
        ViewPosts.#button = document.getElementById("show-more");
    }
    static showMore() {
        let postsList = document.getElementById('posts-list');
        myPosts.getPosts(ViewPosts.postsOnPage, 10, Filter.getFilterConfig()).forEach((el) => {
            postsList.appendChild(CreateNewPost(el));
            ViewPosts.postsOnPage++;
        });
        localStorage.setItem("postsOnPage",ViewPosts.postsOnPage.toString());
        if (ViewPosts.postsOnPage >= ViewPosts.maxPostsCount) {
            ViewPosts.#button.style.display = "none";
        }
        localStorage.setItem("main-content",document.getElementById('main-content').innerHTML);
    }
    static updateShowButton(){
        if (ViewPosts.postsOnPage < ViewPosts.maxPostsCount){
            ViewPosts.#button.style.display = "block";
        }else {ViewPosts.#button.style.display = "none";}
    }
    static editPost(index,Post){
        let postsList = document.getElementById("posts-list");
        postsList.replaceChild(CreateNewPost(Post),postsList.children[index]);
        localStorage.setItem("main-content",document.getElementById('main-content').innerHTML);
    }
    static removePost(index){
        let postsList = document.getElementById("posts-list");
        if(index<postsList.childNodes.length){
            postsList.removeChild(postsList.children[index]);
            if (ViewPosts.postsOnPage >= ViewPosts.maxPostsCount) {
                ViewPosts.#button.style.display = "none";
            }
            if(ViewPosts.postsOnPage < ViewPosts.maxPostsCount){
                postsList.appendChild(CreateNewPost(myPosts.getPosts(0,myPosts.getPostsNum(),Filter.getFilterConfig())
                    .slice(ViewPosts.postsOnPage,ViewPosts.postsOnPage+1)[0]));

            }else {
                ViewPosts.postsOnPage--;
                localStorage.setItem("postsOnPage",ViewPosts.postsOnPage.toString());
            }
        }
        localStorage.setItem("main-content",document.getElementById('main-content').innerHTML);
    }
}

class ViewHeader {
    static #username = document.getElementById("username");
    static display() {
        if (User.getName() != null && User.getName() !== "") {
            this.#username.innerText = User.getName();
            this.#username.style.display = "block";
        }else this.#username.style.display = "none";
    }
    static hide(){
        this.#username.style.display = "none";
    }
}


let myPosts = new PostProcessing([]);
new ViewPosts();
let postsList = document.getElementById('posts-list');


    document.addEventListener("DOMContentLoaded", function (){
        myPosts.loadFromLocal();
    if(localStorage.getItem("main-content")!=null)
        document.getElementById('main-content').innerHTML = localStorage.getItem("main-content");
    else{
        myPosts.getPosts().forEach((el) => {
            postsList.appendChild(CreateNewPost(el))
        });
        ViewPosts.postsOnPage += 10;
        localStorage.setItem("postsOnPage",ViewPosts.postsOnPage.toString());
        ViewHeader.display();
    }
    SignInOutController.loadFromLocal();
    FormController.loadFromLocal();
    User.setName(localStorage.getItem("Username"));
    ViewHeader.display();
    if(localStorage.getItem("singInOut")!=null)document.getElementById("sign_in_out").innerHTML=localStorage.getItem("singInOut");
    if(localStorage.getItem("taxiButton")!=null)
        document.getElementById("order_taxi").style.display = localStorage.getItem("taxiButton");
    if(localStorage.getItem("mainShown")!=null)
        document.getElementById('main-content').style.display = localStorage.getItem("mainShown");
    if(localStorage.getItem("postsOnPage")!=null)
        ViewPosts.postsOnPage = parseInt(localStorage.getItem("postsOnPage"));
});
