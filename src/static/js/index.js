

const userInput = document.getElementById('user-input')
userInput.addEventListener('change', detect)


async function detect(e) {
    flipLoading()
    displayImage(e)
    getResult()
    flipLoading()
}

updateUI = async (data) => {
    document.querySelector('.result').classList.add('display')
    document.querySelector('.result-class').innerHTML = data.class
    document.querySelector('.result-score').innerHTML = data.score + "%"
}

const postDataFile = async (url='', data) => {

    const response = await fetch(url, {
        method: 'POST',
        body: data,
    })
    try {
        const newData = await response.json()
        return newData
    }
    catch (error) {
        console.log("error: " + error)
    }
}

function flipLoading() {
    document.getElementById('preload').classList.toggle('display')
}

function displayImage(e) {
    const url = URL.createObjectURL(e.target.files[0])
    const userImage = document.querySelector('.user-input-image')
    userImage.setAttribute('src', url)
    userImage.classList.add('display')
}
async function getResult() {
    const file = userInput.files[0]
    const fd = new FormData()
    fd.append('image', file)
    await postDataFile('/detect', fd)
    .then (data => {
        updateUI(data)
    })
}


//Scroll up button functionality

const scrollUpButton = document.querySelector('.scroll-up')
scrollUpButton.addEventListener('click', ()=> {
    window.scrollTo(0, 0);
})


window.addEventListener('scroll', ()=> {

    if(window.scrollY >= 1000) {
        scrollUpButton.classList.add('display')
    } else {
        scrollUpButton.classList.remove('display')

    }
})

