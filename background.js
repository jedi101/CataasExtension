/**
 * Picking a random font size between specified boundaries
 * @return {Number} containing a randomly choosen font size
 */
function randomSize() {
    min = Math.ceil(24);
    max = Math.floor(42);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Picking a random color out of the defined colorset
 * @return {String} containing a randomly choosen color
 */
function randomColor() {
    let randomColor = [
        "red", "white", "black",
        "blue", "green", "yellow",
        "purple", "pink"
    ]

    return coinFlip(randomColor);
}

/**
 * Picking a random number between specified boundaries
 * @return {Number} of a randomly picked integer number
 */
function randomLength() {
    return Math.floor(Math.random() * 7);
}

/**
 * Picking a random value out of a given set of values
 * @return {String} of the randomly picked value
 */
function coinFlip(coin) {
    var index = Math.floor(Math.random() * coin.length);

    return coin[index];
}

/**
 * Function to create a random textmessage - *Miau*
 * @return {String} containing the random created text
 */
function randomMiau() {
    // StringArrays containing our alphabet to choose from
    let miCoin = ["m", "i"];
    let auCoin = ["a", "u", "U"];
    let word = "M";

    // randomly create the first part of our syllables
    // The *mi* part in *Miau*
    for (let i = 0; i <= randomLength(); i++) {
        word += coinFlip(miCoin);
    }

    // randomly create the second half of our catvoice syllables
    // The *au* part in *Miau*
    for (let i = 0; i <= randomLength(); i++) {
        word += coinFlip(auCoin);
    }

    // if we are a happy cat lets just purr without complaining
    if (word.length == 1) {
        word = "schnurrRRr";
    }

    // return our completed cat expression
    return word;
}


/**
 * Callback function to handle the redirect of every webRequest 
 * @param {RequestObject} requestDetails of the Requestobject
 */
function redirect(requestDetails) {
    // logging each webRequest url for debugging purpose
    console.log("Redirecting: " + requestDetails.url);

    // Array of numbers that our random choice is based on
    let choice = coinFlip([0, 1, 2]);

    // choice 0 redirects the url to a random cat
    if (choice == 0) {
        return { redirectUrl: ("https://cataas.com/c") }
    }

    // choice 1 redirects the url to an animated cat gif
    if (choice == 1) {
        return { redirectUrl: ("https://cataas.com/c/gif") }
    }

    // choice 2 redirects the url to a random cat with a 
    // random textmessage, random fontsize and a random color.
    if (choice == 2) {
        return {
            redirectUrl: ("https://cataas.com/cat/says/"
                + randomMiau() + "?size=" + randomSize()
                + "&color=" + randomColor())
        };
    }
};

/**
 * Add and configure the addListener that fires for each webRequest. 
 * @param {Callback} callback function to fire on requests
 * @param {StringArray} urls that we are intercepting
 * @param {StringArray} Filter for these types inside requests
 * @param {StringArray} Enforces synchrounus requests.
 * 
 * @info https://developer.chrome.com/docs/extensions/reference/webRequest/
 */
chrome.webRequest.onBeforeRequest.addListener(
    redirect,
    { urls: ["<all_urls>"], types: ["image", "media"] },
    ["blocking"]
);