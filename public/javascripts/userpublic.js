async function getAllPublicPosts(){
    let response = await fetch(`'/api/users/getAllPosts`);
    let responseJson = await response.json();
    let copyResponseJson = responseJson.map((post)=>{
            return ` <tr>
    <td>${post.created_date}</td>
    <td><div>${post.title}</div><div>${post.description}</div></td>
    <td><button onclick="deletePublicPost()">Delete</button></td>
  </tr>`;
    })
}

//首页的卡是可以互动的
// about page：加一个search卡片功能
// comments 都集中在第一个post下面了
//不同的用户点赞无法累计