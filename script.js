// Usuários pré-definidos
const usuarios = {
  "admin": "1234",
  "editor": "senha"
};

// Login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (usuarios[user] && usuarios[user] === pass) {
    localStorage.setItem("logado", "true");
    window.location.href = "noticias.html";
  } else {
    alert("Usuário ou senha inválidos!");
  }
}

function skipLogin() {
  localStorage.setItem("logado", "false");
  window.location.href = "noticias.html";
}

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

// Exibir ou ocultar formulário de postagem
window.onload = function () {
  if (window.location.pathname.includes("noticias.html")) {
    const logado = localStorage.getItem("logado");
    if (logado === "true") {
      document.getElementById("postarNoticia").style.display = "block";
    }
    carregarNoticias();
  }
};

// Postar notícia
function postar() {
  const titulo = document.getElementById("titulo").value;
  const subtitulo = document.getElementById("subtitulo").value;
  const imagem = document.getElementById("imagem").value;

  if (!titulo || !subtitulo || !imagem) {
    alert("Preencha todos os campos!");
    return;
  }

  const noticia = { titulo, subtitulo, imagem };

  let noticias = JSON.parse(localStorage.getItem("noticias")) || [];
  noticias.unshift(noticia); // adiciona no início
  localStorage.setItem("noticias", JSON.stringify(noticias));

  carregarNoticias();
  document.getElementById("titulo").value = "";
  document.getElementById("subtitulo").value = "";
  document.getElementById("imagem").value = "";
}

// Carregar notícias
function carregarNoticias() {
  const container = document.getElementById("noticiasContainer");
  if (!container) return;

  container.innerHTML = "";
  const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

  noticias.forEach(n => {
    const div = document.createElement("div");
    div
