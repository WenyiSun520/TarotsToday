let myIdentity = undefined;

async function loadIdentity() {
  try {
    let identityInfo = await fetch(`api/users/myIdentity`)
      .then((res) => res.json());
    if (identityInfo.status == "loggedin") {
      myIdentity = identityInfo.userInfo.name;
    } else {
      //logged out
      myIdentity = undefined;
    }
  } catch (error) {
    myIdentity = undefined;
    identity_div.innerHTML = `<div>
        <button onclick="loadIdentity()">retry</button>
        Error loading identity: <span id="identity_error_span"></span>
        </div>`;
  }

}
