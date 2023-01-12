getAllPublicPost();
async function getAllPublicPost() {
  let allPosts = await fetch("api/forum");
  let responseJson = await allPosts.json();
  // console.log("all post",responseJson)

  document.querySelector(".main-post").innerHTML = "";
  for (let i = 0; i < responseJson.length; i++) {
    let post = responseJson[i];
    // console.log("post", post)
    let result = ` <div class="public-post">
                        <h1 class="post-title">${post.title}</h1>
                        <p class="post-username">${post.username}</p>
                         <p class="post-content">${post.description}<p>
                         <div class="public-post-preview">${await previewPublicPost(
                           post
                         )}<div>
                         <div class="display-triangle">&#9660;</div>
          </div>`;
    document.querySelector(".main-post").innerHTML += result;
  }
}

async function previewPublicPost(post) {
    let result=`<div class="public-post-cards">`;
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
  console.log("previewPublicpost: "+ result)
  return result;
}
