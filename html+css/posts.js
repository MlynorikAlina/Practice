
class postProcessing{

	constructor(postsToAdd){
		this._posts = postsToAdd;
	}
	loadPosts(){
		this._posts.push(this.#makePost("1","@User1","2011.01.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User1","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User","2011.11.11 02:15","KLD","7584"));
		this._posts.push(this.#makePost("1","@User5","2001.11.15 02:15","KLD","7584"));
	}

	print(){
		console.log(this._posts);
	}
	#makePost(id,user,time,company,taxiNum){
	if(typeof user == "string" && RegExp("^@[0-9a-zA-z]+$").test(user))
			if(typeof time == "string" && RegExp("^[0-9]{4}\.[0-9]{2}\.[0-9]{2}\\s[0-9]{2}:[0-9]{2}$").test(time))
				if(typeof id == "string" && RegExp("^[0-9]+$").test(id))
					if(typeof company == "string" && typeof taxiNum == "string"){
	                    let date = new Date(Date.parse(time.replace( /(\d{4})\.(\d{2})\.(\d{4})/, '$3-$2-$1')));
	                    return{
	                    	id,
	                    	user,
	                    	date,
	                    	company,
	                    	taxiNum
	                    };
		
	}
    }

	getPostById(id){
		return this._posts.find((el,elId,arr)=>{return el.id == id;});
	}
	validatePost(Post){
		if(typeof Post.user == "string" && RegExp("^@[0-9a-zA-z]+$").test(Post.user))
			if(typeof Post.time == Date)
				if(typeof Post.id == "string" && RegExp("^[0-9]+$").test(Post.id))
					if(typeof Post.company == "string"&&typeof Post.taxiNum == "string") return true;
		return false;
	}
	addPost(Post) {
		if(validatePost(Post))this._posts.push(Post);
		else alert("Error::addPost");
	}
	addAll(postsToAdd){
		postsToAdd.forEach((el)=>{if(this.validatePost(el))this._posts.push(el);});
	}
	getPosts(skip = 0, top = 10, filterConfig = {user:null,timeFrom:null,timeTo:null}){
		return this._posts.filter(el=>(filterConfig.user == null || filterConfig.user == el.user) 
			&& (filterConfig.timeFrom == null|| filterConfig.timeFrom<= el.time) && (filterConfig.timeTo == null ||filterConfig.timeTo >= el.time)).slice(skip,skip+top);
	}
	getPostsNum(){
		return this._posts.length;
	}
	
}

function command(cmnd,id=1)  {
    switch(cmnd)  {
        case "loadPosts":
            myPosts.loadPosts();
            break
        case "printPosts":
            myPosts.print();
            break;
        case "getPostById":
            console.log(myPosts.getPostById(id));
            break;
        case "validatePost":
            console.log(myPosts.validatePost(myPosts.getPostById(id)));
            break;

    }
}

function CreateNewPost(Post){
   let li = document.createElement('li');
   options = {
   year: '2-digit', month: '2-digit', day: '2-digit',
   hour: '2-digit', minute: '2-digit',
   hour12: false
   };
   li.innerHTML = `<div class="post font-Marcellius">
							<img id="User-img" src="img/user.png">
						    <p class="User content">${Post.user}</p>
						    <p class="Time content">${new Intl.DateTimeFormat('en-GB',options).format(Post.date)}</p>
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
							<img height="30px" src="img/edit.png">\
						    <p class="buttons">Edit</p>\
						</div>\
					</div>`
	return li;
}


let myPosts =  new postProcessing(new Array());
let postsOnPage = 0;
let filterConfig = {user:null,timeFrom:null,timeTo:null};
let tempFilterConfig = {user:null,timeFrom:null,timeTo:null};
let maxPostsCount = 0;

myPosts.loadPosts();

document.addEventListener("DOMContentLoaded",function(){
	let postsList = document.getElementById('posts-list');
	maxPostsCount = myPosts.getPostsNum();
    myPosts.getPosts().forEach((el)=>{postsList.appendChild(CreateNewPost(el))});
    postsOnPage += 10;
});

function showMore(button){
	let postsList = document.getElementById('posts-list');
	myPosts.getPosts(postsOnPage,10,filterConfig).forEach((el)=>{postsList.appendChild(CreateNewPost(el))});
	postsOnPage += 10;
	if(postsOnPage >= maxPostsCount){
		button.style.display = "none";
	}
}
function filterByUser(inputUser){
	if(typeof inputUser.value == "string" && RegExp("^@[0-9a-zA-z]+$").test(inputUser.value)){
		inputUser.style.color = '#848484';
		tempFilterConfig.user = inputUser.value;
	}else{
		inputUser.style.color = '#FF0000';
	}
}
function filterByTimeFrom(inputTimeFrom){
	if(typeof inputTimeFrom.value == "string" && RegExp("^[0-9]{4}\.[0-9]{2}\.[0-9]{2}\\s[0-9]{2}:[0-9]{2}$").test(inputTimeFrom.value)){
		inputTimeFrom.style.color = '#848484';
		tempFilterConfig.timeFrom = inputTimeFrom.value;
	}else{
		inputTimeFrom.style.color = '#FF0000';
	}
}
function filterByTimeTo(inputTimeTo){
	if(typeof inputTimeTo.value == "string" && RegExp("^[0-9]{4}\.[0-9]{2}\.[0-9]{2}\\s[0-9]{2}:[0-9]{2}$").test(inputTimeTo.value)){
		inputTimeTo.style.color = '#848484';
		tempFilterConfig.timeTo = inputTimeTo.value;
	}else{
		inputTimeTo.style.color = '#FF0000';
	}
}
function filterPosts(){
	filterConfig = tempFilterConfig;

	postsList = document.getElementById('posts-list');
	showMoreButton = document.getElementById('show-more');
	showMoreButton.style.display = 'inline-block';
    while (postsList.firstChild) {
    postsList.removeChild(postsList.firstChild);
    }
    postsOnPage = 0;
    let posts = myPosts.getPosts(postsOnPage,myPosts.getPostsNum(),filterConfig);
    maxPostsCount = posts.length;
    if(posts.length != 0){
    	posts.slice(postsOnPage,10).forEach((el)=>{postsList.appendChild(CreateNewPost(el))});
    	postsOnPage += 10;
    }else{
    	 let li = document.createElement('li');
    	 li.innerHTML='No results';
    	 postsList.appendChild(li);
    }
    if(postsOnPage >= maxPostsCount){
		showMoreButton.style.display = "none";
	}
}