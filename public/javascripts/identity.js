let myIdentity = undefined;

async function loadIdentity() {
    try {
        let identityInfo = await fetchJSON(`api/users/myIdentity`)
        if (identityInfo.status == "loggedin") {
            // If logged in, display save button and log out button, don't display login button
            myIdentity = identityInfo.userInfo.username;
            if (document.getElementById("saveButton")) {
                document.getElementById("saveButton").classList.remove("d-none");
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
            if(document.getElementById("saveButton")){
                document.getElementById("saveButton").classList.add("d-none");
            }
            if (document.getElementById("logoutLink")) {
                document.getElementById("logoutLink").classList.add("d-none");
            }
            if (document.getElementById("loginLink")) {
                document.getElementById("loginLink").classList.remove("d-none");
            }
        }
    } catch (error){
        myIdentity = undefined;
        if(document.getElementById("saveButton")){
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


