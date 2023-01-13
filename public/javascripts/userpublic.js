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

