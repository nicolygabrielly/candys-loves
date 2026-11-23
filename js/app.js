let receitas = JSON.parse(localStorage.getItem("candyReceitas_v5")) || [];

let categoriaAtual = "Todas";

// RECEITAS INICIAIS
const receitasIniciais = [
    {
        id: "1",
        nome: "Bolo de Chocolate",
        descricao: "Bolo fofinho com cobertura cremosa de chocolate.",
        categoria: "Bolos",
        ingredientes: "Farinha, açúcar, ovos, chocolate, leite e fermento.",
        preparo: "Misture os ingredientes, coloque em uma forma e asse até ficar pronto.",
        imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
    },
    {
        id: "2",
        nome: "Pizza Margherita",
        descricao: "Pizza caseira tradicional com queijo e tomate.",
        categoria: "Salgados",
        ingredientes: "Massa de pizza, queijo, tomate e manjericão.",
        preparo: "Monte a pizza com os ingredientes e leve ao forno.",
        imagem: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600"
    },
    {
        id: "3",
        nome: "Panquecas da Vovó",
        descricao: "Panquecas macias para o café da manhã.",
        categoria: "Outros",
        ingredientes: "Farinha, leite, ovos, açúcar e banana.",
        preparo: "Misture os ingredientes e doure as panquecas em uma frigideira.",
        imagem: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600"
    },
    {
        id: "4",
        nome: "Torta de Morango",
        descricao: "Torta doce com morangos fresquinhos.",
        categoria: "Doces",
        ingredientes: "Morango, leite condensado, creme de leite e massa.",
        preparo: "Prepare o creme, coloque sobre a massa e decore com morangos.",
        imagem: "https://guiadacozinha.com.br/wp-content/uploads/2019/10/torta-morango-chocolate-768x619.jpg"
    },
    {
        id: "5",
        nome: "Torta Salgada",
        descricao: "Torta deliciosa para compartilhar com a família.",
        categoria: "Salgados",
        ingredientes: "Farinha, ovos, leite, frango e temperos.",
        preparo: "Prepare a massa, adicione o recheio e asse.",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQszCj0TUf2xUbFOEBLm0A-MYS9qTK7nn5_UbZ3BqOYuG08sYYacTNphYs&s=10"
    },
    {
        id: "6",
        nome: "Suspiro Caseiro",
        descricao: "Suspiros leves e crocantes.",
        categoria: "Doces",
        ingredientes: "Claras de ovos e açúcar.",
        preparo: "Bata as claras com açúcar e asse em temperatura baixa.",
        imagem: "https://www.estadao.com.br/resizer/v2/FOT6X6IUDZDKDKB2UOR2NRDOLY.jpg?quality=80&auth=bfcbe2151d4b91cafabb67463f5ee08a8251b4c7da33e0e08b7915ecd9eb8761&width=1200&height=1200&focal=1757,1484"
    },
    {
        id: "7",
        nome: "Gelatina Colorida",
        descricao: "Sobremesa refrescante e colorida.",
        categoria: "Doces",
        ingredientes: "Gelatinas de sabores variados e creme de leite.",
        preparo: "Bata os ingredientes no liquidificador, despeje na forma caramelizada e asse em banho-maria.",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu1GyVBmh1QRmStGpet6A_3Q0GRjgFJRdboysN5Qnfng&s=10"
    },
    {
        
        id: "8",
        nome: "Pudim de Leite",
        descricao: "Pudim cremoso com calda de caramelo brilhante.",
        categoria: "Doces",
        ingredientes: "Leite condensado, leite, ovos e açúcar para a calda.",
        preparo: "Prepare as gelatinas, corte em cubos e misture com o creme.",
        imagem: "https://edge.osuper.com.br/VinY3Z1VZGE91Vd2r5Lus4fRSn8=/675x336/smart/https://osuper-ecommerce-koch.s3.sa-east-1.amazonaws.com/967eb86b-chatgpt-image-20072026-135657.png"
    },
    {     
        id: "9",
        nome: "Brigadeiro de Ninho ",
        descricao: "Docinho cremoso de leite Ninho que derrete na boca.",
        categoria: "Doces",
        ingredientes: "1 lata de leite condensado, 4 colheres (sopa) de leite Ninho, 1 colher (sopa) de manteiga e leite Ninho para enrolar",
        preparo: "Misture tudo na panela em fogo baixo até desgrudar do fundo. Deixe esfriar, enrole e passe no leite Ninho.",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR7UNZ2rTd1-j34kMlsJR5hD9MjhSzP6XgtM0mBJ99CMP7NCRQRNp9oFo&s=10"   
    }
];

