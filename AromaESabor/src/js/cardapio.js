async function carregarProduto() {
    try {
        const response = await fetch('http://localhost:8000/api/products');
        const result = await response.json();
        console.log(result);

        // Se o array estiver na propriedade "data", use-a; caso contrário, use o result diretamente
        const produtos = Array.isArray(result) ? result : result.data;

        if (!produtos || !Array.isArray(produtos)) {
            throw new Error('Formato de dados inesperado');
        }

        const container = document.getElementById('menu');
        if (!container) {
            console.error("Elemento 'cards-container' não encontrado.");
            return;
        }
        container.innerHTML = '';

        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
          <img src=http://127.0.0.1:8000${produto.image}
						alt="Café Expresso" width="150px">
          <h3>${produto.name}</h3>
          <p>Preço: R$ ${produto.price}</p>
          <p>Tipo: ${produto.type}</p>
        `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarProduto);
