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
let bioMobiile = document.getElementById("bio-mobile");
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
      repositories(first: 20) {
          totalCount
          nodes {
              name
              forkCount
              stargazerCount
              updatedAt
              description
              isFork
              url
              primaryLanguage{
                color
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
    bioMobiile.innerHTML = userinfo.bio;
    profilePic.src = userinfo.avatarUrl;
    profilePicHeader.src = userinfo.avatarUrl;
    profilePicMenu.src = userinfo.avatarUrl;
    repoTotalCount.innerHTML = userinfo.repositories.totalCount;
    numberRepo.innerHTML = userinfo.repositories.totalCount;

    //display repos
    let repos = userinfo.repositories.nodes;
    repos.forEach(repo => {
      // create a div for repo container
      const repoCon = document.createElement("div");
      repoCon.setAttribute("class", "repo-container");
      // repo info container
      const repoInfo = document.getElementById("repo-info");
      repoInfo.appendChild(repoCon);

      const leftRepoInfo = document.createElement("div");
      leftRepoInfo.setAttribute("class", "left-info");
      repoCon.appendChild(leftRepoInfo);

      const leftRepoCon = document.createElement("div");
      leftRepoInfo.appendChild(leftRepoCon);
      leftRepoCon.setAttribute("class", "left-repo-con");
      //repo information on the left
      //create-element for repo name with h2 element
      let repoName = document.createElement("a");
      repoName.setAttribute("class", "repo-name");
      repoName.href = repo.url;
      repoName.textContent = repo.name;
      leftRepoCon.appendChild(repoName);

      //if forked
      const ifForked = document.createElement("a");
      ifForked.setAttribute("class", "if-forked");
      if (repo.isFork === true) {
        ifForked.textContent = `forked from ${repo.name}/${repo.name}`;
      }
      leftRepoCon.appendChild(ifForked);

      //create element for repo description
      const repoDescription = document.createElement("p");
      repoDescription.setAttribute("class", "repo-description");
      repoDescription.textContent = repo.description;
      leftRepoCon.appendChild(repoDescription);

      //create container for fork count, starrred count
      const fSCountContainer = document.createElement("div");
      fSCountContainer.setAttribute("class", "fSCountContainer");
      leftRepoCon.appendChild(fSCountContainer);

      //   primary language

      //color
      let primaryLanguageColor = repo.primaryLanguage.color;
      const primaryLanguageC = document.createElement("div");
      fSCountContainer.appendChild(primaryLanguageC);
      primaryLanguageC.setAttribute("class", "primary-language-color-c");
      let primaryLangColor = document.createElement("span");
      primaryLangColor.setAttribute("class", "primary-language-color");
      primaryLanguageC.appendChild(primaryLangColor);
      primaryLangColor.style.backgroundColor = primaryLanguageColor;

      //name
      let primaryLanguageText = repo.primaryLanguage.name;
      const primaryLanguageT = document.createElement("span");
      primaryLanguageC.appendChild(primaryLanguageT);
      primaryLanguageT.setAttribute("class", "primary-language");
      primaryLanguageT.innerText = primaryLanguageText;

      //create element for fork count
      const repoForkCount = document.createElement("span");
      fSCountContainer.appendChild(repoForkCount);
      repoForkCount.setAttribute("class", "fork-count");
      repoForkCount.innerText = ` ${repo.forkCount}`;
      if (repo.forkCount === 0) {
        repoForkCount.style.display = "none";
      }

      //create element for strredcount
      const repoStarCount = document.createElement("span");
      fSCountContainer.appendChild(repoStarCount);
      repoStarCount.setAttribute("class", "star-count");
      repoStarCount.innerText = ` ${repo.stargazerCount}`;
      if (repo.stargazerCount === 0) {
        repoStarCount.style.display = "none";
      }

      //get date for updated repos
      const updatedDate = document.createElement("span");
      fSCountContainer.appendChild(updatedDate);
      updatedDate.setAttribute("class", "updatedDate");
      let year = repo.updatedAt;
      let monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "Novermber",
        "December"
      ];

      let dateForm = new Date(year);
      //   let getMins = dateForm.getMinutes();
      //   let getHrs = dateForm.getHours();
      //   if (getHrs < 24 && getMins > 60) {
      //     updatedDate.innerText = `Updated ${getHrs} hours ago}`;
      //   } else {

      //   }
      //get days
      let getDays = dateForm.getDay();
      if (getDays > 31) {
        let getMonthn = monthArray[dateForm.getMonth()];
        updatedDate.innerText = `Updated on ${getMonthn} ${dateForm.getDate()}`;
      } else if (getDays < 31 && getDays > 0) {
        updatedDate.innerText = `Updated ${getDays} days ago}`;
      }
      //get month

      //star container
      const starContainer = document.createElement("div");
      starContainer.setAttribute("class", "star-container");
      repoCon.appendChild(starContainer);

      //star button

      const starCon = document.createElement("button");
      starCon.setAttribute("class", "star-con");
      starCon.textContent = " Star";

      starContainer.appendChild(starCon);

      if (repo.stargazerCount > 0) {
        starCon.textContent = " " + "Unstar";
        starCon.setAttribute("class", "unstar-con");
      }

      //   horizontal line
      const hr = document.createElement("hr");
      repoInfo.appendChild(hr);
    });
  })
  .catch(err => {
    console.log(err);
  });
