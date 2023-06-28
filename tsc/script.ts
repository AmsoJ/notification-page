// selected elements
const notificationMain : any = document.querySelector(".notification-main");
const numberOfNotifications : any = document.querySelector(".count");
const markAll : any = document.querySelector(".mark-all");

// The different data to manipulate the dom
const notificationData : {
    name: string,
    action: string,
    post: string,
    time: {x: number, y: string},
    image: string,
    condition : string
}[] = [{
        name: "Anna Kim",
        action: "left",
        post: "Chess Club",
        time: {x: 2, y: "weeks"},
        image: "./../assets/images/avatar-anna-kim.webp",
        condition: "read"
    }, 
    {
        name: "Nathan Peterson",
        action: "reaction",
        post: "5 end-game strategies to increase your win rate",
        time: {x: 2, y: "weeks"},
        image: "./../assets/images/avatar-nathan-peterson.webp",
        condition: "read"
    },
    {
        name: "Kimberly Smith",
        action: "picture",
        post: "./../assets/images/image-chess.webp",
        time: {x: 1, y: "week"},
        image: "./../assets/images/avatar-kimberly-smith.webp",
        condition: "read"
    },
    {
        name: "Risky Hasanuddin",
        action: "message",
        post: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
        time: {x: 5, y: "days"},
        image: "./../assets/images/avatar-rizky-hasanuddin.webp",
        condition: "read"
    },
    {
        name: "Jacob Thompson",
        action: "join",
        post: "ChessClub",
        time: {x: 1, y: "day"},
        image: "./../assets/images/avatar-jacob-thompson.webp",
        condition: "unread"
    },
    {
        name: "Angela Gray",
        action: "follow",
        post: "",
        time: {x: 5, y: "m"},
        image: "./../assets/images/avatar-angela-gray.webp",
        condition: "unread"
    },
    {
        name: "Mark Webber",
        action: "reaction",
        post: "My first tournament today!",
        time: {x: 1, y: "m"},
        image: "./../assets/images/avatar-mark-webber.webp",
        condition: "unread"
    }
]

// event listeners
window.addEventListener("DOMContentLoaded", () => {
    let index : number = 0, maxLimit : number  = notificationData.length - 1;
    let timeInterval = setInterval(()=> {
        let userInterface = notificationData[index]; // get structure from notification data
        const {name, post, image, time, condition} = userInterface;
        let userInterfaceUI;
        ++index;
        index > maxLimit && clearInterval(timeInterval); // cut the time interval
        switch(userInterface.action) {
            case "message": userInterfaceUI = message(name, post, image, time, condition); break;
            case "picture": userInterfaceUI = picture(name, post, image, time, condition); break;
            default : userInterfaceUI = UI(name, post, image, time, condition);
        }
        countAndShowUnreadMessages(index, userInterfaceUI);
    }, getTime())

})

markAll.addEventListener("click", () => {
    let elements = [...notificationMain.children];
    elements.forEach(item => item.classList.contains("unread") && item.classList.replace("unread", "read"));
    numberOfNotifications.textContent = 0;
})

// set timeout to show and count the unread mesages
function countAndShowUnreadMessages(index : number, htmlStructure : any) {
    notificationMain.innerHTML += htmlStructure;
    setTimeout(() => {
        notificationMain.children[index - 1].classList.add("activate"); // for scale up
        notificationMain.children[index - 1].classList.contains("unread") && (numberOfNotifications.innerHTML = parseInt(numberOfNotifications.textContent) + 1);
        [...notificationMain.children].forEach(notify => {
            notify.addEventListener("click", (e: any) => {
                    if(e.currentTarget.classList.contains("unread")) {
                        e.currentTarget.classList.replace("unread", "read");
                        numberOfNotifications.textContent = parseInt(numberOfNotifications.textContent) - 1;
                    }
            })
        })
    }, 10);
}


// creating different ui
function message(name: string, post: string, image: string, time: {x: number, y: string}, condition: string) : any {
    return `<article class="mt-2 single-notification ${condition} row p-2 rounded-2">
        <div class="profile-photo col-1 p-0">
        <img src="${image}" class="img-fluid" alt="gray">
        </div>

        <div class="notification-box col-11 p-0 ps-2 d-flex flex-column align-items-start justify-content-center">
        <p class="notification m-0">
            <b class="name">${name}</b> sent you a private message <b class="post-name"></b> <span class="indicate d-inline-block rounded-circle" style="width: 10px; height: 10px;"></span>
        </p>
        <i class="time"><output>${time.x}</output>${time.y} ago</i>

        <article class="message mt-3 p-2 rounded-2">
            <p class="message-text lead">${post}</p>
        </article>
        </div>
    </article>`
}

// liked a picture or commented on a picture
function picture(name: string, post: string, image: string, time: {x: number, y: string}, condition: string) : any {
   return `<article class="mt-2 single-notification ${condition} row p-2 rounded-2">
   <div class="profile-photo col-1 p-0">
     <img src="${image}" class="img-fluid" alt="gray">
   </div>

   <div class="notification-box col-10 p-0 ps-2 d-flex flex-column align-items-start justify-content-center">
     <p class="notification m-0">
       <b class="name">${name}</b> commented on your picture <span class="indicate d-inline-block rounded-circle" style="width: 10px; height: 10px;"></span>
     </p>
     <i class="time"><output>${time.x}</output>${time.y} ago</i>
   </div>

   <div class="col-1">
     <img src="${post}" class="img-fluid" alt="Image">
   </div>
 </article>`
}

// normal user interface
function UI(name: string, post: string, image: string, time: {x: number, y: string}, condition: string) : any {
    return `<article class="mt-2 single-notification ${condition} row p-2 rounded-2">
        <div class="profile-photo col-1 p-0">
        <img src="${image}" class="img-fluid" alt="gray">
        </div>

        <div class="notification-box col-11 p-0 ps-2 d-flex flex-column align-items-start justify-content-center">
        <p class="notification m-0">
            <b class="name">${name}</b> reacted to your recent post <b class="post-name">${post}</b> <span class="indicate d-inline-block rounded-circle" style="width: 10px; height: 10px;"></span>
        </p>
        <i class="time"><output>${time.x}</output>${time.y} ago</i>
        </div>
    </article>`
}

// fucntion for random time
function getTime() : number {
    return 2000 + Math.floor(Math.random() * 5000);
}
