const githubUrl = "https://api.github.com/graphql";
const accessToken = "048d4afc2493ebf50232df7e622c796ac98d3228";
let displayName = document.getElementById("user-full-name");
let userName = document.getElementById("githubusername");
let profilePic = document.getElementById("profile-pic");
let repoTotalCount = document.getElementById("repoCount");
//   let repoName = document.querySelector(".repo-name");

const query = `
  query {
          viewer {
      avatarUrl
      login
      name
      repositories(first: 10) {
          totalCount
          nodes {
              name
              forkCount
              stargazerCount
              updatedAt
            }
      }
    }
  }
        `;
const options = {
  method: "post",

  headers: {
    "Content-type": "application/json;charset=UTF-8",
    "Access-Control-Request-Headers": "Location",
    Authorization: "bearer " + accessToken
  },
  body: JSON.stringify({ query })
};

fetch(githubUrl, options)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let userinfo = data.data.viewer;
    displayName.innerHTML = userinfo.name;
    userName.innerHTML = userinfo.login;
    profilePic.src = userinfo.avatarUrl;
    repoTotalCount.innerHTML = userinfo.repositories.totalCount;
    //display repos
    let repos = userinfo.repositories.nodes;
    repos.forEach(repo => {
      const repoCon = document.createElement("div");
      repoCon.setAttribute("class", "repo-container");
      const repoInfo = document.getElementById("repo-info");
      repoInfo.appendChild(repoCon);
      const repoName = document.createElement("h2");
      repoName.setAttribute("class", "repo-name");
      repoName.textContent = repo.name;
      repoCon.appendChild(repoName);
      const hr = document.createElement("hr");
      repoInfo.appendChild(hr);
      const starCon = document.createElement("button");
      starCon.textContent = "Star";
      repoCon.appendChild(starCon);
    });
  })
  .catch(err => {
    console.log(err);
  });
