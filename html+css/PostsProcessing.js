class User {
    constructor() {
        this._name = "";
    }

    static getName() {
        return this._name;
    }
    static setName(username){
        this._name = username;
    }
}


function makePost(name,phone, id, user, date, company, taxiNum) {
    if (typeof user == "string")
        if (typeof date == "object")
            if (typeof id == "string" && RegExp("^[0-9]+$").test(id))
                if (typeof company == "string" && typeof taxiNum == "string") {
                    return {
                        id,
                        user,
                        date,
                        company,
                        taxiNum,
                        name,
                        phone
                    };

                }
}

class PostProcessing {
    #nextID;
    constructor(postsToAdd) {
        this._posts = postsToAdd;
        this.#loadPosts();
        ViewPosts.maxPostsCount  = this._posts.length;
    }
    #loadPosts() {
        this._posts.push(makePost("N","pj","1", "User1", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","2", "User2", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","3", "User3", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","4", "User4", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","5", "User", new Date("11.21.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","6", "User", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","7", "User", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","8", "User", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","9", "User1", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","10", "User2", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","11", "User3", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","12", "User4", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","13", "User4", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","14", "User3", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","15", "User1", new Date("01.12.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","16", "User", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","17", "User", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","18", "User1", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","19", "M Alice", new Date("01.11.11 02:15"), "KLD", "7584"));
        this._posts.push(makePost("N","pj","20", "User5", new Date("01.11.11 02:15"), "KLD", "7584"));
        this.#nextID=21;
        localStorage.setItem("posts",JSON.stringify(this._posts));
        localStorage.setItem('postsNextID',this.#nextID.toString());
    }

    getPostById(id) {
        return this._posts.find((el, elId, arr) => {
            return el.id === id;
        });
    }

    validatePost(Post) {
        if (typeof Post.user == "string")
            if (typeof Post.date == "object")
                if (typeof Post.id == "string" && RegExp("^[0-9]+$").test(Post.id))
                    if (typeof Post.company == "string" && typeof Post.taxiNum == "string") return true;
        return false;
    }

    addPost(Post) {
        if (this.validatePost(Post)) {
            this._posts.push(Post);
            ViewPosts.maxPostsCount++;
            localStorage.setItem("postsOnPage",ViewPosts.postsOnPage.toString());
            ViewPosts.updateShowButton();
            this.#nextID++;
            localStorage.setItem("posts",JSON.stringify(this._posts));
            localStorage.setItem('postsNextID',this.#nextID.toString());
            return true;
        } else return false;
    }
    getNextID(){
        return this.#nextID;
    }

    addAll(postsToAdd) {
        let flag = true;
        postsToAdd.forEach((el) => {
            if (!this.addPost(el)) flag = false;
        });
        return flag;
    }

    getPosts(skip = 0, top = 10, filterConfig = {user: null, timeFrom: null, timeTo: null}) {
        return this._posts.filter(el => (filterConfig.user == null || filterConfig.user === el.user)
            && (filterConfig.timeFrom == null || filterConfig.timeFrom <= el.date)
            && (filterConfig.timeTo == null || filterConfig.timeTo >= el.date)).slice(skip, skip + top);
    }


    editPost(id, Post) {
        for (let i = 0; i < this._posts.length; i++) {
            if (this._posts[i].id === id) {
                this._posts[i] = Post;
                ViewPosts.editPost(i,Post);
                return true;
            }
        }
        localStorage.setItem("posts",JSON.stringify(this._posts));
        return false;
    }

    removePost(id) {
        let flag = false;
        for (let i = 0; i < this._posts.length; i++) {
            if (!flag) {
                if (this._posts[i].id === id) {
                    ViewPosts.maxPostsCount--;
                    localStorage.setItem("postsOnPage",ViewPosts.postsOnPage.toString());
                    ViewPosts.removePost(i);
                    flag = true;
                }
            } else {
                this._posts[i - 1] = this._posts[i];
            }
        }
        if (flag) {
            this._posts.pop();
            localStorage.setItem("posts",JSON.stringify(this._posts));
        }
        return flag;
    }
    getPostsNum() {
        return this._posts.length;
    }
    loadFromLocal(){
        if(localStorage.getItem('postsNextID')!=null)this.#nextID = parseInt(localStorage.getItem('postsNextID'));
        if(localStorage.getItem("posts")!=null)this._posts = JSON.parse(localStorage.getItem("posts"));
    }
}