/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/edelveiss')
    .then(response => {
        console.log(response);
        entryPoint.append(gitHubCardCreator(response.data));
    })
    .catch(error => {
        console.log('The data was not returned ', error);
    })
    /* Step 2: Inspect and study the data coming back, this is YOUR 
       github info! You will need to understand the structure of this 
       data in order to use it to build your component function 

       Skip to Step 3.
    */

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function gitHubCardCreator(gitHubData) {
    const card = document.createElement('div'),
        userImg = document.createElement('img'),
        cardInfo = document.createElement('div'),
        nameH3 = document.createElement('h3'),
        userName = document.createElement('p'),
        location = document.createElement('p'),
        profile = document.createElement('p'),
        gitHubAddress = document.createElement('a'),
        followers = document.createElement('p'),
        following = document.createElement('p'),
        bio = document.createElement('p');

    //-----------class adding----------
    card.classList.add('card');
    cardInfo.classList.add('card-info');
    nameH3.classList.add('name');
    userName.classList.add('username');
    //------------content adding-----------
    userImg.src = gitHubData.avatar_url;
    userImg.alt = `Avatar of ${gitHubData.name}`;
    nameH3.textContent = gitHubData.name;
    userName.textContent = gitHubData.login;
    location.textContent = `Location: ${gitHubData.location}`;
    gitHubAddress.href = gitHubData.html_url;
    gitHubAddress.target = "_blank";


    gitHubAddress.textContent = gitHubData.html_url;
    profile.textContent = `Profile: `;
    followers.textContent = `Followers: ${gitHubData.followers}`;
    following.textContent = `Following: ${gitHubData.following}`;
    bio.textContent = `Bio: ${gitHubData.bio}`;
    //------------element appending-----------
    card.appendChild(userImg);
    card.appendChild(cardInfo);
    cardInfo.appendChild(nameH3);
    cardInfo.appendChild(userName);
    cardInfo.appendChild(location);
    cardInfo.appendChild(profile);
    profile.appendChild(gitHubAddress);
    cardInfo.appendChild(followers);
    cardInfo.appendChild(following);
    cardInfo.appendChild(bio);

    return card;
}
const entryPoint = document.querySelector('.cards');
console.log(entryPoint);


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
const followersArray = [
    'https://api.github.com/users/tetondan',
    'https://api.github.com/users/dustinmyers',
    'https://api.github.com/users/justsml',
    'https://api.github.com/users/luishrd',
    'https://api.github.com/users/bigknell',

];

followersArray.forEach(link => {
    axios.get(link)
        .then(response => {
            //console.log(response);
            entryPoint.append(gitHubCardCreator(response.data));
        })
        .catch(error => {
            console.log('The data was not returned ', error);
        })

})

//---------Stretch Goals---------------

axios.get('https://api.github.com/users/edelveiss')
    .then(response => {
        console.log(response.data.followers_url);
        axios.get(response.data.followers_url)
            .then(response => {
                console.log(response.data);
                response.data.forEach(item => {

                    //---------------------
                    axios.get('https://api.github.com/users/' + item.login)
                        .then(response => {

                            entryPoint.append(gitHubCardCreator(response.data));
                        })
                        .catch(error => {
                            console.log('The data was not returned ', error);
                        })
                        //--------------------

                })

            })

    })



.catch(error => {
    console.log('The data was not returned ', error);
})