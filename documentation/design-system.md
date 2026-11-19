# Design System Global — LeadCapture

## 1. Identidade Visual & Princípios
- Estética **Dark Luxury & Tech**: fundo preto profundo e carvão, destaque em dourado/amarelo quente, brilho ambiente subtil e contornos dourados finos.
- **Proibições explícitas**: não usar paletas roxas/violetas (`REF-25`, `REF-48`), não usar templates genéricos e não alterar o logótipo geométrico oficial.

## 2. Paleta de Cores
| Token | Valor Hex / RGBA | Utilização |
| :--- | :--- | :--- |
| `--lc-bg-primary` | `#050507` | Fundo principal do body e footer |
| `--lc-bg-secondary` | `#08090D` / `#0A0B0E` | Secções alternadas e superfícies internas |
| `--lc-bg-surface` | `#101218` | Fundo de cartões padrão |
| `--lc-bg-elevated` | `#161922` | Containers de ícones, inputs e elementos elevados |
| `--lc-gold-primary` | `#F5B800` | Cor principal de destaque, ícones, badges e CTAs |
| `--lc-gold-hover` | `#FFC929` / `#FACC15` | Estados hover e gradientes de botões |
| `--lc-border-gold` | `rgba(245, 184, 0, 0.22)` | Contorno padrão de cartões |
| `--lc-border-gold-strong` | `rgba(245, 184, 0, 0.55)` | Hover e cartões em destaque (`lc-card-featured`) |
| `--lc-text-primary` | `#FFFFFF` | Títulos e texto principal |
| `--lc-text-secondary` | `#D4D4D8` | Subtítulos e listas |
| `--lc-text-muted` | `#9CA3AF` | Descrições secundárias e metadados |

## 3. Tipografia
- **Família:** `Plus Jakarta Sans` (`next/font/google`), pesos `400`, `500`, `600`, `700`, `800`.
- **H1 Hero:** `text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08]`.
- **H2 Secção:** `text-3xl sm:text-4xl font-extrabold`.
- **Eyebrow / Badge:** `text-xs font-bold tracking-widest uppercase text-[#F5B800]`.

## 4. Escalas de Espaçamento
- **Container máximo:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Secções:** `py-12` a `py-16` (Hero `pt-10` / `pt-16` `pb-16` / `pb-20`).
- **Grelhas:** `gap-5` a `gap-6` em cards; `gap-3` a `gap-4` em elementos compactos.

## 5. Botões
- **Primário (`.lc-btn-primary`):** Gradiente dourado (`#FACC15` → `#F5B800` → `#E0A300`), texto escuro `#090A0D`, `font-weight: 700`, `rounded-full`, sombra dourada subtil e elevação `-1px` em hover.
- **Secundário (`.lc-btn-secondary`):** Fundo `#101218` translúcido, texto branco, borda `rgba(245,184,0,0.42)`, `rounded-full`.

## 6. Cartões
- **Padrão (`.lc-card`):** Gradiente vertical carvão, borda dourada subtil `0.22`, `rounded-2xl`, brilho dourado no hover.
- **Destaque (`.lc-card-featured`):** Gradiente quente sutil, borda `0.65`, sombra dourada difusa (`rounded-3xl`).

## 7. Formulários
- **Inputs (`.lc-input`):** Fundo `#161922`, borda `rgba(255,255,255,0.12)`, `rounded-xl`, focus com borda `#F5B800` e anel `rgba(245,184,0,0.15)`.

## 8. Navegação, Cabeçalho e Rodapé
- **Header (`SiteHeader`):** Sticky com `backdrop-blur-xl`, logótipo oficial à esquerda, 6 links principais + dropdowns (`Soluções`, `Por Negócio`), CTA `Pedir Demonstração` à direita, e menu drawer completo em mobile.
- **Footer (`SiteFooter`):** 5 colunas em desktop (Marca + CTAs, Soluções, Por Negócio, LeadCapture Institucional/Comercial) + barra legal inferior.

## 9. Logótipo e Ícones
- **Logótipo:** SVG geométrico oficial de 4 quadrados rodados a `-45°` em `#F5B800` + wordmark `LeadCapture®` (`src/components/ui/LeadCaptureLogo.tsx` e `public/logos/leadcapture-logo.svg`).
- **Ícones:** Biblioteca `lucide-react` mapeada via `DynamicIcon.tsx` em `#F5B800`.

## 10. Animações e Breakpoints Responsivos
- **Animações:** Transições subtis de `200ms–250ms` em bordas, brilho (`box-shadow`) e micro-translação em setas (`group-hover:translate-x-1`).
- **Breakpoints Tailwind:** `sm` (`640px`), `md` (`768px`), `lg` (`1024px`), `xl` (`1280px`).
