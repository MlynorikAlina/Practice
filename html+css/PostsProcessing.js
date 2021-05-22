class User {
    constructor(username) {
        this._name = username;
    }

    getName() {
        return this._name;
    }
}

let user = new User("M Alice");

function makePost(id, user, time, company, taxiNum) {
    if (typeof user == "string" && RegExp("^[0-9a-zA-z\\s]+$").test(user))
        if (typeof time == "string" && RegExp("^[0-9]{2}\.[0-9]{2}\.[0-9]{2}\\s[0-9]{2}:[0-9]{2}$").test(time))
            if (typeof id == "string" && RegExp("^[0-9]+$").test(id))
                if (typeof company == "string" && typeof taxiNum == "string") {
                    let date = new Date(time);
                    return {
                        id,
                        user,
                        date,
                        company,
                        taxiNum
                    };

                }
}

class PostProcessing {

    constructor(postsToAdd) {
        this._posts = postsToAdd;
        this.#loadPosts();
        ViewPosts.maxPostsCount  = this._posts.length;
    }
    #loadPosts() {
        this._posts.push(makePost("1", "User1", "01.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("2", "User2", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("3", "User3", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("4", "User4", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("5", "User", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("6", "User", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("7", "User", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("8", "User", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("9", "User1", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("10", "User2", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("11", "User3", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("12", "User4", "01.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("13", "User4", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("14", "User3", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("15", "User1", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("16", "User", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("17", "User", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("18", "User1", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("19", "M Alice", "11.11.11 02:15", "KLD", "7584"));
        this._posts.push(makePost("20", "User5", "11.11.11 02:15", "KLD", "7584"));
    }

    getPostById(id) {
        return this._posts.find((el, elId, arr) => {
            return el.id === id;
        });
    }

    validatePost(Post) {
        if (typeof Post.user == "string" && RegExp("^[0-9a-zA-z\\s]+$").test(Post.user))
            if (typeof Post.date == "object")
                if (typeof Post.id == "string" && RegExp("^[0-9]+$").test(Post.id))
                    if (typeof Post.company == "string" && typeof Post.taxiNum == "string") return true;
        return false;
    }

    addPost(Post) {
        if (this.validatePost(Post)) {
            this._posts.push(Post);
            ViewPosts.maxPostsCount++;
            ViewPosts.updateShowButton();
            return true;
        } else return false;
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
        return false;
    }

    removePost(id) {
        let flag = false;
        for (let i = 0; i < this._posts.length; i++) {
            if (!flag) {
                if (this._posts[i].id === id) {
                    ViewPosts.maxPostsCount--;
                    ViewPosts.removePost(i);
                    flag = true;
                }
            } else {
                this._posts[i - 1] = this._posts[i];
            }
        }
        if (flag) this._posts.pop();
        return flag;
    }
    getPostsNum() {
        return this._posts.length;
    }
}