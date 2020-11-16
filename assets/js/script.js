const githubUrl = "https://api.github.com/graphql";
const accessToken = "48c8cb430f8c3c7799ee3628b6227f5e48873c22";
let displayName = document.getElementById("user-full-name");
let userName = document.getElementById("githubusername");
let profilePic = document.getElementById("profile-pic");
let profilePicHeader = document.getElementById("profile-pic-header");
let profilePicMenu = document.getElementById("profile-pic-menu");
let headerMenu = document.getElementById("header-menu");
let userNameMenu = document.getElementById("githubusernamemenu");
let bio = document.getElementById("bio");
let repoTotalCount = document.getElementById("repoCount");
let numberRepo = document.getElementById("repo-number");
//nav bar
let navBar = document.getElementById("nav-bar");
navBar.onclick = () => {
  if (headerMenu.style.display === "block") {
    headerMenu.style.display = "none";
  } else {
    headerMenu.style.display = "block";
  }
};

const query = `
  query {
          viewer {
      avatarUrl
      login
      name
      bio
      repositories(first: 15) {
          totalCount
          nodes {
              name
              forkCount
              stargazerCount
              updatedAt
              description
              isFork
              primaryLanguage{
                name
              }
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
    // bio.innerHTML = userinfo.bio
    userName.innerHTML = userinfo.login;
    userNameMenu.innerHTML = userinfo.login;
    bio.innerHTML = userinfo.bio;
    profilePic.src = userinfo.avatarUrl;
    profilePicHeader.src = userinfo.avatarUrl;
    profilePicMenu.src = userinfo.avatarUrl;
    repoTotalCount.innerHTML = userinfo.repositories.totalCount;
    numberRepo.innerHTML = userinfo.repositories.totalCount;

    //display repos
    let repos = userinfo.repositories.nodes;
    repos.forEach(repo => {
      const repoCon = document.createElement("div");
      repoCon.setAttribute("class", "repo-container");
      const repoInfo = document.getElementById("repo-info");
      repoInfo.appendChild(repoCon);
      //create-element for repo name with h2 element
      const repoName = document.createElement("a");
      repoName.setAttribute("class", "repo-name");
      repoName.textContent = repo.name;
      repoCon.appendChild(repoName);

      //if forked
      const ifForked = document.createElement("span");
      ifForked.setAttribute("class", "if-forked");
      if (repo.isFork === true) {
        ifForked.textContent = `forked from ${repo.name}/${repo.name}`;
      }
      repoInfo.appendChild(ifForked);

      //create element for repo description
      const repoDescription = document.createElement("p");
      repoDescription.setAttribute("class", "repo-description");
      repoDescription.textContent = repo.description;
      repoInfo.appendChild(repoDescription);

      //create container for fork count, starrred count
      const fSCountContainer = document.createElement("div");
      fSCountContainer.setAttribute("class", "fSCountContainer");
      repoInfo.appendChild(fSCountContainer);

      //create element for fork count
      const repoForkCount = document.createElement("a");
      fSCountContainer.appendChild(repoForkCount);
      repoForkCount.setAttribute("class", "fork-count");
      repoForkCount.innerText = ` ${repo.forkCount}`;
      if (repo.forkCount === 0) {
        repoForkCount.style.display = "none";
      }

      //create element for strredcount
      const repoStarCount = document.createElement("p");
      fSCountContainer.appendChild(repoStarCount);
      repoStarCount.setAttribute("class", "star-count");
      repoStarCount.innerText = ` ${repo.stargazerCount}`;
      if (repo.stargazerCount === 0) {
        repoStarCount.style.display = "none";
      }

      //get date for updated repos
      //   const updatedRepoDate = () => {
      //     let d = new Date();

      //     let repodate = repo.updatedAt;
      //   };
      //   create element to show updated text

      //   //   primary language
      //   const primaryLanguage = document.createElement("span");
      //   fSCountContainer.appendChild(primaryLanguage);
      //   primaryLanguage.setAttribute("class", "primary-language");
      //   primaryLanguage.innerText = ` ${repo.primaryLanguage.name}`;

      const date = new Date().getDay();
      const updatedDate = document.createElement("span");
      fSCountContainer.appendChild(updatedDate);
      updatedDate.setAttribute("class", "updatedDate");
      updatedDate.innerText = `Updated on ${repo.updatedAt}`;

      //star container
      const starContainer = document.createElement("div");
      starContainer.setAttribute("class", "star-container");
      repoCon.appendChild(starContainer);

      //star button

      const starCon = document.createElement("button");
      starCon.setAttribute("class", "star-con");
      starCon.textContent = " Star";
      repoCon.appendChild(starCon);

      //horizontal line
      const hr = document.createElement("hr");
      repoInfo.appendChild(hr);
    });
  })
  .catch(err => {
    console.log(err);
  });
