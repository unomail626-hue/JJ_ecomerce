# CLAUDE.md — Instruções para Correção

## Erros e Problemas Encontrados no Projeto `jj_ecommerce`

### 🔴 Críticos (potencial de quebra)

1. **`notFound()` chamado durante a renderização** — `src/app/produtos/[id]/page.tsx:20`
   `notFound()` é chamado diretamente no corpo do componente, não dentro de um `useEffect` ou condicional assíncrona. Em produção com App Router, isso funciona, mas precisa de um `not-found.tsx` para exibir algo ao usuário. Criar `src/app/not-found.tsx`.

2. **Página de detalhe do produto é Client Component** — `src/app/produtos/[id]/page.tsx:1`
   Usa `"use client"` por causa do `useParams()`. Isso impede SSR e export de `metadata` dinâmico para SEO. Refatorar: criar um server component wrapper que extrai o `params` e passa para um client component interno.

3. **Botão "+" no carrinho não respeita o estoque máximo** — `src/components/CartDrawer.tsx:295` e `src/app/carrinho/page.tsx:355`
   Os botões de incremento no drawer e na página do carrinho não têm `disabled` quando `quantity >= product.stock`. O usuário pode adicionar mais itens do que o estoque permite. Adicionar verificação: `disabled={item.quantity >= item.product.stock}`.

4. **Importação de tipos sem `type`** — `src/data/products.ts:1`
   ```ts
   import { Product, Category } from "@/types";
   ```
   Deveria ser:
   ```ts
   import type { Product, Category } from "@/types";
   ```

5. **Caractere chinês no texto de produto** — `src/data/products.ts:42`
   Na descrição do "Tecido Anhanguera": `"Disponível em多种 cores."` — contém caracteres chineses. Substituir por `"Disponível em diversas cores."`.

### 🟡 Design e Experiência (Erros)

6. **CLS (Cumulative Layout Shift) — imagens sem dimensionamento explícito**
   Vários componentes usam `<img>` com `object-fit: cover` mas sem `width` e `height`. Isso causa layout shift durante o carregamento. Adicionar `width` e `height` explícitos ou usar `next/image`.

7. **9 de 16 produtos sem imagens** — `src/data/products.ts`
   Produtos com `images: []`: IDs 8 (Zíper), 9 (Botão), 10 (Elástico), 11 (Linha 100m), 12 (Tricoline), 13 (Jeans), 14 (Fita Gorgorão), 15 (Agulhas), 16 (Oxford). O placeholder é exibido, mas é melhor ter imagens reais ou ao menos ícones representativos por categoria.

8. **Número do WhatsApp hardcoded em 6 lugares**
   - `src/app/page.tsx:70`
   - `src/app/produtos/[id]/page.tsx:173`
   - `src/app/carrinho/page.tsx:90`
   - `src/app/sobre/page.tsx:123`
   - `src/components/Footer.tsx:31,64`
   - `src/components/Hero.tsx:35`
   Extrair para uma constante em `src/lib/constants.ts`.

9. **Opacidade piscando no ProductGrid** — `src/components/ProductGrid.tsx:46-56`
   O efeito de `opacity: 0.6` seguido de `opacity: 1` quando filtros mudam causa um flash visual desagradável. Remover ou substituir por uma transição mais suave.

10. **onClick vazio no CartDrawerItem** — `src/components/CartDrawer.tsx:277-278`
    ```tsx
    onClick={() => {}}
    ```
    Código morto. Remover ou implementar o fechamento do drawer.

### 🟠 SEO e Performance

11. **Sem metadata dinâmica nas páginas de produto** — `src/app/produtos/[id]/page.tsx`
    Por ser Client Component, não exporta `metadata`. Cada página de produto deveria ter title e description específicos para SEO.

12. **Font Awesome via CDN** — `src/app/layout.tsx:31-34`
    Dependência externa. Se a CDN cair, todos os ícones quebram. Considerar instalar via npm: `npm install @fortawesome/fontawesome-free` e importar localmente.

