const addBtn = document.getElementById('addBtn');
const tarefaInput = document.getElementById('tarefaInput');
const listaTarefas = document.getElementById('listaTarefas');

addBtn.addEventListener('click', adicionarTarefa);
tarefaInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') adicionarTarefa();
});

function adicionarTarefa() {
    const tarefaTexto = tarefaInput.value.trim();
    if (tarefaTexto !== "") {
        const li = document.createElement('li');

        const texto = document.createElement('span');
        texto.className = 'task-text';
        texto.textContent = tarefaTexto;

        const toggleTextBtn = document.createElement('button');
        toggleTextBtn.className = 'toggle-text-btn';
        toggleTextBtn.textContent = 'Ler mais';
        toggleTextBtn.style.display = 'none'; // aparece só se o texto for grande

        // Depois de renderizar, verifica se ficou maior que 2 linhas
        requestAnimationFrame(() => {
            const lineHeight = parseFloat(getComputedStyle(texto).lineHeight);
            const maxHeight = lineHeight * 2;
            if (texto.scrollHeight > maxHeight + 1) {
                toggleTextBtn.style.display = 'inline-block';
            }
        });

        toggleTextBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            texto.classList.toggle('expanded');
            toggleTextBtn.textContent = texto.classList.contains('expanded') ? 'Ler menos' : 'Ler mais';
        });

        const concluirBtn = document.createElement('button');
        concluirBtn.textContent = 'Concluir';
        concluirBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            li.classList.toggle('completed');
            concluirBtn.textContent = li.classList.contains('completed') ? 'Desfazer' : 'Concluir';
        });

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Deletar';
        delBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            listaTarefas.removeChild(li);
        });

        li.appendChild(texto);
        li.appendChild(toggleTextBtn);
        li.appendChild(concluirBtn);
        li.appendChild(delBtn);
        listaTarefas.appendChild(li);



        li.appendChild(delBtn);
        listaTarefas.appendChild(li);

        tarefaInput.value = ""; // limpa o input
    } else {
        alert("Digite uma tarefa!");
    }
}
