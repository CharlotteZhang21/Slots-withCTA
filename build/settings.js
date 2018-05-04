var PiecSettings = PiecSettings || {};

PiecSettings.version = "-";

PiecSettings.autospin = {
    activateAfter: 3000,
}

PiecSettings.timer = 3000;

PiecSettings.backgroundStyle = "custom";

//////// DEFAULT SETTINGS FOR SLOT GAMES ////////

PiecSettings.winlinePalette = [0xfdf9c6, 0xf3d868, 0xc98e43, 0xff8247, 0xfaed60, 0xeba22c]; //Colours used by the winlines
PiecSettings.fontColor = "#ffffff"; //Remove empty if you want to use the default golden gradient
PiecSettings.fontFamily = "arcadeclassic"; //Make sure that this font is on the css and that there is a div that uses it. (preload-font div)

//////// SLOTS GAME SETTINGS ///////////////

// PiecSettings.tooltip = { // If there is a "src" value, it will always pic the image.
//     text: "SPIN TO\nWIN!",
//     fontColor: "#ffffff", //Remove if you want to use the default golden gradient
//     src: 'tooltip.png',
// };

PiecSettings.reelLayout = [3,3,3,3,3]; // Heights of each of the reels in array form, where the first item is the height of the first reel, and so on.
PiecSettings.reels = [ // Tease on first spin, win on second, big win on third
    ["r","y","v","s","c","s","p","r","y","s","y","s","s","r","r","r","s","s","r","r","r","v","v","v","v","s","y","s","s","r","r","r","s","v","v","v","p","b","b","s","s","s","s","s","s","y","p","s","s","s"],
    ["v","b","s","c","y","c","c","c","r","v","v","v","v","y","r","r","y","s","y","s","s","r","r","r","s","r","y","s","y","s","s","r","r","r","s","s","b","c","c","s","s","r","r","r","c","c","c","c","b","b","b","y","b","s","r","c","c","c","b","r","y"],
    ["s","c","b","v","s","v","c","r","b","s","s","s","s","r","r","r","y","v","v","v","v","v","b","b","r","y","s","y","s","s","r","s","y","s","s","r","r","r","s","r","r","s","s","s","r","r","r","c","c","c","r","s","s","s","y","c","c","c","c","c","c","r","s","c"],
    ["v","v","p","b","y","c","c","c","r","v","v","v","v","y","r","r","y","s","y","s","s","r","r","r","s","r","y","s","b","s","s","r","r","r","c","c","c","s","y","s","s","r","r","r","s","c","c","c","b","b","b","y","b","s","r","c","c","c","b","r","y"],
    ["v","c","c","p","y","c","c","c","r","v","v","v","v","y","s","r","y","s","y","s","s","r","r","r","s","s","r","r","r","r","r","y","s","b","c","c","s","y","s","s","r","r","r","s","c","c","c","c","b","b","b","y","b","s","r","c","c","c","b","r","y"],
    
];
PiecSettings.reelsAnimation = {
    delayPerReel: [0,300,600, 900, 1200],
};
//0: no dot 1: can visit 2:don't visit
PiecSettings.dotsArray = [
    [-1,1,1,1,1,1,1,1,-1],
    [0,1,0,0,0,0,0,1,0],
    [0,1,1,1,0,2,1,1,0],
    [0,0,0,1,0,1,0,0,0],
    [0,0,0,1,0,1,0,0,0],
    [0,0,0,1,0,1,0,0,0]
]

/////// Win Counter settings
PiecSettings.winCounterInitialValue = 0;
PiecSettings.winCounterCommaSeparation = true; //One thousand will appear as 1,000 if this is true; 1000 if this is false

/////// Control symbol vertical spacing here
PiecSettings.symbolHeight = 120;
PiecSettings.reelWidth = 1;

/////// FINAL OVERLAY SCREEN SETTINGS ///////

PiecSettings.finalOverlay = {
    color: 0x000000,
    alpha: 0.5,
    delay: 3000,
};

/////// SLOTS SPINS SETTINGS ////////

PiecSettings.spins = [
    { // Spin 1
        stopPositions: [1,2,1,2,2], //Stop positions for Spin 1, for each of reels 1, 2 and so on
        pngSequence: {
            src: 'cleopatra_anim.jpg',
            htmlContainer:'cleopatra-container',
            spriteWidth: 302,
            spriteHeight: 182,
            spriteNumber: 20,
            loops: 1, //write 0 if infinite loop
            delay: 0,
            fps: 8,
            effect: 'fade-in',
        },
        winMessage: {
            src: "blickyjackpot.png",
            animation: 'zoom-and-bounce-in',
            duration: 1000,
            delay: 0,
        }
    }
];

PiecSettings.otherPngSequence = [
    {//pacmanAni 0
        src: 'pacman.png',
        spriteWidth: 302,
        spriteHeight: 302,
        spriteNumber: 3,
        loops: 0, //write 0 if infinite loop
        loopReverse: true,
        delay: 300,
        fps: 8,
        scale: 1,
        // effect: 'fade-in',
    },
    {//pacmanAni 1
        src: 'red_ani.png',
        // htmlContainer:'lineTop',
        spriteWidth: 260,
        spriteHeight: 262,
        spriteNumber: 2,
        loops: 0, //write 0 if infinite loop
        // loopReverse: true,
        delay: 300,
        fps: 10,
        scale: -1, //directions
        // effect: 'fade-in',
    },
    {//pacmanAni 1
        src: 'blue_ani.png',
        // htmlContainer:'lineTop',
        spriteWidth: 260,
        spriteHeight: 262,
        spriteNumber: 2,
        loops: 0, //write 0 if infinite loop
        // loopReverse: true,
        delay: 300,
        fps: 10,
        scale: -1,
        // effect: 'fade-in',
    },
    {//pacmanAni 1
        src: 'pink_ani.png',
        // htmlContainer:'lineTop',
        spriteWidth: 260,
        spriteHeight: 262,
        spriteNumber: 2,
        loops: 0, //write 0 if infinite loop
        // loopReverse: true,
        delay: 300,
        fps: 10,
        scale: -1,
        // effect: 'fade-in',
    },
    {//pacmanAni 1
        src: 'yellow_ani.png',
        // htmlContainer:'lineTop',
        spriteWidth: 260,
        spriteHeight: 262,
        spriteNumber: 2,
        loops: 0, //write 0 if infinite loop
        // loopReverse: true,
        delay: 300,
        fps: 10,
        scale: -1,
        // effect: 'fade-in',
    },
]