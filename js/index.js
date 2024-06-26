// função para abrir/fechar modal

const modal = document.querySelector('#modal')
const modalContent = document.querySelector('#modal-content')
const form = document.querySelector('form')
const btnForm = document.querySelector('.btn')
const subscriptionForm = document.querySelector('#subscription-form')
function Modal() {
    console.log('clicou')
    console.log(modal.style.display)
    modal.style.display == 'block' ? modal.style.display = 'none' : modal.style.display = 'block'

}

//função para clicar no botao do formulario, mostrar os dados no console e abrir o modal
btnForm.addEventListener('click', function(evt) {
    evt.preventDefault()
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value
    const phone = document.querySelector('input[name="phone"]').value
    const interest = document.querySelector('select[name="interest"]').value
    
    console.log(name, email, phone, interest)
    
    nameModal = document.querySelector('#name-modal')
    nameModal.innerHTML = name
    
    if(name != '' && email != '' && phone != '' && interest != '')
        Modal()
})

// função para fechar o modal ao clicar fora dele ou no botão de fechar
modal.addEventListener("click", (e)=>{
    e.target.nodeName == 'DIV' || e.target.nodeName == 'H2' || e.target.nodeName == "P" || e.target.nodeName == "SPAN" ? null :  Modal() 
})

// função para rolar a pagina no topo ao clicar no botão de inscrição com scrooll lento
function Inscription(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    setTimeout(FocoModal, 500);
}

// Função para efeito de foco no formulário depois que o scroll tiver alcançado o início da página
function FocoModal() {
    subscriptionForm.classList.add('focus-effect');
    setTimeout(() => {
        subscriptionForm.classList.remove('focus-effect'); 
    }, 1000);
}