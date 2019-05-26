const request = new XMLHttpRequest()
const url = "http://localhost:3001/"

const postsMain = document.getElementsByClassName('post')[0]
const result = document.getElementsByClassName('carusel')

const notice = document.getElementById('notice')
const saveBtn = document.getElementsByTagName('button')

let posts = null
let i = null
let requestServer = []

function getRequest() {
  let result
  request.open('GET', url, false);
  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) result = {
      status: request.status,
      state: request.readyState,
      result: JSON.parse(request.responseText)
    }
    else result = {
      status: request.status,
      state: request.readyState,
      result: null
    }
  });
  request.send()
  return result
}

function postRequest(posts) {
  request.open('POST', url, false);
  request.send(posts)
  //return result
}

function generatePosts(posts) {
  let divCarusel = document.createElement('div')
  divCarusel.className = 'carusel'
  posts.forEach((post, i) => {
    let input = document.createElement('input')
    input.setAttribute('type', "radio")
    input.setAttribute('name', "carusel__post")
    let div = document.createElement('div')
    div.setAttribute('class', 'carusel__item')
    div.innerHTML = `
        <div class="post__header">
          <div class="title">
            <span class="post__id">${post.id}</>
            <span>&mdash;</span>
            <span class="post__date">${post.publishDateString}</span>
            <span>Статус: </span>
            <span class="status">Неизвестен</span>
          </div>
          <div class="user__info">
            <div class="avatar"></div>
            <span>${post.ownerLogin}</span>
          </div>
        </div>
        <div class="post__body">
          <div class="content">
            <h1 class="post__title">${post.bulletinSubject}</h1>
            <p class="post__text">${post.bulletinText}</p>
          </div>
          <div class="line"></div>
          <div class="images"></div>
      </div>`
    let images = div.getElementsByClassName('images')[0]
    div.setAttribute('class', 'img')
    post.bulletinImagees.forEach(el => {
      images.innerHTML = `<img src=${el}>`
    });
    console.log(images)
    console.log(div)
    divCarusel.appendChild(input)
    divCarusel.appendChild(div)
  })
  postsMain.appendChild(divCarusel)
}

document.onkeydown = function (e) {
  const input = document.querySelectorAll('input')
  const status = document.getElementsByClassName('status')
  //console.log(e)
    if (e.keyCode == 13 && result.length == 0) { // Enter
      let respons = getRequest()
      if (respons.status === 200 && respons.result !== null) {
        posts = respons.result
        generatePosts(respons.result)
        let input = document.querySelectorAll('input')
        input[0].checked = true
        i = 0
      }
    }
    if (e.keyCode == 39 && result.length != 0) { //Перелистывание вправо
      if (input[i].checked === true && i < input.length - 1) {
        input[i + 1].checked = true
        i++
      }
    }
    if (e.keyCode == 37 && result.length != 0) { //Перелистывание влево
      if (input[i].checked === true && i > 0) {
        input[i - 1].checked = true
        i--
      }
    }
    if (e.keyCode == 32 && result.length != 0) {
      if (input[i].checked === true) {
        posts[i].status = 'approve'
        status[i].innerText = 'approve'
        if (i < input.length - 1) {
          input[i + 1].checked = true
          i++
        }
      }
    }
    if ((e.keyCode == 46 || e.keyCode == 8) && result.length != 0) {
      if (input[i].checked === true) {
        posts[i].status = 'decline'
        status[i].innerText = 'decline'
        if (i < input.length-1 ) {
          input[i+1].checked = true
          i++
        }
      }
    }
    if ((e.shiftKey && e.keyCode == 13 ) && result.length != 0) {
      if (input[i].checked === true) {
        posts[i].status = 'escalate'
        status[i].innerText = 'escalate'
        if (i < input.length-1 ) {
          input[i+1].checked = true
          i++
        }
      }
    }
    if (e.keyCode == 118 && result.length != 0) {
      postRequest(posts)
      console.log(postsMain)
      console.log(result)
      postsMain.removeChild(result[0])
      let respons = getRequest()
      if (respons.status === 200 && respons.result !== null) {
        posts = respons.result
        generatePosts(respons.result)
        let input = document.querySelectorAll('input')
        input[0].checked = true
        i = 0
      }
    }
}