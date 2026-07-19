# J&J Tecidos e Aviamentos — E-commerce

Catálogo digital e carrinho de compras com finalização via WhatsApp para a loja física **J&J Tecidos e Aviamentos**, localizada em Campinas/SP.

## Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**
- **styled-jsx** (estilização escopada)
- **Font Awesome** (ícones)
- **React Context API** (estado do carrinho)
- **localStorage** (persistência do carrinho)

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento em `http://localhost:3000` |
| `npm run build` | Gera build de produção |
| `npm start` | Inicia servidor de produção (após `build`) |
| `npm run lint` | Executa linter do Next.js |

## Como rodar

```bash
# 1. Acesse a pasta do projeto
cd jj_ecommerce

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura

```
src/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout raiz (Header, Footer, CartProvider)
│   ├── page.tsx             # Página inicial (Hero, categorias, destaque)
│   ├── carrinho/page.tsx    # Página do carrinho
│   ├── produtos/
│   │   ├── page.tsx         # Catálogo com busca e filtros
│   │   └── [id]/page.tsx    # Detalhe do produto
│   └── sobre/page.tsx       # Sobre a loja
├── components/              # Componentes reutilizáveis
├── context/                 # Contexto do carrinho
├── data/                    # Dados estáticos dos produtos
└── types/                   # Tipos TypeScript
```

## Funcionalidades

- Catálogo com busca, filtro por categoria e ordenação
- Página de detalhe do produto com fotos, estoque e desconto
- Carrinho lateral (drawer) e página completa do carrinho
- Carrinho persistido no `localStorage`
- Finalização do pedido via WhatsApp
- Design responsivo e acessível
- Meta tags SEO por página

## Contato da loja

- **WhatsApp:** +55 (19) 97114-0393
- **Instagram:** @jej_aviamentos
- **Endereço:** R. Ferreira Penteado, 308 — Centro, Campinas/SP
