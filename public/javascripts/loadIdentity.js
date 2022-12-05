let myIdentity = undefined;

async function loadIdentity() {
  let identity_div = document.getElementById("name-greeting");
  try {
    let identityInfo = await fetch(`api/users/myIdentity`)
      .then((res) => res.json());
    if (identityInfo.status == "loggedin") {
      myIdentity = identityInfo.userInfo.name;
      identity_div.innerHTML = "Hello, " + myIdentity;
    } else {
      //logged out
      myIdentity = undefined;
      identity_div.innerHTML = `
            <a href="signin" class="btn btn-primary" role="button">Log in</a>`;
    }
  } catch (error) {
    myIdentity = undefined;
    identity_div.innerHTML = `<div>
        <button onclick="loadIdentity()">retry</button>
        Error loading identity: <span id="identity_error_span"></span>
        </div>`;
  }

}