// SALVAR DADOS
function salvarDados() {
    localStorage.setItem("candyReceitas_v5", JSON.stringify(receitas));
}

// CRIAR DESTAQUES
function mostrarDestaques() {
    const destaques = document.getElementById("destaques");
    if (!destaques) return;

    destaques.innerHTML = "";

    receitas.slice(0, 7).forEach(receita => {
        const card = document.createElement("div");
        card.className = "destaque-card";

        const imagem = document.createElement("img");
        imagem.src = receita.imagem || "https://placehold.co/300x200?text=Receita";
        imagem.alt = receita.nome;
        imagem.onerror = () => {
            imagem.src = "https://placehold.co/300x200/f8d7da/842029?text=" + encodeURIComponent(receita.nome);
        };

        const titulo = document.createElement("h3");
        titulo.textContent = receita.nome;

        card.append(imagem, titulo);
        card.addEventListener("click", () => verReceita(receita.id));

        destaques.appendChild(card);
    });
}

// READ - LISTAR RECEITAS
function listarReceitas() {
    const lista = document.getElementById("listaReceitas");
    if (!lista) return;

    const pesquisa = document.getElementById("pesquisa")?.value.toLowerCase() || "";

    lista.innerHTML = "";

    const filtradas = receitas.filter(receita => {
        const combinaCategoria =
            categoriaAtual === "Todas" ||
            receita.categoria === categoriaAtual;

        const combinaPesquisa =
            receita.nome.toLowerCase().includes(pesquisa);

        return combinaCategoria && combinaPesquisa;
    });

    filtradas.forEach(receita => {
        const card = document.createElement("article");
        card.className = "receita-card";

        const imagem = document.createElement("img");
        imagem.src = receita.imagem || "https://placehold.co/600x400?text=Receita";
        imagem.alt = receita.nome;
        imagem.onerror = () => {
            imagem.src = "https://placehold.co/600x400/f8d7da/842029?text=" + encodeURIComponent(receita.nome);
        };

        const conteudo = document.createElement("div");
        conteudo.className = "receita-conteudo";

        const categoria = document.createElement("span");
        categoria.className = "categoria-tag";
        categoria.textContent = receita.categoria;

        const titulo = document.createElement("h3");
        titulo.textContent = receita.nome;

        const descricao = document.createElement("p");
        descricao.textContent = receita.descricao;

        const ver = document.createElement("button");
        ver.className = "btn-ver";
        ver.textContent = "Ver Receita";
        ver.onclick = () => verReceita(receita.id);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const editar = document.createElement("button");
        editar.className = "btn-editar";
        editar.textContent = "Editar";
        editar.onclick = () => carregarEdicao(receita.id);

        const excluir = document.createElement("button");
        excluir.className = "btn-excluir";
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirReceita(receita.id);

        acoes.append(editar, excluir);
        conteudo.append(categoria, titulo, descricao, ver, acoes);
        card.append(imagem, conteudo);

        lista.appendChild(card);
    });

    if (filtradas.length === 0) {
        lista.textContent = "Nenhuma receita encontrada. ";
    }

    mostrarDestaques();
}

// CREATE - ABRIR FORMULÁRIO
function abrirFormulario() {
    document.getElementById("formReceita").reset();
    document.getElementById("idReceita").value = "";
    document.getElementById("tituloFormulario").textContent = "Guardar Receita 🍰";
    document.getElementById("modal").classList.add("aberto");
}

// FECHAR FORMULÁRIO
function fecharFormulario() {
    document.getElementById("modal").classList.remove("aberto");
}

