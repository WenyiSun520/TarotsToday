getAllPublicPost();
async function getAllPublicPost() {
  let allPosts = await fetch("api/forum");
  let responseJson = await allPosts.json();
  // console.log("all post",responseJson)

  document.querySelector(".main-post").innerHTML = "";
  for (let i = 0; i < responseJson.length; i++) {
    let post = responseJson[i];
    // console.log("post", post)
    let result = ` <div id= "${post._id}" class="public-post">
    <div class="post-detail">
    <h1 class="post-title">${post.title}</h1>
    <p class="post-username">${post.username}, ${post.created_date}</p>
    <p class="post-content">${post.description}</p>
    </div>
    <div class="public-post-preview">${await previewPublicPost(post)}</div>

    <div class="display">
    <button class="likePost-btn" onclick="likePost('${
      post._id
    }')">&#128077;</button>${post.like.length} 
    <button class="dislikePost-btn" onclick="dislikePost('${
      post._id
    }')">&#128078</button> ${post.dislike.length} 
    <button class="addcomment-btn" onclick="displayCommentBox('${
      post._id
    }')">Add Comment</button>
    <button class="displayComments-btn" onclick="getAllComments('${
      post._id
    }')">&#9660;</button>
    </div>
    <div class="add-comments add-comments-${post._id}">
            <h2>Share Your Thoughts: </h2>
            <textarea class="public-comment-${
              post._id
            }" rows="5" cols="50" placeholder="Add comment..."></textarea>
            <button type="submit" onclick="addComment('${
              post._id
            }')">Publish</button>
    </div>
    <div class="all-comments all-comments-${post._id}"></div>
    </div>`;
    document.querySelector(".main-post").innerHTML += result;
  }
}

async function previewPublicPost(post) {
  let result = `<div class="public-post-cards">`;
  let postContentRaw = await fetch(
    `api/forum/user/${post.username}/post/${post.content}`
  );
  let postContentJson = await postContentRaw.json();
  if (postContentJson.status == "success") {
    let imgTags = postContentJson.postObj.cards;
    // console.log("imgTags", imgTags);
    for (let i = 0; i < imgTags.length; i++) {
      result += imgTags[i];
    }
    result += `</div><div class="public-post-journal">${postContentJson.postObj.journal}</div>`;
  } else {
    result = "Can't find your preview post";
  }
  // console.log("previewPublicpost: "+ result)
  return result;
}

async function likePost(id) {
  let likeBtn = document.querySelector(".likePost-btn");
  let response = await fetch(`api/forum/likePost?id=${id}`, {
    method: "POST"
  });
  let responseJson = await response.json();
  if (responseJson.status == "success") {
    likeBtn.classList.toggle("selectedBtn");
    getAllPublicPost();
  } else if (responseJson.status == "fail") {
    alert(responseJson.error);
  }
}
async function dislikePost(id) {
  let dislikeBtn = document.querySelector(".dislikePost-btn");
  let response = await fetch(`api/forum/dislikePost?id=${id}`, {
    method: "POST"
  });
  let responseJson = await response.json();
  if (responseJson.status == "success") {
    dislikeBtn.classList.toggle("selectedBtn");
    getAllPublicPost();
  } else if (responseJson.status == "fail") {
    alert(responseJson.error);
  }
}

async function getAllComments(id) {
  let ele = document.querySelector(`.all-comments-${id}`);
  ele.classList.toggle("show-add-comments-window");
let response = await fetch(`api/forum/getComment?id=${id}`);
let responseJson = await response.json();
// console.log("all comements responseJson: ", responseJson.comments)
if(responseJson.status == "success"){
  let allComments = responseJson.comments;
  ele.innerHTML = "";
  for (let i = 0; i < allComments.length; i++) {
      let post = allComments[i];
      // console.log("postComment: " + post.username + " "+post.created_date);
       let result = ` <div class="comment-box">
               ${post.comment}
               <div class="comment-user-info">${post.username},${post.created_date}</div>
            </div>`;
        ele.innerHTML += result;  
  }  
}
}

function displayCommentBox(id) {
  let ele = document.querySelector(`.add-comments-${id}`);
  ele.classList.toggle("show-add-comments-window");
}

async function addComment(id) {
  let comment = document.querySelector(`.public-comment-${id}`).value;
  let obj = {
    comment: comment,
    id: id,
    date: new Date(),
  };
  let response = await fetch("api/forum/postComment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  let responseJson = await response.json();
  if (responseJson.status == "success") { // hide the commentbox
    document.querySelector(`.public-comment-${id}`).value="";
   displayCommentBox(id); 
    // add sth
  } else if (responseJson.status == "fail") {
    alert(responseJson.error);
  }
}
