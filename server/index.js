const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const cors = require('@koa/cors')

const app = new Koa()
const router = new Router()

const NUMBER_POSTS = 10

//ROUTES

router.post('/', koaBody() , async (ctx) => {
  try {
    let result = ctx.request.body
    console.log('nice')
    ctx.body = {status: 'good'}
  } catch (error) {
    ctx.body = `${error}`
  }
})

router.get('/', async (ctx) => {
  try {
    ctx.body = randomPosts()
  } catch (error) {
    ctx.body = `${error}`
  }
})

function random(length, type) {
  let result = ''
  let letters = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ё', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж','Э', 'Ё', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю']
  let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  switch (type) {
    case 'number':
      for (let index = 0; index < length; index++) {
        result += numbers[Math.floor(Math.random() * numbers.length)]
      }
      break;
    case 'string':
      for (let index = 0; index < length; index++) {
        result += letters[Math.floor(Math.random() * letters.length)]
      }
      break;
  }
  if (type === 'number') parseInt(result)
  return result
}

function getRandomInt(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}

function randomPosts() {
  let result = []
  let stringType = 'string'
  let numberType = 'number'
  class post {
    constructor(id, date, ownerId, ownerLogin, bulletinSubject, bulletinText) {
      this.id = id;
      this.publishDate = Math.floor(date.getTime() / 1000);
      this.publishDateString = date.toLocaleString("ru");
      this.ownerId = ownerId;
      this.ownerLogin = ownerLogin;
      this.bulletinSubject = bulletinSubject;
      this.bulletinText = bulletinText;
      this.bulletinImagees = ['https://static.baza.farpost.ru/v/1510541224458_hugeBlock'];
    }
  }
  for (let index = 0; index < NUMBER_POSTS; index++) {
    let date = new Date(getRandomInt(2010, 2019), getRandomInt(1, 12), getRandomInt(1, 31), getRandomInt(0, 23), getRandomInt(0, 59));
    thePost = new post(random(7, numberType), date, random(7, numberType), random(7, stringType), random(20, stringType), random(300, stringType))
    result.push(thePost)
  }
  return result
}

app.use(cors()).use(router.routes()).listen(3001)