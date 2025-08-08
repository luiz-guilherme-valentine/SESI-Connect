const dbURL = "https://sesi-connect-default-rtdb.firebaseio.com/";

// Transforma email em uma chave válida
function sanitizeEmail(email) {
  return email.replaceAll(".", "_");
}

// Cria estrutura inicial de banco se não existir
function criarEstruturaInicial() {
  fetch(`${dbURL}.json`)
    .then(res => res.json())
    .then(data => {
      const atualizacoes = {};
      if (!data.usuarios) atualizacoes.usuarios = {};
      if (!data.noticias) atualizacoes.noticias = {};
      if (Object.keys(atualizacoes).length > 0) {
        fetch(`${dbURL}.json`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(atualizacoes)
        });
      }
    });
}
criarEstruturaInicial();

function login() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const mensagem = document.getElementById("mensagem");
  const userKey = sanitizeEmail(email);

  fetch(`${dbURL}/usuarios/${userKey}.json`)
    .then(res => res.json())
    .then(data => {
      if (data && data.senha === senha) {
        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.style.color = "green";
        localStorage.setItem("usuario", email);
        setTimeout(() => window.location.href = "noticias.html", 1000);
      } else {
        mensagem.textContent = "Email ou senha incorretos.";
        mensagem.style.color = "#cc0000";
      }
    })
    .catch(err => {
      mensagem.textContent = "Erro ao conectar com o servidor.";
      console.error(err);
    });
}

function registrar() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const mensagem = document.getElementById("mensagem");
  const userKey = sanitizeEmail(email);

  fetch(`${dbURL}/usuarios/${userKey}.json`)
    .then(res => res.json())
    .then(data => {
      if (data) {
        mensagem.textContent = "Usuário já existe.";
        mensagem.style.color = "#cc0000";
      } else {
        fetch(`${dbURL}/usuarios/${userKey}.json`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ senha })
        })
        .then(() => {
          mensagem.textContent = "Conta criada com sucesso!";
          mensagem.style.color = "green";
          localStorage.setItem("usuario", email);
          setTimeout(() => window.location.href = "noticias.html", 1000);
        });
      }
    });
}
