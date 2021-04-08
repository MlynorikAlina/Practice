///"01-23-2004 15:30"
function CreateNewPost(Post) {
    let li = document.createElement('li');
    let options = {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
        hour12: false
    };
    let ifUser = "";
    if (Post.user === user.getName()) {
        ifUser = `<div  class="buttons">
                       <img height="30px" src="img/edit.png">
                       <p  class="buttons">Edit</p>
                 </div>`;
    }
    li.innerHTML = `<div class="post font-Marcellius" id="post${Post.id}">
							<img id="User-img" src="img/user.png">
						    <p class="User content">${Post.user}</p>
						    <p class="Time content">${new Intl.DateTimeFormat('en', options).format(Post.date)}</p>
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
        if (ViewPosts.postsOnPage >= ViewPosts.maxPostsCount) {
            ViewPosts.#button.style.display = "none";
        }
    }
    static updateShowButton(){
        if (ViewPosts.postsOnPage < ViewPosts.maxPostsCount){
            ViewPosts.#button.style.display = "block";
        }
    }
    static editPost(index,Post){
        let postsList = document.getElementById("posts-list");
        postsList.replaceChild(CreateNewPost(Post),postsList.children[index]);
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

            }else ViewPosts.postsOnPage--;
        }
    }
}

class ViewHeader {
    static display() {
        if (user.getName() != null) {
            let username = document.getElementById("username");
            username.innerText = user.getName();
            username.style.display = "block";
        }
    }
}


let myPosts = new PostProcessing([]);


document.addEventListener("DOMContentLoaded", function () {
    new ViewPosts();
    let postsList = document.getElementById('posts-list');
    myPosts.getPosts().forEach((el) => {
        postsList.appendChild(CreateNewPost(el))
    });
    ViewPosts.postsOnPage += 10;
    ViewHeader.display();
});