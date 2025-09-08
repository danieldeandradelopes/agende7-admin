# Sistema de Branding Dinâmico

## Visão Geral

O sistema de branding foi criado baseado na análise completa dos arquivos SCSS existentes no projeto. Ele permite customização dinâmica de cores e estilos através de variáveis CSS, mantendo compatibilidade com o design atual.

## Estrutura de Cores

### Cores Base (Mapeamento das variáveis existentes)

```scss
// Cores neutras
--black: #0e0d11
--white: #ffffff
--gray-300: #979494
--gray-500: #666666
--gray-700: #4b4a4e
--gray-900: #242229

// Cores de marca
--purple-100: #7359f8
--purple-300: #6f65b1
--purple-600: #302a4f
--purple-900: #28243b

// Cores de estado
--success: #3a8636
--danger: #f15a63
```

### Sistema de Branding Dinâmico

```scss
// Cores primárias
--primary-color: var(--purple-100)
--primary-dark: var(--purple-600)
--primary-light: var(--purple-300)

// Cores secundárias
--secondary-color: var(--gray-900)
--secondary-light: var(--gray-700)
--secondary-dark: var(--black)

// Cores terciárias
--tertiary-color: var(--purple-300)
--tertiary-light: var(--purple-100)
--tertiary-dark: var(--purple-900)
```

## Como Usar

### 1. Classes Utilitárias

```html
<!-- Cores de texto -->
<p class="text-primary">Texto primário</p>
<p class="text-secondary">Texto secundário</p>
<p class="text-tertiary">Texto terciário</p>
<p class="text-muted">Texto muted</p>

<!-- Cores de fundo -->
<div class="bg-primary">Fundo primário</div>
<div class="bg-secondary">Fundo secundário</div>
<div class="bg-tertiary">Fundo terciário</div>

<!-- Bordas -->
<div class="border-primary">Borda primária</div>
<div class="border-secondary">Borda secundária</div>
```

### 2. Componentes com Branding

```html
<!-- Botões -->
<button class="btn btn--primary">Botão Primário</button>
<button class="btn btn--secondary">Botão Secundário</button>
<button class="btn btn--tertiary">Botão Terciário</button>
<button class="btn btn--outline">Botão Outline</button>

<!-- Inputs -->
<input type="text" class="input" placeholder="Digite aqui..." />

<!-- Cards -->
<div class="card">Card padrão</div>
<div class="card card--primary">Card primário</div>
<div class="card card--secondary">Card secundário</div>
```

### 3. Estados de Hover

```html
<div class="hover-primary">Hover primário</div>
<div class="hover-secondary">Hover secundário</div>
<div class="hover-tertiary">Hover terciário</div>
```

## Temas Pré-definidos

### Tema Escuro (Padrão)

```html
<body class="theme-dark">
  <!-- Conteúdo com tema escuro -->
</body>
```

### Tema Claro

```html
<body class="theme-light">
  <!-- Conteúdo com tema claro -->
</body>
```

## Customização Dinâmica

### Via JavaScript

```typescript
import { applyBranding } from "../utils/branding";

const customBranding = {
  primaryColor: "#ff6b6b",
  secondaryColor: "#4ecdc4",
  tertiaryColor: "#45b7d1",
  textColor: "#2c3e50",
  backgroundColor: "#ecf0f1",
  // ... outras propriedades
};

applyBranding(customBranding);
```

### Via CSS Custom Properties

```css
:root {
  --primary-color: #ff6b6b;
  --secondary-color: #4ecdc4;
  --tertiary-color: #45b7d1;
  --text-color: #2c3e50;
  --background-color: #ecf0f1;
}
```

## Animações

```html
<div class="fade-in">Aparece com fade</div>
<div class="slide-in">Desliza da esquerda</div>
```

## Responsividade

O sistema de branding inclui breakpoints responsivos:

- **Desktop**: > 768px
- **Tablet**: 480px - 768px
- **Mobile**: < 480px

## Compatibilidade

### Mapeamento das Variáveis Existentes

| Variável Antiga     | Nova Variável                 | Descrição             |
| ------------------- | ----------------------------- | --------------------- |
| `var(--purple-100)` | `var(--primary-color)`        | Cor primária da marca |
| `var(--gray-900)`   | `var(--secondary-color)`      | Cor secundária        |
| `var(--gray-700)`   | `var(--background-secondary)` | Fundo secundário      |
| `var(--gray-300)`   | `var(--text-secondary)`       | Texto secundário      |
| `var(--white)`      | `var(--text-color)`           | Texto principal       |
| `var(--black)`      | `var(--background-color)`     | Fundo principal       |

### Migração Gradual

Para migrar gradualmente do sistema antigo:

1. **Fase 1**: Usar as novas classes utilitárias em novos componentes
2. **Fase 2**: Substituir variáveis antigas pelas novas em componentes existentes
3. **Fase 3**: Remover variáveis antigas não utilizadas

## Exemplos de Uso

### Botão com Branding Dinâmico

```scss
.custom-button {
  @extend .btn;
  @extend .btn--primary;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
}
```

### Card com Gradiente

```scss
.gradient-card {
  @extend .card;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--tertiary-color)
  );
  color: var(--text-inverse);
}
```

### Input com Validação

```scss
.input {
  @extend .input;

  &.valid {
    border-color: var(--success-color);
  }

  &.invalid {
    border-color: var(--error-color);
  }
}
```

## Boas Práticas

1. **Sempre use as variáveis CSS** em vez de cores hardcoded
2. **Teste em diferentes temas** para garantir contraste adequado
3. **Use as classes utilitárias** para consistência
4. **Mantenha a acessibilidade** verificando contraste de cores
5. **Documente customizações** específicas do projeto

## Troubleshooting

### Problema: Cores não estão aplicando

**Solução**: Verifique se o arquivo `branding.scss` está sendo importado no `index.scss`

### Problema: Conflito com estilos existentes

**Solução**: Use especificidade CSS ou `!important` quando necessário

### Problema: Branding não persiste

**Solução**: Verifique se o localStorage está funcionando e se as funções JavaScript estão sendo chamadas corretamente