13. **`zod` instalado mas não utilizado** — `package.json:15`
    Dependência desnecessária. Remover ou implementar validação com Zod.

### 🔵 Manutenção e Qualidade

14. **Sem `.gitignore`**
    Arquivo `.gitignore` não existe. `node_modules/`, `.next/` e `*.local` seriam rastreados pelo git. Criar com:
    ```
    node_modules/
    .next/
    *.local
    ```

15. **Sem `not-found.tsx`** — Página 404 personalizada ausente.

16. **Sem `error.tsx`** — Error boundary ausente para capturar erros de runtime.

17. **Sem `loading.tsx`** — Estados de carregamento para navegação entre rotas.

18. **Campo de busca sem `type="search"`** — `src/components/ProductGrid.tsx:72`
    Adicionar `type="search"` no input de busca para melhor acessibilidade e UX mobile.

19. **Botão de finalizar compra quebra padrão visual do `.btn`** — `src/app/carrinho/page.tsx:257-267`
    O `.checkout-btn` sobrescreve o background para verde do WhatsApp. Considere extrair para uma classe `.btn-whatsapp` reutilizável.

### 🟣 Design Visual — Melhorias de Aparência

20. **Substituir placeholders de produtos sem imagem por ícones de categoria** — `src/data/products.ts`
    Para os 9 produtos sem imagem, em vez de um placeholder genérico (ícone `fa-image`), usar um ícone representativo da categoria:
    - Aviamentos: `fa-scissors`
    - Linhas: `fa-thread` (ou `fa-solid fa-screwdriver` — verificar disponibilidade)
    - Tecidos: `fa-shirt`
    Criar um mapa `categoryIconMap` em `src/lib/constants.ts` e usar nos placeholders de `ProductCard.tsx`, `CartDrawer.tsx` e `carrinho/page.tsx`.

21. **Aumentar botões de quantidade no carrinho para 44×44px** — `src/components/CartDrawer.tsx` e `src/app/carrinho/page.tsx`
    Os botões `+` e `-` têm 26-28px atualmente. O mínimo recomendado para toque em mobile é 44×44px. Ajustar `width`, `height` e `font-size` nos seletores `.drawer-item-qty button` e `.cart-row-qty button`.

22. **Corrigir contraste de textos em `#888`** — `src/components/CartDrawer.tsx`, `src/components/ProductGrid.tsx`, `src/app/carrinho/page.tsx`
    Textos com `color: #888` sobre fundo branco têm contraste ~3,2:1 (falha WCAG AA, que exige 4,5:1). Substituir por `#666` em:
    - `CartDrawer.tsx:193` (`.drawer-empty i`)
    - `CartDrawer.tsx:161` (`.drawer-count`)
    - `ProductGrid.tsx:306` (`.catalog-empty i`)
    - `carrinho/page.tsx:159` (`.cart-empty i`)

23. **Corrigir loop do carrossel do Hero** — `src/components/Hero.tsx:49-50`
    O carrossel usa `slides.concat(slides[0])` e animação `carouselMove` com `infinite`. Ao final do ciclo, a transição de volta não é suave. Melhorias possíveis:
    - Opção A: Usar `animation: carouselMove 40s infinite linear` com `-100%` e garantir que o último slide (duplicata do primeiro) faça a transição sem pulo.
    - Opção B: Implementar um carrossel com `setInterval` e `transition` para controle mais preciso.
    - Opção C: Usar CSS scroll-snap com rolagem automática via JS.

24. **Extrair cores repetidas para variáveis CSS** — Todos os arquivos com `<style jsx>`
    Hoje `#2727a8`, `#555`, `#f4f4f7`, `#e0e0e8` e outras cores estão hardcoded dezenas de vezes nos blocos `<style jsx>`.
    Substituir pelos tokens já existentes em `globals.css`:
    - `#2727a8` → `var(--azul)`
    - `#3d3dd4` → `var(--azul-claro)`
    - `#f4f4f7` → `var(--cinza)`
    - `#e0e0e8` → `var(--cinza-escuro)`
    - `#222` → `var(--texto)`
    - `#555` → `var(--texto-claro)`
    - `#e8e8ef` → `var(--borda)`
    **Atenção:** o seletor `:global(.btn)` no Hero (linha 150-164) sobrescreve o `.btn` padrão. Verificar se a variável funciona ou se precisa de !important.

