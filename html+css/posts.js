
let dateParser = ""
function makePost(id,user,time,text){
		return{
			id,
			user,
			time,
			text
		};
}

let myPosts =  new class postProcessing{
	#posts = [];
	#postsList = document.getElementById("posts-list");

	constructor(postsToAdd){
		this.#posts = postsToAdd;
	}
	loadPosts(){
		this.#posts.push(makePost("1","@User","11.11.11 2:15","some data"));
		this.#posts.push(makePost("2","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("3","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("4","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("5","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("6","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("7","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("8","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("9","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("10","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("11","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("12","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("13","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("14","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("15","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("16","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("17","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("18","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("19","@User","11.11.11 2:15","some data"));
		this.posts.push(makePost("20","@User","11.11.11 2:15","some data"));
	}

	getPostById(id){
		return posts.find((el,elId,arr)=>{return el.id == id;});
	}
	validatePost(Post){
		if(typeof Post.user == "string" && new RegExp("^@[0-9a-zA-z]+$").test(Post.user))
			if(typeof Post.time == "string" && new RegExp("^[0-9]{2}\.[0-9]{2}\.[0-9]{2}\s[0-9]{2}:[0-9]{2}$").test(Post.time))
				if(typeof Post.id == "string" && new RegExp("^[0-9]+$").test(Post.id))
					if(typeof Post.text == "string") return true;
		return false;
	}
	addPost(Post) {
		if(validatePost(Post))this.posts.push(Post);
		else alert("Error::addPost");
	}
	addAll(postsToAdd){
		postsToAdd.forEach(el=>{if(validatePost(el))this.posts.push(el);});
	}
	getPosts(skip = 0, top = 10, filterConfig){
		return posts.filter(el=>filterConfig.user == el.user && filterConfig.timeFrom <= el.time && filterConfig.timeTo >= el.time).slice(skip,skip+top);
	}
	print(){
		console.log(this.posts);
	}
}


function command(cmnd)  {
    switch(cmnd)  {
        case "loadPosts":
            myPosts.loadPosts();
            break
        case "printPosts":
            myPosts.print();
            break;
    }
}


/*function CreateNewPost(username,time,company,taxiNum){
   let li = document.createElement('li');
   li.innerHTML = `<div class="post font-Marcellius">
							<img id="User-img" src="img/user.png">
						    <p class="User content">${username}</p>
						    <p class="Time content">${time}</p>
						<div class="main-context">
						<div>
							<p class="content">Taxi company:</p>
							<p class="content">${company}</p>
						</div>
						<div>
							<p class="content">Taxi number:</p>
						    <p class="content">${taxiNum}</p>
						</div>\
						<div>\
							<img height="30px" src="img/like.png">\
							<p class="buttons">Do you like<br>this service?</p>\
							<img height="30px" src="img/edit.png">\
						    <p class="buttons">Edit</p>\
						</div>\
					</div>`
	return li;
}
var postsList = document.getElementById('posts-list');
postsList.appendChild(CreateNewPost("@Marvellson","11.11.11 11:25","Pic taxi","15486"));*/