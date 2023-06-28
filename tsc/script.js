var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// selected elements
var notificationMain = document.querySelector(".notification-main");
var numberOfNotifications = document.querySelector(".count");
var markAll = document.querySelector(".mark-all");
// The different data to manipulate the dom
var notificationData = [{
        name: "Anna Kim",
        action: "left",
        post: "Chess Club",
        time: { x: 2, y: "weeks" },
        image: "./../assets/images/avatar-anna-kim.webp",
        condition: "read"
    },
    {
        name: "Nathan Peterson",
        action: "reaction",
        post: "5 end-game strategies to increase your win rate",
        time: { x: 2, y: "weeks" },
        image: "./../assets/images/avatar-nathan-peterson.webp",
        condition: "read"
    },
    {
        name: "Kimberly Smith",
        action: "picture",
        post: "./../assets/images/image-chess.webp",
        time: { x: 1, y: "week" },
        image: "./../assets/images/avatar-kimberly-smith.webp",
        condition: "read"
    },
    {
        name: "Risky Hasanuddin",
        action: "message",
        post: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
        time: { x: 5, y: "days" },
        image: "./../assets/images/avatar-rizky-hasanuddin.webp",
        condition: "read"
    },
    {
        name: "Jacob Thompson",
        action: "join",
        post: "ChessClub",
        time: { x: 1, y: "day" },
        image: "./../assets/images/avatar-jacob-thompson.webp",
        condition: "unread"
    },
    {
        name: "Angela Gray",
        action: "follow",
        post: "",
        time: { x: 5, y: "m" },
        image: "./../assets/images/avatar-angela-gray.webp",
        condition: "unread"
    },
    {
        name: "Mark Webber",
        action: "reaction",
        post: "My first tournament today!",
        time: { x: 1, y: "m" },
        image: "./../assets/images/avatar-mark-webber.webp",
        condition: "unread"
    }
];
// event listeners
window.addEventListener("DOMContentLoaded", function () {
    var index = 0, maxLimit = notificationData.length - 1;
    var timeInterval = setInterval(function () {
        var userInterface = notificationData[index]; // get structure from notification data
        var name = userInterface.name, post = userInterface.post, image = userInterface.image, time = userInterface.time, condition = userInterface.condition;
        var userInterfaceUI;
        ++index;
        index > maxLimit && clearInterval(timeInterval); // cut the time interval
        switch (userInterface.action) {
            case "message":
                userInterfaceUI = message(name, post, image, time, condition);
                break;
            case "picture":
                userInterfaceUI = picture(name, post, image, time, condition);
                break;
            default: userInterfaceUI = UI(name, post, image, time, condition);
        }
        countAndShowUnreadMessages(index, userInterfaceUI);
    }, getTime());
});
markAll.addEventListener("click", function () {
    var elements = __spreadArray([], notificationMain.children, true);
    elements.forEach(function (item) { return item.classList.contains("unread") && item.classList.replace("unread", "read"); });
    numberOfNotifications.textContent = 0;
});
// set timeout to show and count the unread mesages
function countAndShowUnreadMessages(index, htmlStructure) {
    notificationMain.innerHTML += htmlStructure;
    setTimeout(function () {
        notificationMain.children[index - 1].classList.add("activate"); // for scale up
        notificationMain.children[index - 1].classList.contains("unread") && (numberOfNotifications.innerHTML = parseInt(numberOfNotifications.textContent) + 1);
        __spreadArray([], notificationMain.children, true).forEach(function (notify) {
            notify.addEventListener("click", function (e) {
                if (e.currentTarget.classList.contains("unread")) {
                    e.currentTarget.classList.replace("unread", "read");
                    numberOfNotifications.textContent = parseInt(numberOfNotifications.textContent) - 1;
                }
            });
        });
    }, 10);
}
// creating different ui
function message(name, post, image, time, condition) {
    return "<article class=\"mt-2 single-notification ".concat(condition, " row p-2 rounded-2\">\n        <div class=\"profile-photo col-1 p-0\">\n        <img src=\"").concat(image, "\" class=\"img-fluid\" alt=\"gray\">\n        </div>\n\n        <div class=\"notification-box col-11 p-0 ps-2 d-flex flex-column align-items-start justify-content-center\">\n        <p class=\"notification m-0\">\n            <b class=\"name\">").concat(name, "</b> sent you a private message <b class=\"post-name\"></b> <span class=\"indicate d-inline-block rounded-circle\" style=\"width: 10px; height: 10px;\"></span>\n        </p>\n        <i class=\"time\"><output>").concat(time.x, "</output>").concat(time.y, " ago</i>\n\n        <article class=\"message mt-3 p-2 rounded-2\">\n            <p class=\"message-text lead\">").concat(post, "</p>\n        </article>\n        </div>\n    </article>");
}
// liked a picture or commented on a picture
function picture(name, post, image, time, condition) {
    return "<article class=\"mt-2 single-notification ".concat(condition, " row p-2 rounded-2\">\n   <div class=\"profile-photo col-1 p-0\">\n     <img src=\"").concat(image, "\" class=\"img-fluid\" alt=\"gray\">\n   </div>\n\n   <div class=\"notification-box col-10 p-0 ps-2 d-flex flex-column align-items-start justify-content-center\">\n     <p class=\"notification m-0\">\n       <b class=\"name\">").concat(name, "</b> commented on your picture <span class=\"indicate d-inline-block rounded-circle\" style=\"width: 10px; height: 10px;\"></span>\n     </p>\n     <i class=\"time\"><output>").concat(time.x, "</output>").concat(time.y, " ago</i>\n   </div>\n\n   <div class=\"col-1\">\n     <img src=\"").concat(post, "\" class=\"img-fluid\" alt=\"Image\">\n   </div>\n </article>");
}
// normal user interface
function UI(name, post, image, time, condition) {
    return "<article class=\"mt-2 single-notification ".concat(condition, " row p-2 rounded-2\">\n        <div class=\"profile-photo col-1 p-0\">\n        <img src=\"").concat(image, "\" class=\"img-fluid\" alt=\"gray\">\n        </div>\n\n        <div class=\"notification-box col-11 p-0 ps-2 d-flex flex-column align-items-start justify-content-center\">\n        <p class=\"notification m-0\">\n            <b class=\"name\">").concat(name, "</b> reacted to your recent post <b class=\"post-name\">").concat(post, "</b> <span class=\"indicate d-inline-block rounded-circle\" style=\"width: 10px; height: 10px;\"></span>\n        </p>\n        <i class=\"time\"><output>").concat(time.x, "</output>").concat(time.y, " ago</i>\n        </div>\n    </article>");
}
// fucntion for random time
function getTime() {
    return 2000 + Math.floor(Math.random() * 5000);
}
