const targetPages = "<all_urls>";

function randomSize() {
    min = Math.ceil(24);
    max = Math.floor(42);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
    let randomColor = [
        "red", "white", "black",
        "blue", "green", "yellow",
        "purple", "pink"
    ]

    return coinFlip(randomColor);
}

function randomLength() {
    return Math.floor(Math.random() * 7);
}

function coinFlip(coin) {
    var index = Math.floor(Math.random() * coin.length);

    return coin[index];
}

function randomMiau() {
    let miCoin = ["m", "i"];
    let auCoin = ["a", "u", "U"];
    let word = "M";

    for (let i = 0; i <= randomLength(); i++) {
        word += coinFlip(miCoin);
    }

    for (let i = 0; i <= randomLength(); i++) {
        word += coinFlip(auCoin);
    }

    if (word.length == 1) {
        word = "schnurrRRr";
    }

    return word;
}

function redirect(requestDetails) {
    console.log("Redirecting: " + requestDetails.url);

    let choice = coinFlip([0, 1, 2]);

    if (choice == 0) {
        return { redirectUrl: ("https://cataas.com/c") }
    }

    if (choice == 1) {
        return { redirectUrl: ("https://cataas.com/c/gif") }
    }

    if (choice == 2) {
        return {
            redirectUrl: ("https://cataas.com/cat/says/"
                + randomMiau() + "?size=" + randomSize()
                + "&color=" + randomColor())
        };
    }
};

// add the listener callback function -> redirect(),
// passing the filter argument and "blocking"
chrome.webRequest.onBeforeRequest.addListener(
    redirect,
    { urls: ["<all_urls>"], types: ["image", "media"] },
    ["blocking"]
);