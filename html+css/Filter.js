class Filter {
    static #tempFilterConfig = {user: null, timeFrom: null, timeTo: null};

    static filterByUser(inputUser) {
        if (typeof inputUser.value == "string" && RegExp("^[0-9a-zA-z\\s]+$").test(inputUser.value)) {
            inputUser.style.color = '#848484';
            Filter.#tempFilterConfig.user = inputUser.value;
        } else {
            inputUser.style.color = '#FF0000';
            Filter.#tempFilterConfig.user = null;
        }
    }

    static filterByTimeFrom(inputTimeFrom) {
        if (typeof inputTimeFrom.value == "string" && RegExp("^[0-9]{2}\.[0-9]{2}\.[0-9]{2}\\s[0-9]{2}:[0-9]{2}$").test(inputTimeFrom.value)) {
            inputTimeFrom.style.color = '#848484';
            Filter.#tempFilterConfig.timeFrom = new Date(inputTimeFrom.value);
        } else {
            inputTimeFrom.style.color = '#FF0000';
        }
    }

    static filterByTimeTo(inputTimeTo) {
        if (typeof inputTimeTo.value == "string" && RegExp("^[0-9]{2}\.[0-9]{2}\.[0-9]{2}\\s[0-9]{2}:[0-9]{2}$").test(inputTimeTo.value)) {
            inputTimeTo.style.color = '#848484';
            Filter.#tempFilterConfig.timeTo = new Date(inputTimeTo.value);
        } else {
            inputTimeTo.style.color = '#FF0000';
        }
    }

    static filterPosts() {
        let postsList = document.getElementById('posts-list');
        let showMoreButton = document.getElementById('show-more');
        while (postsList.firstChild) {
            postsList.removeChild(postsList.firstChild);
        }
        ViewPosts.postsOnPage = 0;
        let posts = myPosts.getPosts(ViewPosts.postsOnPage, myPosts.getPostsNum(), Filter.#tempFilterConfig);
        ViewPosts.maxPostsCount = posts.length;
        if (posts.length !== 0) {
            posts.slice(ViewPosts.postsOnPage, 10).forEach((el) => {
                postsList.appendChild(CreateNewPost(el));
                ViewPosts.postsOnPage++;
            });
        } else {
            let li = document.createElement('li');
            li.innerHTML = `<img src="img/no_results.jpg">`;
            li.style.textAlign = "center";
            li.style.backgroundColor = "transparent";
            postsList.appendChild(li);
        }
        ViewPosts.updateShowButton();
        if (ViewHeader.postsOnPage >= ViewHeader.maxPostsCount) {
            showMoreButton.style.display = "none";
        }
    }
    static getFilterConfig(){
        return Filter.#tempFilterConfig;
    }
}