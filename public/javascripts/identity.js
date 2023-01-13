let myIdentity = undefined;
loadIdentity(); 
// Changes the DOM based on if someone is logged in or not
async function loadIdentity() {
  let identityAllText = document.querySelectorAll(".identity-text");
  let userInfoAll = document.querySelectorAll(".userinfo");
  let userPublicAll = document.querySelectorAll(".userPublic");

  try {
    let identityInfo = await fetchJSON(`api/users/myIdentity`);
    if (identityInfo.status == "loggedin") {
      // If logged in, display save button and log out button, don't display login button
      myIdentity = identityInfo.userInfo.username;
      // display username on userinfo.html page
      if (document.getElementById("userInfoName") != null){
        document.getElementById("userInfoName").innerHTML = myIdentity;
      }
        identityAllText.forEach(
          (idenidentityText) => (idenidentityText.innerHTML = myIdentity)
        );

      userInfoAll.forEach(
        (userInfoText) =>
          (userInfoText.innerHTML = `
            <a href="/userInfo.html?user=${encodeURIComponent(
              identityInfo.userInfo.username
            )}">Manage Your Readings</a>`)
      );

      userPublicAll.forEach(
        (userPublicText) =>
          (userPublicText.innerHTML = `
            <a href="/userPublic.html?user=${encodeURIComponent(
              identityInfo.userInfo.username
            )}">Manage Your Post And Comment</a>`)
      );

      if (document.getElementById("saveButton")) {
        document.getElementById("saveButton").classList.remove("d-none");
      }
      if (document.querySelector(".dropdown")) {
        document.querySelector(".dropdown").classList.remove("d-none");
      }
      if (document.getElementById("logoutLink")) {
        document.getElementById("logoutLink").classList.remove("d-none");
      }
      if (document.getElementById("loginLink")) {
        document.getElementById("loginLink").classList.add("d-none");
      }
    } else {
      // If not logged in, don't display save button and log out, display login button
      myIdentity = undefined;
      if (document.getElementById("saveButton")) {
        document.getElementById("saveButton").classList.add("d-none");
      }
       if (document.querySelector(".dropdown")) {
         document.querySelector(".dropdown").classList.add("d-none");
       }
      if (document.getElementById("logoutLink")) {
        document.getElementById("logoutLink").classList.add("d-none");
      }
      if (document.getElementById("loginLink")) {
        document.getElementById("loginLink").classList.remove("d-none");
      }
      if (document.getElementById("journalEntry")) {
        document.getElementById("journalEntry").classList.add("d-none");
      }
      if (document.getElementById("journalDescription")) {
        document.getElementById("journalDescription").classList.add("d-none");
      }
    }
  } catch (error) {
    myIdentity = undefined;
    if (document.getElementById("saveButton")) {
      document.getElementById("saveButton").classList.add("d-none");
    }
    if (document.getElementById("logoutLink")) {
      document.getElementById("logoutLink").classList.add("d-none");
    }
    if (document.getElementById("loginLink")) {
      document.getElementById("loginLink").classList.remove("d-none");
    }
  }
  
}
