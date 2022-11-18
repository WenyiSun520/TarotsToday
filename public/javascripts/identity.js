let myIdentity = undefined;

async function loadIdentity() {
    try {
        let identityInfo = await fetchJSON(`api/users/myIdentity`)
        if (identityInfo.status == "loggedin") {
            myIdentity = identityInfo.userInfo.username;
            if (document.getElementById("saveButton")) {
                console.log("in Save button if")
                document.getElementById("saveButton").classList.remove("d-none");
            }
        } else {
            myIdentity = undefined;
            if(document.getElementById("saveButton")){
                document.getElementById("saveButton").classList.add("d-none");
            }
        }
    } catch (error){
        myIdentity = undefined;
        if(document.getElementById("saveButton")){
            document.getElementById("saveButton").classList.add("d-none");
        }
    }
}