25. **Corrigir inconsistência de fontes em títulos** — `src/components/CartDrawer.tsx:152`, `src/app/carrinho/page.tsx:171`, `src/app/sobre/page.tsx:288`
    Títulos usando `font-family: "Inter", sans-serif` em vez de `"Playfair Display", serif`. Padronizar para Playfair Display nos títulos principais.

26. **Adicionar animação fadeIn nos cards ao carregar página** — `src/components/ProductGrid.tsx` e `src/app/page.tsx`
    Aplicar `animation: fadeInUp 0.5s ease forwards` nos cards de produto com `animation-delay` escalonado baseado no index. Usar a keyframe `fadeInUp` já definida em `globals.css:234-243`.

27. **Deixar botão de remover item do carrinho sempre visível** — `src/components/CartDrawer.tsx:425`, `src/app/carrinho/page.tsx:487`
    O ícone de lixeira em `#bbb` fica muito apagado. Alterar cor padrão para `#999` no mínimo, e manter `#ff4757` no hover. Alternativamente, usar um botão "Remover" com texto em vez de só ícone.

28. **CSS de breadcrumbs duplicado** — `src/app/produtos/[id]/page.tsx:201-231`, `src/app/carrinho/page.tsx:118-143`, `src/app/sobre/page.tsx:139-164`
    O mesmo CSS de breadcrumbs (padding, fundo, links, hover) está copiado em 3 arquivos. Mover para `globals.css` como classes `.breadcrumbs`, `.breadcrumbs a`, `.breadcrumbs .current`.

29. **Adicionar favicon** — `src/app/layout.tsx`
    Adicionar `<link rel="icon" href="/favicon.ico" />` no `<head>`. Gerar um favicon.ico a partir da logo ou usar um inline SVG.

30. **Adicionar shimmer/skeleton enquanto imagens carregam** — `src/components/ProductCard.tsx`
    Enquanto a imagem do produto carrega, exibir um skeleton shimmer animado no lugar do fundo cinza liso. Criar keyframe `@keyframes shimmer` e aplicar como fundo do `.card-image` antes da imagem carregar.

31. **Categorias da Home linkando para slug específico** — `src/app/page.tsx:28-39`
    Em vez de todas linkarem para `/produtos`, usar `/produtos?categoria=tecidos` etc. para já filtrar ao entrar no catálogo. O `ProductGrid` precisará ler `searchParams` para aplicar o filtro inicial.

32. **Adicionar feedback visual ao adicionar item já existente no carrinho** — `src/components/ProductCard.tsx:23-26` e `src/context/CartContext.tsx:36-48`
    Quando o produto já está no carrinho e o usuário clica "Adicionar" novamente, o `CartContext` apenas incrementa a quantidade sem feedback. No `ProductCard`, mostrar um toast "Quantidade atualizada!" ou mudar o botão temporariamente para " +1 ".

### Instruções de Correção

Para cada item acima:
1. Corrija o arquivo na linha indicada seguindo as convenções existentes do projeto
2. Execute `npm run build` e `npm run lint` para verificar se não introduziu erros
3. Verifique visualmente a página no navegador em `localhost:3000`

Ordem recomendada:
- **Lote 1** (itens 1-5): Críticos
- **Lote 2** (itens 14-19): Infraestrutura (.gitignore, páginas 404/error/loading)
- **Lote 3** (itens 20-22): Alto impacto visual (imagens, botões, contraste)
- **Lote 4** (itens 24-25, 28): Refatoração CSS
- **Lote 5** (itens 23, 26-27, 29-32): Polimento visual
