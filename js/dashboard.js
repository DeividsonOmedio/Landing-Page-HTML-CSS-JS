document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#inscriptions-table")
    const commentsTable = document.querySelector("#comments-table")
    let commentToDeleteIndex = null

    function loadInscriptions() {
        const incricoes = JSON.parse(localStorage.getItem("incricoes")) || []
        tableBody.innerHTML = ""
        incricoes.forEach((inscricao, index) => {
            const row = document.createElement("tr")
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${inscricao.name}</td>
                <td>${inscricao.email}</td>
                <td>${inscricao.phone}</td>
                <td>${inscricao.interest}</td>
            `
            tableBody.appendChild(row)
        })
    }

    function loadComments() {
        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []
        commentsTable.innerHTML = ""
        comentarios.forEach((comentario, index) => {
            const row = document.createElement("tr")
            let approveButton = ''

            // Mostrar o botão de aprovação somente se o status for 'pendente'
            if (comentario.status === 'pendente') {
                approveButton = `
                    <button class="btn btn-success btn-approve" data-index="${index}">Aprovar</button>
                `
            }

            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${comentario.name}</td>
                <td>${comentario.comment}</td>
                <td>
                    ${approveButton}
                    <button class="btn btn-danger btn-delete" data-index="${index}" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">Excluir</button>
                </td>
            `
            commentsTable.appendChild(row)
        })

        document.querySelectorAll(".btn-approve").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index")
                approveComment(index)
            })
        })

        document.querySelectorAll(".btn-delete").forEach(button => {
            button.addEventListener("click", (event) => {
                commentToDeleteIndex = event.target.getAttribute("data-index")
            })
        })
    }

    function approveComment(index) {
        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []
        comentarios[index].status = "aprovado"
        localStorage.setItem("comentarios", JSON.stringify(comentarios))
        loadComments()
    }

    function deleteComment(index) {
        let comentarios = JSON.parse(localStorage.getItem("comentarios")) || []
        comentarios.splice(index, 1)
        localStorage.setItem("comentarios", JSON.stringify(comentarios))
        loadComments()
    }

    document.getElementById("confirmDeleteButton").addEventListener("click", () => {
        if (commentToDeleteIndex !== null) {
            deleteComment(commentToDeleteIndex)
            commentToDeleteIndex = null
            const confirmDeleteModal = document.getElementById('confirmDeleteModal')
            const modal = bootstrap.Modal.getInstance(confirmDeleteModal)
            modal.hide()
        }
    })

    loadInscriptions()
    loadComments()
})
