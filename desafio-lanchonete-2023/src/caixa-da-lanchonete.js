class CaixaDaLanchonete {
    constructor() {
        this.cardapio = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        ];

        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        const carrinho = {};
        let total = 0;

        for (const pedido of itens) {
            const [codigo, quantidade] = pedido.split(',');
            const item = this.cardapio.find(i => i.codigo === codigo);

            if (!item) {
                return "Item inválido!";
            }

            if (codigo !== 'chantily' && quantidade === '0') {
                return "Quantidade inválida!";
            }

            if (!carrinho[codigo]) {
                carrinho[codigo] = 0;
            }

            carrinho[codigo] += parseInt(quantidade);
        }

        for (const codigo in carrinho) {
            const item = this.cardapio.find(i => i.codigo === codigo);
            const quantidade = carrinho[codigo];

            if (codigo === 'chantily') {
                const cafeQuantity = carrinho['cafe'] || 0;
                if (cafeQuantity === 0) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            } else if (codigo === 'queijo') {
                const sanduicheQuantity = carrinho['sanduiche'] || 0;
                if (sanduicheQuantity === 0) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            total += item.valor * quantidade;
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === 'credito') {
            total *= 1.03; // Acréscimo de 3% para pagamento a crédito
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
