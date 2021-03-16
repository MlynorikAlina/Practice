let myPosts =  new class postProcessing{
	posts = [];

	loadPosts(filename){
		myPosts.push({
			id: 1;
			user:"@User";
			time:"11.11.11 22:15";
			text:"some data";
		});
		myPosts.push({
			id: 2;
			user:"@User";
			time:"11.11.11 22:15";
			text:"some data";
		});
		myPosts.push({
			id: 3;
			user:"@User";
			time:"11.11.11 22:15";
			text:"some data";
		});
	}
}
myPosts.loadPosts("inputPosts.txt");