// FUNÇÃO AUXILIAR PARA SALVAR A RECEITA
function finalizarSalvamento(id, imagemFinal) {
    const receita = {
        id: id || String(Date.now()),
        nome: document.getElementById("nome").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        categoria: document.getElementById("categoria").value,
        ingredientes: document.getElementById("ingredientes").value.trim(),
        preparo: document.getElementById("preparo").value.trim(),
        imagem: imagemFinal || "https://placehold.co/600x400/f8d7da/842029?text=Minha+Receita"
    };

    if (id) {
        receitas = receitas.map(item => (item.id === id ? receita : item));
        alert("Receita atualizada com sucesso! ❤️");
    } else {
        receitas.unshift(receita);
        alert("Receita cadastrada com sucesso! 🍰");
    }

    salvarDados();
    listarReceitas();
    fecharFormulario();
}

// CADASTRAR E ATUALIZAR
document.getElementById("formReceita").addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("idReceita").value;
    const arquivoInput = document.getElementById("arquivoImagem");
    const linkImagem = document.getElementById("imagem").value.trim();

    if (arquivoInput && arquivoInput.files && arquivoInput.files[0]) {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            finalizarSalvamento(id, e.target.result);
        };
        leitor.readAsDataURL(arquivoInput.files[0]);
    } else {
        const receitaAntiga = receitas.find(item => item.id === id);
        const imagemFinal = linkImagem || (receitaAntiga ? receitaAntiga.imagem : "");
        finalizarSalvamento(id, imagemFinal);
    }
});

// UPDATE - EDITAR
function carregarEdicao(id) {
    const receita = receitas.find(item => item.id === id);
    if (!receita) return;

    document.getElementById("idReceita").value = receita.id;
    document.getElementById("nome").value = receita.nome;
    document.getElementById("descricao").value = receita.descricao;
    document.getElementById("categoria").value = receita.categoria;
    document.getElementById("ingredientes").value = receita.ingredientes;
    document.getElementById("preparo").value = receita.preparo;
    document.getElementById("imagem").value = receita.imagem.startsWith("http") ? receita.imagem : "";

    document.getElementById("tituloFormulario").textContent = "Editar Receita ✏️";
    document.getElementById("modal").classList.add("aberto");
}

// DELETE - EXCLUIR
function excluirReceita(id) {
    const confirmar = confirm("Deseja realmente excluir esta receita?");
    if (!confirmar) return;

    receitas = receitas.filter(item => item.id !== id);
    salvarDados();
    listarReceitas();
    alert("Receita excluída com sucesso!");
}

// VER DETALHES
function verReceita(id) {
    const receita = receitas.find(item => item.id === id);
    if (!receita) return;

    const conteudo = document.getElementById("conteudoDetalhes");
    conteudo.innerHTML = "";

    const imagem = document.createElement("img");
    imagem.src = receita.imagem;
    imagem.alt = receita.nome;
    imagem.className = "detalhes-img";

    const titulo = document.createElement("h2");
    titulo.textContent = receita.nome;

    const categoria = document.createElement("p");
    categoria.textContent = "Categoria: " + receita.categoria;

    const descricao = document.createElement("p");
    descricao.textContent = receita.descricao;

    const ingredientes = document.createElement("p");
    ingredientes.className = "detalhes-texto";
    ingredientes.textContent = "🥣 INGREDIENTES:\n" + receita.ingredientes;

    const preparo = document.createElement("p");
    preparo.className = "detalhes-texto";
    preparo.textContent = "👩‍🍳 MODO DE PREPARO:\n" + receita.preparo;

    conteudo.append(imagem, titulo, categoria, descricao, ingredientes, preparo);
    document.getElementById("modalDetalhes").classList.add("aberto");
}

function fecharDetalhes() {
    document.getElementById("modalDetalhes").classList.remove("aberto");
}

// FILTRAR CATEGORIAS
function filtrar(categoria) {
    categoriaAtual = categoria;
    listarReceitas();
}

// PESQUISAR
document.getElementById("pesquisa").addEventListener("input", listarReceitas);

// LOGIN
function login() {
    alert(" login realizado com sucesso! ❤️");
}

// INICIAR SISTEMA
if (!Array.isArray(receitas) || receitas.length === 0) {
    receitas = [...receitasIniciais];
    salvarDados();
}

listarReceitas();