init();
async function init() {
  await getAllPublicPosts();
  await getAllComments();
}
async function getAllPublicPosts() {
  document.querySelector(".post-table-body").innerHTML="";
  let response = await fetch(`api/users/getAllPosts`);
  let responseJson = await response.json();
  if (responseJson.length == 0) {
    document.querySelector(".post-table-body").innerHTML = "<tr>You don't have shared post</tr>";
  } else {
    let copyResponseJson = responseJson.map((post) => {
      return ` <tr>
    <td>${post.created_date}</td>
    <td><div style="font-size:20px;font-style:bold;">${post.title}</div><div>${post.description}</div></td>
    <td><a href="forum.html#${post._id}">Detail</a></td>
    <td><button onclick="deletePublicPost('${post._id}')">Delete</button></td>
  </tr>`;
    });
    // console.log("copyresponsejson", copyResponseJson)
    let tbody = document.querySelector(".post-table-body");
    copyResponseJson.forEach((post) => {
      tbody.innerHTML += post;
    });
  }
}

async function deletePublicPost(id) {
  let response = await fetch("api/users/postId?id=" + id, {
    method: "DELETE",
  });
  let responseJAon = await response.json();
  // console.log(responseJAon.status);
  if (responseJAon.status == "success") {
    init();
  } else {
    alert(responseJAon.error);
  }
}


async function getAllComments() {
   document.querySelector(".comment-table-body").innerHTML="";
  let response = await fetch(`api/users/getAllComments`);
  let responseJson = await response.json();
  if (responseJson.length == 0) {
    document.querySelector(".comment-table-body").innerHTML =
      "<tr>You don't have shared post</tr>";
  } else {
    let copyResponseJson = responseJson.map((post) => {
      return ` <tr>
    <td>${post.created_date}</td>
    <td><div>"${post.comment}"</div></td>
    <td><a href="forum.html#${post.post}">Detail</a></td>
    <td><button onclick="deleteComment('${post._id}')">Delete</button></td>
  </tr>`;
    });
    // console.log("copyresponsejson", copyResponseJson)
    let tbody = document.querySelector(".comment-table-body");
    copyResponseJson.forEach((post) => {
      tbody.innerHTML += post;
    });
  }
}

async function deleteComment(id) {
  let response = await fetch("api/users/commentId?id=" + id, {
    method: "DELETE",
  });
  let responseJAon = await response.json();
  // console.log(responseJAon.status);
  if (responseJAon.status == "success") {
    init();
  } else {
    alert(responseJAon.error);
  }
}

