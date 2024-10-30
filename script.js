// script.js

const API_KEY = '672280105c99dc78b29ca80a'; // Substitua pela sua chave da API do RestDB.io
const DATABASE_URL = 'https://vestibularb-4c25.restdb.io/rest/inscricao?max=2'; // Substitua pelo URL da sua coleção

document.getElementById('inscricaoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const curso = document.getElementById('curso').value;
    const modalidadeConcorrencia = document.getElementById('modalidadeConcorrencia').value;

    const newInscricao = {
        nomeCompleto,
        dataNascimento,
        cpf,
        rg,
        curso,
        modalidadeConcorrencia,
        idInscricao: Date.now() // Gera um ID único baseado no timestamp
    };

    const response = await fetch(DATABASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': API_KEY,
            'cache-control': 'no-cache'
        },
        body: JSON.stringify(newInscricao)
    });

    if (response.ok) {
        alert('Inscrição realizada com sucesso!');
        document.getElementById('inscricaoForm').reset();
    } else {
        alert('Erro ao realizar a inscrição.');
    }
});

document.getElementById('consultaForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const idInscricao = document.getElementById('idInscricao').value;

    const response = await fetch(`${DATABASE_URL}?q={"idInscricao":${idInscricao}}`, {
        method: 'GET',
        headers: {
            'x-apikey': API_KEY,
            'cache-control': 'no-cache'
        }
    });

    if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
            // Redireciona para candidato.html
            window.location.href = 'candidato.html';
        } else {
            alert('ID de inscrição não encontrado.');
        }
    } else {
        alert('Erro ao consultar inscrição.');
    }
});

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const usuarioAdmin = document.getElementById('usuarioAdmin').value;
    const senhaAdmin = document.getElementById('senhaAdmin').value;

    // Verifica as credenciais do administrador
    if (usuarioAdmin === 'ad' && senhaAdmin === '01') {
        window.location.href = 'admin.html'; // Redireciona para o portal do administrador
    } else {
        alert('Usuário ou senha incorretos.');
    }
});
