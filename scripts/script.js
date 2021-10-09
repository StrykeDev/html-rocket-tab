"use strict";

if (!chrome) {
    const chrome = {
        storage : {
            local: {}
        }
    }
}

function chooseRandomBackground() {
    let listOfPictures = [
        'https://images.unsplash.com/photo-1581888517319-570283943d82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1000&q=80.jpg',
        'https://images.unsplash.com/photo-1595389962786-f2ca6bb63025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1414&q=80',
        'https://images.unsplash.com/photo-1563950708942-db5d9dcca7a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1511497584788-876760111969?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
        'https://images.unsplash.com/photo-1461301214746-1e109215d6d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    ]

    let chosenImageURL = listOfPictures[Math.floor(Math.random() * listOfPictures.length)];
    document.getElementById('mainApp').style.backgroundImage = `url(${chosenImageURL})`;
}

function listenForSearchSubmit() {
    try {
        document.getElementById('searchBox').addEventListener('keydown', (key) => {
            let keyCode = key.keyCode;
            if (keyCode === 13) {
                let inputedWordsToSearchTrimmed = document.getElementById('searchBox').value.trim();
                if (inputedWordsToSearchTrimmed.length === 0) {
                    { }
                }
                else {
                    // Filter the words to search
                    let inputedWordsSplitWithPlus = inputedWordsToSearchTrimmed.split(" ").join('+');
                    window.open(`https://www.google.com/search?q=${inputedWordsSplitWithPlus}`, "_self")
                    // console.log(keyCode);
                }

            }
        })
    } catch { }
}

function listenForNameChange(showCloseOrNo) {
    document.getElementById('windowToAddName').style.zIndex = '6';
    if (showCloseOrNo === true) {
        document.getElementById('closeAddName').style.display = 'initial';
        document.getElementById('closeAddName').addEventListener('click', () => {
            document.getElementById('windowToAddName').style.zIndex = '0';
            document.getElementById('windowToAddName').style.display = 'none';
            document.body.style.pointerEvents = 'auto';
            document.getElementById('timeDigital').style.display = 'initial';
            document.getElementById('hello').style.display = 'initial';
            document.getElementById('searchQuestion').style.display = 'initial';
            document.getElementById('searchBox').style.borderBottom = 'solid #eeeeee 2px';
            chrome.storage.local.get('userName', function (data) {
                let name = data['userName'];
                let helloIntro = `Hello, ${name}`
                document.getElementById('hello').textContent = helloIntro;
            })
        })
    }
    else if (showCloseOrNo === false) {
        { }
    }
    document.getElementById('enterName').addEventListener('keydown', (key) => {
        let keyCode = key.keyCode;
        if (keyCode === 13) {
            let inputedWordsToSearchTrimmed = document.getElementById('enterName').value.trim();
            if (inputedWordsToSearchTrimmed.length === 0) { }
            else {
                chrome.storage.local.set({ 'userName': inputedWordsToSearchTrimmed });
                document.getElementById('windowToAddName').style.display = 'none';
                document.body.style.pointerEvents = 'auto';
                document.getElementById('timeDigital').style.display = 'initial';
                document.getElementById('hello').style.display = 'initial';
                document.getElementById('searchQuestion').style.display = 'initial';
                document.getElementById('searchBox').style.borderBottom = 'solid #eeeeee 2px';
                chrome.storage.local.get('userName', function (data) {
                    let name = data['userName'];
                    let helloIntro = `Hello, ${name}`
                    document.getElementById('hello').textContent = helloIntro;
                })
                document.getElementById('windowToAddName').style.zIndex = '0';
            }

        }
    })
}

function makeGoogleSearch() {
    let searchBarInputText = document.getElementById('searchBox').value;
    console.log(searchBarInputText);
}

function getTime() {
    let finalTime = '';
    let today = new Date();
    let hours = today.getHours();
    let AmOrPm = '';
    let minutes = '';
    if (hours > 12) {
        hours = hours - 12;
        AmOrPm = 'PM';
    }
    else {
        AmOrPm = 'AM';
    }
    if (today.getMinutes() < 10) {
        minutes = `0${today.getMinutes()}`;
    }
    else {
        minutes = today.getMinutes();

    }
    finalTime = `${hours}:${minutes} ${AmOrPm}`;
    return finalTime
}

function welcome() {
    function changeHelloName() {
        try {
            document.getElementById('hello').addEventListener('click', () => {
                document.body.style.pointerEvents = 'none';
                document.getElementById('windowToAddName').style.display = 'initial';
                document.getElementById('windowToAddName').style.pointerEvents = 'auto';
                document.getElementById('timeDigital').style.display = 'none';
                document.getElementById('hello').style.display = 'none';
                document.getElementById('searchQuestion').style.display = 'none';
                document.getElementById('searchBox').style.borderBottom = 'solid transparent';
                listenForNameChange(true)
            })
        } catch { }

        chrome.storage.local.get('userName', function (data) {
            if (data['userName'] === undefined) {
                document.body.style.pointerEvents = 'none';
                document.getElementById('windowToAddName').style.display = 'initial';
                document.getElementById('windowToAddName').style.pointerEvents = 'auto';
                document.getElementById('timeDigital').style.display = 'none';
                document.getElementById('hello').style.display = 'none';
                document.getElementById('searchQuestion').style.display = 'none';
                document.getElementById('searchBox').style.borderBottom = 'solid transparent';
                listenForNameChange(false)
            }
            else {
                let name = data['userName'];
                let helloIntro = `Hello, ${name}`
                document.getElementById('hello').textContent = helloIntro;
                document.getElementById('hello').style.display = "initial"
            }

        })
    }
    changeHelloName()
}

// chrome.storage.local.set({'userName': 'Roni'})
function getTime() {
    let today = new Date();
    let hours = today.getHours();
    let AmOrPm = '';
    let minutes = '';
    if (hours > 12) {
        hours = hours - 12;
        AmOrPm = 'PM';
    }
    else {
        AmOrPm = 'AM';
    }
    if (today.getMinutes() < 10) {
        minutes = `0${today.getMinutes()}`;
    }
    else {
        minutes = today.getMinutes();

    }
    if (today.getHours() === 0) {
        hours = 12
    }
    let finalTime = `${hours}:${minutes} ${AmOrPm}`;
    try {
        document.getElementById('timeDigital').innerHTML = finalTime;
        if (hours > 9) {
            document.getElementById('timeDigital').style.left = '205%'
        }
    } catch { }

}

function setBackground() {
    chrome.storage.local.get('backgroundLink', (data) => {
        let backgroundImageURL = data['backgroundLink'];
        if (backgroundImageURL === undefined) {
            chooseRandomBackground()
        }
        else {
            document.getElementById('mainApp').style.backgroundImage = `url(${backgroundImageURL})`;
        }
    })
}

// shortcutMini
function addAndRefreshShortcutMini() {
    let allShortcutLi = document.getElementById('shortcutsSquareList').getElementsByTagName('li')
    for (const li of allShortcutLi) {
        setTimeout(() => { li.remove() }, 50)
    }
    const listOfValidShortcutNames = {}
    const listOfShortcutURL = []
    const listOfShortcutName = []
    for (let num = 0; num < 100; num++) {
        chrome.storage.local.get(`shortcutName${num}`, (dataName) => {
            listOfShortcutName.push(dataName[`shortcutName${num}`])
        })
        chrome.storage.local.get(`shortcut${num}`, (dataURL) => {
            listOfShortcutURL.push((dataURL[`shortcut${num}`]))
            // 
        })
    }
    for (let num = 0; num < 100; num++) {
        setTimeout(() => {
            if (listOfShortcutURL[num] === undefined) { }
            else if (listOfShortcutName[num] === undefined) { }
            else {
                let miniURL = listOfShortcutURL[num];
                let miniName = listOfShortcutName[num];
                let newMiniShortcut = document.createElement('li');
                newMiniShortcut.setAttribute('class', 'classMiniShortcut');
                newMiniShortcut.setAttribute('id', `classMiniShortcut${num}`);
                document.getElementById('shortcutsSquareList').appendChild(newMiniShortcut)
                let newMiniShortcutLink = document.createElement('a');
                newMiniShortcutLink.setAttribute('class', 'classMiniShortcutLink');
                newMiniShortcutLink.setAttribute('id', `classMiniShortcutLink${num}`);
                newMiniShortcutLink.textContent = miniName;
                let linkForMiniPic = ''
                if (miniURL.includes('https://')) {
                    newMiniShortcutLink.href = `${miniURL}`
                    linkForMiniPic = miniURL
                }
                else if (miniURL.includes('http://')) {
                    newMiniShortcutLink.href = `${miniURL}`
                    linkForMiniPic = miniURL
                }
                else {
                    newMiniShortcutLink.href = `https://${miniURL}`
                    linkForMiniPic = `https://${miniURL}`
                }

                let miniPic = document.createElement('img');
                let linkForMiniPicToUse = ''
                if (linkForMiniPic.includes('.org')) {
                    linkForMiniPicToUse = linkForMiniPic.split('.org')[0]
                    linkForMiniPicToUse = linkForMiniPicToUse + '.org'
                }
                else if (linkForMiniPic.includes('.com')) {
                    linkForMiniPicToUse = linkForMiniPic.split('.com')[0]
                    linkForMiniPicToUse = linkForMiniPicToUse + '.com'
                }
                else if (linkForMiniPic.includes('.gov')) {
                    linkForMiniPicToUse = linkForMiniPic.split('.gov')[0]
                    linkForMiniPicToUse = linkForMiniPicToUse + '.gov'
                }
                else if (linkForMiniPic.includes('.net')) {
                    linkForMiniPicToUse = linkForMiniPic.split('.net')[0]
                    linkForMiniPicToUse = linkForMiniPicToUse + '.net'
                }
                else {
                    linkForMiniPicToUse = linkForMiniPic
                    console.log('get elsed')
                }
                console.log(linkForMiniPicToUse)
                miniPic.src = `https://www.google.com/s2/favicons?domain_url=${linkForMiniPicToUse}`
                miniPic.style.marginRight = '5%'
                newMiniShortcut.appendChild(miniPic)
                newMiniShortcut.appendChild(newMiniShortcutLink)
            }
        }, 500)
    }
    listOfShortcutURL.length = 0;
    listOfShortcutName.length = 0;
}
addAndRefreshShortcutMini()

function appendShortcuts(shortcutToAdd, nameToAdd, numberOfShortcut) {
    let newShortcut = document.createElement('li')
    newShortcut.setAttribute('class', 'classLinkShortcuts')
    let newShortcutLink = document.createElement('a')
    newShortcutLink.setAttribute('class', 'classLinkShortcutsURL')
    let ulToAppendTo = document.getElementById('listOfShortcuts')
    newShortcutLink.textContent = `${nameToAdd} - ${shortcutToAdd}`;
    if (shortcutToAdd.includes('https://')) {
        newShortcutLink.href = `${shortcutToAdd}`
    }
    else if (shortcutToAdd.includes('http://')) {
        newShortcutLink.href = `${shortcutToAdd}`
    }
    else {
        newShortcutLink.href = `https://${shortcutToAdd}`
    }
    let minusDiv = document.createElement('div')
    minusDiv.setAttribute('class', 'fa fa-minus-circle')
    minusDiv.setAttribute('id', `shortcutNum${numberOfShortcut}`)
    for (const ele of [minusDiv]) {
        ele.addEventListener('click', () => {
            let minusDivNumber = ele.id.slice(-1)
            chrome.storage.local.remove(`shortcut${minusDivNumber}`)
            try {
                let allShortcutLi = document.getElementById('listOfShortcuts').getElementsByTagName('li')
                for (const li of allShortcutLi) {
                    setTimeout(() => { li.remove() }, 50)
                }
                function checkLengthToChangeDisplayOfShortcuts() {
                    if (listOfUrlShortcuts.length == 0) {
                        document.getElementById('listOfShortcuts').style.visibility = 'hidden';
                        console.log('HIDE')
                    }
                    if (listOfUrlShortcuts.length != 0) {
                        document.getElementById('listOfShortcuts').style.visibility = 'visible';
                    }
                }
                let listOfUrlShortcuts = []
                for (let num = 0; num < 100; num++) {
                    console.log(`this is the num ${num}`)
                    chrome.storage.local.get(`shortcut${num}`, (data) => {
                        if (data[`shortcut${num}`] != undefined) {
                            let urlData = data[`shortcut${num}`]
                            chrome.storage.local.get(`shortcutName${num}`, (info) => {
                                let nameInfo = info[`shortcutName${num}`]
                                appendShortcuts(urlData, nameInfo, num)
                                listOfUrlShortcuts.push(num)
                            })

                        }
                    })
                }
                setTimeout(checkLengthToChangeDisplayOfShortcuts, 100)
                setTimeout(addAndRefreshShortcutMini, 150)
            } catch { }

        })
    }
    minusDiv.style.paddingRight = '5%'
    newShortcut.insertAdjacentElement('afterbegin', minusDiv)
    newShortcut.appendChild(newShortcutLink)
    ulToAppendTo.appendChild(newShortcut)
}

function addShortcutToDataBase(urlToAddToDataBase, nameToAddToDataBase) {
    let stopper = 0
    for (let num = 0; num < 100; num++) {
        chrome.storage.local.get(`shortcut${num}`, (data) => {
            if (data[`shortcut${num}`] == undefined && stopper != -5) {
                chrome.storage.local.set({ [`shortcut${num}`]: urlToAddToDataBase });
                chrome.storage.local.set({ [`shortcutName${num}`]: nameToAddToDataBase });
                stopper = -5
            }
            else {
                // console.log(data[`shortcut${num}`])
            }
        })
    }

}

function showShortcuts() {
    try {
        let allShortcutLi = document.getElementById('listOfShortcuts').getElementsByTagName('li')
        for (const li of allShortcutLi) {
            setTimeout(() => { li.remove() }, 50)
        }
        function checkLengthToChangeDisplayOfShortcuts() {
            if (listOfUrlShortcuts.length == 0) {
                document.getElementById('listOfShortcuts').style.visibility = 'hidden';
                console.log('HIDE')
            }
            if (listOfUrlShortcuts.length != 0) {
                document.getElementById('listOfShortcuts').style.visibility = 'visible';
            }
        }
        let listOfUrlShortcuts = []
        for (let num = 0; num < 100; num++) {
            chrome.storage.local.get(`shortcut${num}`, (data) => {
                if (data[`shortcut${num}`] != undefined) {
                    let urlData = data[`shortcut${num}`]
                    chrome.storage.local.get(`shortcutName${num}`, (info) => {
                        let nameInfo = info[`shortcutName${num}`]
                        appendShortcuts(urlData, nameInfo, num)
                        listOfUrlShortcuts.push(num)
                    })

                }
            })
        }
        setTimeout(checkLengthToChangeDisplayOfShortcuts, 100)
        setTimeout(() => {
            let myDiv = document.getElementById("showShowShortcutsWindow");
            myDiv.scrollTop = myDiv.scrollHeight;
        }, 200)
    } catch { }

}

function listenForBackBookShort() {
    try {
        document.getElementsByClassName('firstSection')[0].addEventListener("click", () => {
            document.getElementById('changeBackgroundWindow').style.zIndex = '12';
            document.getElementById('addMoreShortcutsDiv').style.zIndex = '12'
            document.getElementById('changeBackgroundWindow').style.opacity = '1';
            // document.getElementById('changeBackgroundWindow').style.display = 'initial';
            document.getElementById('searchQuestion').style.display = 'none';
            document.getElementById('closeChangeBackground').style.display = 'initial';
            document.body.style.pointerEvents = 'none';
            document.getElementById('changeBackgroundWindow').style.pointerEvents = 'auto';
            document.getElementById('hello').style.zIndex = '0';
            document.getElementById('searchBox').style.zIndex = '0';
            document.getElementById('closeChangeBackground').addEventListener('click', () => {
                document.getElementById('changeBackgroundWindow').style.zIndex = '-2';
                document.getElementById('addMoreShortcutsDiv').style.zIndex = '-4'
                document.getElementById('changeBackgroundWindow').style.opacity = '0';
                document.getElementById('hello').style.zIndex = '2';
                document.getElementById('searchBox').style.zIndex = '2';
                document.body.style.pointerEvents = 'auto';
                document.getElementById('searchQuestion').style.display = 'initial';

            })

            document.getElementById('backgroundGridItem1').addEventListener('click', () => {
                let linkToSave = 'https://images.unsplash.com/photo-1581888517319-570283943d82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80';
                chrome.storage.local.set({ 'backgroundLink': linkToSave });
                setBackground();
                console.log(linkToSave);
            })
            document.getElementById('backgroundGridItem2').addEventListener('click', () => {
                let linkToSave = 'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1000&q=80.jpg';
                chrome.storage.local.set({ 'backgroundLink': linkToSave });
                setBackground();
                console.log(linkToSave);
            })
            document.getElementById('backgroundGridItem3').addEventListener('click', () => {
                let linkToSave = 'https://images.unsplash.com/photo-1595389962786-f2ca6bb63025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1414&q=80';
                chrome.storage.local.set({ 'backgroundLink': linkToSave });
                setBackground();
                console.log(linkToSave);
            })
            document.getElementById('backgroundGridItem4').addEventListener('click', () => {
                let linkToSave = 'https://images.unsplash.com/photo-1563950708942-db5d9dcca7a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
                chrome.storage.local.set({ 'backgroundLink': linkToSave });
                setBackground();
                console.log(linkToSave);
            })
            document.getElementById('backgroundGridItem5').addEventListener('click', () => {
                let linkToSave = 'https://images.unsplash.com/photo-1511497584788-876760111969?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80';
                chrome.storage.local.set({ 'backgroundLink': linkToSave });
                setBackground();
                console.log(linkToSave);
            })
            document.getElementById('backgroundGridItem6').addEventListener('click', () => {
                let linkToSave = 'https://images.unsplash.com/photo-1461301214746-1e109215d6d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80';
                chrome.storage.local.set({ 'backgroundLink': linkToSave });
                setBackground();
                console.log(linkToSave);
            })
        })
        document.getElementsByClassName('secondSection')[0].addEventListener("click", () => {
            document.getElementById('searchQuestion').style.display = 'none';
            document.getElementById('shortcutsWindow').style.opacity = '1';
            document.getElementById('hello').style.zIndex = '0';
            document.getElementById('searchBox').style.zIndex = '0';
            document.body.style.pointerEvents = 'none';
            document.getElementById('shortcutsWindow').style.zIndex = '30';
            document.getElementById('shortcutsWindow').style.opacity = '1';
            document.getElementById('shortcutsWindow').style.pointerEvents = 'auto';
            document.getElementById('closeShortcutsWindow').addEventListener('click', () => {
                // WHEN CLOSE 
                document.getElementById('hello').style.zIndex = '2';
                document.getElementById('searchBox').style.zIndex = '2';
                document.getElementById('shortcutsWindow').style.zIndex = '-2';
                document.getElementById('searchQuestion').style.display = 'initial';
                document.getElementById('shortcutsWindow').style.opacity = '0';
                document.body.style.pointerEvents = 'auto';
            })
            // Add Shortcuts
            let css = window.document.styleSheets[0];
            css.insertRule(`
            @keyframes wrongURL {
                0%   { margin-left: 15%; }
                25%  { margin-left: 20%; }
                50%  { margin-left: 15%; }
                100% { margin-left: 20%; }
            }`, css.cssRules.length);
            // Incorrect URL animation
            document.getElementById('addShortcutOption').addEventListener('click', () => {
                document.getElementById('newShortcutTab').style.visibility = 'visible';
                let myDiv = document.getElementById("showShowShortcutsWindow");
                myDiv.scrollTop = myDiv.scrollHeight;
                let correctAmountRan = 0
                let urlToAddList = []
                let nameToAddList = []
                document.getElementById('enterNewShortcutURL').addEventListener('keydown', (evt) => {
                    if (evt['keyCode'] === 13) {
                        if (document.getElementById('enterNewShortcutURL').value.trim().length === 0) {
                            console.log('first wrong')
                        }
                        else {
                            correctAmountRan++
                            console.log(`correct is: ${correctAmountRan}`)
                            if (correctAmountRan === 1) {
                                console.log('name should be getting logged here')
                                nameToAddList.push(document.getElementById('enterNewShortcutURL').value.trim())
                                // console.log(`${urlToAdd} is supposed to be added`)
                                console.log(nameToAddList[0])
                                document.getElementById('enterNewShortcutURL').value = '';
                                document.getElementById('enterNewShortcutURL').placeholder = 'URL Of Shortcut';
                                document.getElementById('enterNewShortcutURL').style.width = '60%'
                            }
                            else {
                                urlToAddList.push(document.getElementById('enterNewShortcutURL').value.trim())
                                console.log(`URL: ${urlToAddList[0]}\nName: ${nameToAddList[0]}`)
                                addShortcutToDataBase(urlToAddList[0], nameToAddList[0])
                                document.getElementById('enterNewShortcutURL').value = '';
                                document.getElementById('enterNewShortcutURL').placeholder = 'Name Of Shortcut';
                                document.getElementById('enterNewShortcutURL').style.width = '65%'
                                document.getElementById('newShortcutTab').style.visibility = 'hidden';
                                setTimeout(showShortcuts, 100)
                                urlToAddList.length = 0;
                                nameToAddList.length = 0;
                                correctAmountRan = 0
                                setTimeout(addAndRefreshShortcutMini, 150)
                            }


                        }
                    }
                })
            })
            // Read Shortcuts




        })
    } catch { }
}

function openAndCloseMini() {
    let miniIsOpen = false
    document.getElementById('mainApp').addEventListener('click', (rvt) => {
        if (rvt['target'] === document.getElementById('shortcutsLinkHeader')) {
            if (miniIsOpen === false) {
                document.getElementById('showLinksTabTriangle').style.opacity = '1';
                document.getElementById('showLinksTabSquare').style.opacity = '1';
                miniIsOpen = true
            }
            else if (miniIsOpen === true) {
                document.getElementById('showLinksTabTriangle').style.opacity = '0';
                document.getElementById('showLinksTabSquare').style.opacity = '0';
                miniIsOpen = false
            }
        }
        else if (miniIsOpen === true) {
            if (rvt['target'] != document.getElementById('showLinksTabSquare') && rvt['target'] != document.getElementById('showLinksTabTriangle')) {
                document.getElementById('showLinksTabTriangle').style.opacity = '0';
                document.getElementById('showLinksTabSquare').style.opacity = '0';
            }
            miniIsOpen = false

        }
        else { }
    })
}

function adjustForDifferentScreenSize() {
    console.log(`Width is ${screen.width}`)
}


welcome()
listenForSearchSubmit()
showShortcuts()
getTime()
setInterval(getTime, 1000)
listenForBackBookShort()
setBackground()
openAndCloseMini()
adjustForDifferentScreenSize()
