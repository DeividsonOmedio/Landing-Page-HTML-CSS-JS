let incricoes = []
let comentarios = []

// Selecionar elementos
const modal = document.querySelector('#modal')
const modalContent = document.querySelector('#modal-content')
const form = document.querySelector('form')
const btnForm = document.querySelector('.btn')
const subscriptionForm = document.querySelector('#subscription-form')
const commentsSection = document.querySelector('#comments-section')
const commentsForm = document.querySelector('#comments-form')

// Função para abrir/fechar modal
function Modal() {
    modal.style.display == 'block' ? modal.style.display = 'none' : modal.style.display = 'block'
}

// Função para clicar no botão do formulário, mostrar os dados no console e abrir o modal
btnForm.addEventListener('click', function (evt) {
    evt.preventDefault()
    let newIncricao = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        interest: document.querySelector('select[name="interest"]').value
    }
    if(newIncricao.name == '' || newIncricao.email == '' || newIncricao.phone == '') {
        alert('Preencha todos os campos!')
        return
    }
    incricoes.push(newIncricao)
    setLocalStorage('incricoes', incricoes)
    Modal()
})

// Função para fechar o modal ao clicar fora dele ou no botão de fechar
modal.addEventListener("click", (e) => {
    e.target.nodeName == 'DIV' || e.target.nodeName == 'H2' || e.target.nodeName == "P" || e.target.nodeName == "SPAN" ? null : Modal()
})

// Função para rolar a página ao topo ao clicar no botão de inscrição com scroll lento
function Inscription() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    setTimeout(FocoModal, 500)
}

// Função para efeito de foco no formulário depois que o scroll tiver alcançado o início da página
function FocoModal() {
    subscriptionForm.classList.add('focus-effect')
    setTimeout(() => {
        subscriptionForm.classList.remove('focus-effect')
    }, 1000)
}

// Função para recuperar dados do localStorage
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || []
}

// Função para salvar dados no localStorage
function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

// Inicializar inscrições e comentários do localStorage
function init() {
    incricoes = getLocalStorage('incricoes')
    comentarios = getLocalStorage('comentarios')
    displayComments()
}

// Função para exibir os comentários
function displayComments() {
    commentsSection.innerHTML = ''
    comentarios.forEach((comentario, index) => {
        if(comentario.status == 'aprovado') {
        let commentDiv = document.createElement('div')
        commentDiv.classList.add('comment')
        commentDiv.innerHTML = `
            <p><strong>${comentario.name}:</strong> ${comentario.comment}</p>
        `
        commentsSection.appendChild(commentDiv)
        }
    })
}

// Função para adicionar novo comentário
commentsForm.addEventListener('submit', function (evt) {
    evt.preventDefault()
    let newComment = {
        name: document.querySelector('input[name="comment-name"]').value,
        comment: document.querySelector('textarea[name="comment-text"]').value,
        status: 'pendente'
    }
    comentarios.push(newComment)
    setLocalStorage('comentarios', comentarios)
    displayComments()
    commentsForm.reset()
})

// Inicializar os dados
init()
