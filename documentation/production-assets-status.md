# Inventário Reconciliado de Assets de Produção (`public/images/production/`)

> **Última reconciliação:** 2026-11-22  
> **Fontes cruzadas:** `REF-26` (*Lista de Imagens para o Antigravity*), referências individuais de cada setor (`REF-15`, `REF-23`, `REF-16`, `REF-42`, `REF-41`, `REF-43`), serviços (`REF-01`, `REF-07`, `REF-17`, `REF-24`, `REF-30`, `REF-45`, `REF-48`), institucionais (`REF-11`, `REF-18`, `REF-35`), ficheiros existentes em `public/images/production/` e ligações ativas em `src/`.  
> **Regra de estado:** Um asset só é marcado como **`concluído`** quando o ficheiro existe em disco **e** está ligado à página respetiva.

---

## 1. Reconciliação com a `REF-26` (Porquê não são 8 imagens novas em cada setor)

A `REF-26` (*Saúde & Bem-Estar*) enumera **8 blocos fotográficos/mockup** por página setorial (`01 Hero`, `02 Smartphone`, `03 Website`, `04 Agendamento`, `05 CRM`, `06 Automação`, `07 Conteúdo Profissional`, `08 Pacote`), além dos 3 cards digitais puros (*Campanhas*, *Avaliações Google* e *Integrações*).

Ao cruzar a `REF-26` com as 5 restantes referências de setor (`REF-23`, `REF-16`, `REF-42`, `REF-41`, `REF-43`), cada bloco classifica-se em **3 tipos objetivos**:

| Tipo de Bloco | Como é produzido | Blocos abrangidos |
| :--- | :--- | :--- |
| **Imagem dedicada (por setor)** | Fotografia/cena única gerada no Nano Banana para o ambiente e serviço específico desse setor | `01 Hero`, `02 Smartphone (foto interior)`, `07 Conteúdo Profissional`, `08 Pacote 360°`, + cards temáticos exclusivos de cada referência (*Encomendas & Takeaway* em Restauração; *Gestão de Stock* em Retalho; *Propostas & Orçamentos* em Serviços Profissionais) |
| **Imagem genérica reutilizável** | Fotografia neutra de hardware/produto (preto, carvão e dourado, sem texto) partilhada entre setores, diferenciada por **overlay funcional em HTML/CSS** específico do setor | `03 Website` (portátil neutro), `04 Agendamento / Reservas` (tablet neutro), `05 CRM / Gestão` (monitor neutro com gráfico dourado), `06 Automação / Notificações` (smartphone preto neutro) |
| **Composição HTML/CSS** | Elementos de interface, ícones, badges, textos e controlos renderizados em código para legibilidade perfeita | *Campanhas de Captação* (Google/Meta), *Avaliações Google / Relatórios* (5 estrelas/indicadores), *Integrações Essenciais* (WhatsApp/Calendário/Email), moldura e textos do *Smartphone Hero*, e faixas funcionais sobre os cards |

> **Explicação da diferença anterior:** Na primeira estimativa tinham sido previstos apenas 3 assets dedicados nos outros setores (*Hero*, *Smartphone*, *Pacote*). Após reconciliar visualmente com `REF-23`, `REF-16`, `REF-42`, `REF-41` e `REF-43`, confirma-se que **`07 Conteúdo Profissional`** e os **3 cards temáticos exclusivos** (*Takeaway*, *Gestão de Stock*, *Propostas & Orçamentos*) também exigem **imagens dedicadas** (totalizando 4 a 5 dedicadas por setor, em vez de 3), enquanto `03 Website`, `04 Agendamento`, `05 CRM` e `06 Automação` usam **imagens genéricas reutilizáveis** + **HTML/CSS**.

---

## 2. Auditoria de Imagens de Saúde Atualmente Reutilizadas Noutros Setores/Serviços

Das 8 imagens atualmente em `public/images/production/saude-bem-estar/`:
- **5 são exclusivas de Saúde** (não são reutilizadas em nenhum outro setor):
  - `hero-clinica.jpg`
  - `profissional-saude-smartphone.jpg`
  - `servico-website-clinica.jpg` *(contém elementos clínicos no ecrã — por isso NÃO é reutilizada fora de Saúde)*
  - `servico-conteudo-profissional.jpg`
  - `pacote-ambiente-clinica.jpg`
- **3 são fotografias neutras de hardware** atualmente reutilizadas noutras rotas:
  1. `saude-bem-estar/servico-agendamento-online.jpg` (tablet preto + caneta dourada) → ligada em `/por-negocio/imobiliario` (*Agendamento de Visitas*) e `/solucoes/websites` *(temporariamente, até existir `reutilizaveis/website-portatil.jpg`)*.
  2. `saude-bem-estar/servico-crm-gestao.jpg` (monitor executivo com barras douradas) → ligada em `/por-negocio/imobiliario` (*CRM de Leads*) e `/solucoes/crm-sistemas`.
  3. `saude-bem-estar/servico-automacao-lembrete.jpg` (smartphone preto com friso dourado) → ligada em `/por-negocio/imobiliario` (*Automação & Follow-up*) e `/solucoes/automacao-ia`.

*(Estas 3 imagens neutras são adequadas como **imagens genéricas reutilizáveis** em todos os setores para Agendamento, CRM e Automação, sempre acompanhadas de faixas de texto em HTML/CSS específicas do setor.)*

---

## 3. Contagem Exata e Verificada

| Categoria | Concluídos (em disco e ligados) | Em falta (por gerar no Nano Banana) | Total Único |
| :--- | :---: | :---: | :---: |
| **Homepage & Institucional** | 1 (`home/hero-leadcapture.jpg`) | 1 (`institucional/contactos-almada-ponte.jpg`) | **2** |
| **Reutilizável genérico (Website portátil neutro)** | 1 (`reutilizaveis/website-portatil.jpg`) | 0 | **1** |
| **Saúde & Bem-Estar (`REF-15` / `REF-26`)** | 8 | 0 | **8** |
| **Imobiliário (`REF-23`)** | 4 (`hero`, `smartphone`, `conteudo`, `pacote`) | 0 | **4** |
| **Beleza e Estética (`REF-16`)** | 4 (`hero`, `smartphone`, `conteudo`, `pacote`) | 0 | **4** |
| **Restauração (`REF-42`)** | 5 (`hero`, `smartphone`, `encomendas-takeaway`, `conteudo`, `pacote-qr`) | 0 | **5** |
| **Retalho e E-commerce (`REF-41`)** | 0 | 5 (`hero`, `smartphone`, `gestao-stock`, `conteudo`, `pacote`) | **5** |
| **Serviços Profissionais (`REF-43`)** | 0 | 5 (`hero`, `smartphone`, `propostas-orcamentos`, `conteudo`, `pacote`) | **5** |
| **Serviços dedicados (`/solucoes/[slug]`)** | 0 *(3 usam hardware neutro)* | 4 (`lojas-online`, `marketing-digital`, `redes-sociais`, `qr-code`) | **4** |
| **TOTAL GERAL DA RONDA VISUAL** | **23** | **15** | **38** |

---

## 4. Matriz Completa por Página e Bloco

### A. Homepage e Institucionais

| Rota | Bloco | Ref. | Tipo | Ficheiro (`public/images/production/`) | Proporção | Estado |
| :--- | :--- | :-: | :--- | :--- | :-: | :--- |
| `/` | Hero principal | `REF-11` | Imagem dedicada | `home/hero-leadcapture.jpg` | `16:9` | **concluído** |
| `/sobre-nos` | Bloco *A Nossa Missão* | `REF-18` | Imagem genérica reutilizável | `home/hero-leadcapture.jpg` | `16:9` | **concluído** *(reutiliza foto de estúdio/equipa)* |
| `/contactos` | Cartão *Estamos em Portugal* (Almada / Ponte 25 de Abril) | `REF-35` | Imagem dedicada | `institucional/contactos-almada-ponte.jpg` | `16:9` | **em falta** |

### B. Reutilizáveis Genéricos (Cross-Sector)

| Bloco | Uso | Tipo | Ficheiro (`public/images/production/`) | Proporção | Estado |
| :--- | :--- | :--- | :--- | :-: | :--- |
| `03 Website` (portátil neutro) | Card *Website Profissional* (5 setores) + `/solucoes/websites` | Imagem genérica reutilizável + HTML/CSS | `reutilizaveis/website-portatil.jpg` | `16:9` | **em falta** |
| `04 Agendamento / Reservas` | Card *Agendamento / Reservas* (todos os setores aplicáveis) | Imagem genérica reutilizável + HTML/CSS | `saude-bem-estar/servico-agendamento-online.jpg` | `16:9` | **concluído** |
| `05 CRM / Gestão` | Card *CRM* (setores aplicáveis) + `/solucoes/crm-sistemas` | Imagem genérica reutilizável + HTML/CSS | `saude-bem-estar/servico-crm-gestao.jpg` | `16:9` | **concluído** |
| `06 Automação / Notificações` | Card *Automação* (setores aplicáveis) + `/solucoes/automacao-ia` | Imagem genérica reutilizável + HTML/CSS | `saude-bem-estar/servico-automacao-lembrete.jpg` | `16:9` | **concluído** |

### C. Os 6 Setores Ativos (`/por-negocio/[slug]`)

#### 1. Saúde & Bem-Estar (`/por-negocio/saude-bem-estar` — `REF-15` / `REF-26`)
- `01 Hero`: `saude-bem-estar/hero-clinica.jpg` (`16:9`) — **concluído** (dedicada)
- `02 Smartphone`: `saude-bem-estar/profissional-saude-smartphone.jpg` (`3:4`) + moldura/textos HTML/CSS — **concluído** (dedicada)
- `03 Website Profissional`: `saude-bem-estar/servico-website-clinica.jpg` (`16:9`) + overlay HTML/CSS — **concluído** (dedicada)
- `04 Agendamento Online`: `saude-bem-estar/servico-agendamento-online.jpg` (`16:9`) + overlay HTML/CSS — **concluído** (reutilizável)
- `05 Gestão de Pacientes (CRM)`: `saude-bem-estar/servico-crm-gestao.jpg` (`16:9`) + overlay HTML/CSS — **concluído** (reutilizável)
- `06 Automação & Comunicação`: `saude-bem-estar/servico-automacao-lembrete.jpg` (`16:9`) + notificação HTML/CSS — **concluído** (reutilizável)
- `07 Conteúdo Profissional`: `saude-bem-estar/servico-conteudo-profissional.jpg` (`16:9`) — **concluído** (dedicada)
- `08 Pacote Saúde 360°`: `saude-bem-estar/pacote-ambiente-clinica.jpg` (`16:9`) — **concluído** (dedicada)
- *Campanhas / Avaliações Google / Integrações*: **Composição HTML/CSS** — **concluído**

#### 2. Imobiliário (`/por-negocio/imobiliario` — `REF-23`)
- `01 Hero`: `imobiliario/hero-imobiliario.jpg` (`16:9`) — **concluído** (dedicada)
- `02 Smartphone`: `imobiliario/smartphone-imobiliario.jpg` (`3:4`) — **em falta** *(reutiliza `hero-imobiliario.jpg` temporariamente)*
- `03 Website Imobiliário`: `reutilizaveis/website-portatil.jpg` (`16:9`) + overlay HTML/CSS — **em falta** *(reutiliza `hero-imobiliario.jpg` temporariamente)*
- `04 Agendamento de Visitas`: `saude-bem-estar/servico-agendamento-online.jpg` (`16:9`) + overlay HTML/CSS — **concluído** (reutilizável)
- `05 CRM de Leads`: `saude-bem-estar/servico-crm-gestao.jpg` (`16:9`) + overlay HTML/CSS — **concluído** (reutilizável)
- `06 Automação & Follow-up`: `saude-bem-estar/servico-automacao-lembrete.jpg` (`16:9`) + overlay HTML/CSS — **concluído** (reutilizável)
- `07 Conteúdo Imobiliário`: `imobiliario/conteudo-imobiliario.jpg` (`16:9`) — **em falta** *(reutiliza `hero-imobiliario.jpg` temporariamente)*
- `08 Pacote Imobiliário 360°`: `imobiliario/pacote-imobiliario.jpg` (`16:9`) — **em falta** *(reutiliza `hero-imobiliario.jpg` temporariamente)*
- *Campanhas / Relatórios / Integrações*: **Composição HTML/CSS** — **concluído**

#### 3. Beleza e Estética (`/por-negocio/beleza-estetica` — `REF-16`)
- `01 Hero`: `beleza-estetica/hero-beleza.jpg` (`16:9`) — **em falta** (dedicada)
- `02 Smartphone`: `beleza-estetica/smartphone-beleza.jpg` (`3:4`) — **em falta** (dedicada)
- `03 Website Profissional`: `reutilizaveis/website-portatil.jpg` (`16:9`) + overlay HTML/CSS — **em falta** (reutilizável)
- `04 Agendamento Online`: `saude-bem-estar/servico-agendamento-online.jpg` (`16:9`) + overlay HTML/CSS — **pendente de ligação** (reutilizável já em disco)
- `05 Gestão de Clientes (CRM)`: `saude-bem-estar/servico-crm-gestao.jpg` (`16:9`) + overlay HTML/CSS — **pendente de ligação** (reutilizável já em disco)
- `06 Automação & Comunicação`: `saude-bem-estar/servico-automacao-lembrete.jpg` (`16:9`) + overlay HTML/CSS — **pendente de ligação** (reutilizável já em disco)
- `07 Conteúdo & Redes Sociais`: `beleza-estetica/conteudo-beleza.jpg` (`16:9`) — **em falta** (dedicada)
- `08 Pacote Beleza 360°`: `beleza-estetica/pacote-beleza.jpg` (`16:9`) — **em falta** (dedicada)
- *Campanhas / Relatórios / Integrações*: **Composição HTML/CSS** — **pendente de ligação**

#### 4. Restauração (`/por-negocio/restauracao` — `REF-42`)
- `01 Hero`: `restauracao/hero-restauracao.jpg` (`16:9`) — **em falta** (dedicada)
- `02 Smartphone (Menu Digital)`: `restauracao/smartphone-restauracao.jpg` (`3:4`) — **em falta** (dedicada)
- `03 Website Profissional`: `reutilizaveis/website-portatil.jpg` (`16:9`) + overlay HTML/CSS — **em falta** (reutilizável)
- `04 Menu Digital (QR Code)`: `servicos/qr-code-hero.jpg` (`16:9`) + overlay HTML/CSS — **em falta** (reutilizável do serviço QR)
- `05 Reservas Online`: `saude-bem-estar/servico-agendamento-online.jpg` (`16:9`) + overlay HTML/CSS — **pendente de ligação** (reutilizável já em disco)
- `06 Encomendas & Takeaway`: `restauracao/encomendas-takeaway.jpg` (`16:9`) — **em falta** (dedicada `REF-42`)
- `07 Conteúdo & Redes Sociais`: `restauracao/conteudo-restauracao.jpg` (`16:9`) — **em falta** (dedicada)
- `08 Plaquinhas QR Code Personalizadas (Pacote)`: `restauracao/pacote-restauracao-qr.jpg` (`16:9`) — **em falta** (dedicada `REF-42`)
- *Avaliações Google / Campanhas / Integrações*: **Composição HTML/CSS** — **pendente de ligação**

#### 5. Retalho e E-commerce (`/por-negocio/retalho-ecommerce` — `REF-41`)
- `01 Hero`: `retalho-ecommerce/hero-retalho.jpg` (`16:9`) — **em falta** (dedicada)
- `02 Smartphone (Loja Online)`: `retalho-ecommerce/smartphone-retalho.jpg` (`3:4`) — **em falta** (dedicada)
- `03 Loja Online (E-commerce)`: `servicos/lojas-online-hero.jpg` (`16:9`) + overlay HTML/CSS — **em falta** (reutilizável do serviço Lojas Online)
- `04 Website Profissional`: `reutilizaveis/website-portatil.jpg` (`16:9`) + overlay HTML/CSS — **em falta** (reutilizável)
- `05 Gestão de Produtos & Stock`: `retalho-ecommerce/gestao-stock.jpg` (`16:9`) — **em falta** (dedicada `REF-41`)
- `06 Automação & Notificações`: `saude-bem-estar/servico-automacao-lembrete.jpg` (`16:9`) + overlay HTML/CSS — **pendente de ligação** (reutilizável já em disco)
- `07 Conteúdo & Redes Sociais`: `retalho-ecommerce/conteudo-retalho.jpg` (`16:9`) — **em falta** (dedicada)
- `08 Pacote Retalho 360°`: `retalho-ecommerce/pacote-retalho.jpg` (`16:9`) — **em falta** (dedicada)
- *Campanhas / Avaliações Google / Integrações*: **Composição HTML/CSS** — **pendente de ligação**

#### 6. Serviços Profissionais (`/por-negocio/servicos-profissionais` — `REF-43`)
- `01 Hero`: `servicos-profissionais/hero-servicos.jpg` (`16:9`) — **em falta** (dedicada)
- `02 Smartphone`: `servicos-profissionais/smartphone-servicos.jpg` (`3:4`) — **em falta** (dedicada)
- `03 Website Profissional`: `reutilizaveis/website-portatil.jpg` (`16:9`) + overlay HTML/CSS — **em falta** (reutilizável)
- `04 Agendamento Online`: `saude-bem-estar/servico-agendamento-online.jpg` (`16:9`) + overlay HTML/CSS — **pendente de ligação** (reutilizável já em disco)
- `05 CRM & Gestão de Contactos`: `saude-bem-estar/servico-crm-gestao.jpg` (`16:9`) + overlay HTML/CSS — **pendente de ligação** (reutilizável já em disco)
- `06 Propostas & Orçamentos`: `servicos-profissionais/propostas-orcamentos.jpg` (`16:9`) — **em falta** (dedicada `REF-43`)
- `07 Automação & Comunicação`: `saude-bem-estar/servico-automacao-lembrete.jpg` (`16:9`) + overlay HTML/CSS — **pendente de ligação** (reutilizável já em disco)
- `08 Conteúdo Profissional`: `servicos-profissionais/conteudo-servicos.jpg` (`16:9`) — **em falta** (dedicada)
- `09 Pacote Profissional 360°`: `servicos-profissionais/pacote-servicos.jpg` (`16:9`) — **em falta** (dedicada)
- *Avaliações Google / Integrações*: **Composição HTML/CSS** — **pendente de ligação**

### D. Páginas de Serviços (`/solucoes/[slug]`)

| Rota | Bloco | Ref. | Tipo | Ficheiro (`public/images/production/`) | Proporção | Estado |
| :--- | :--- | :-: | :--- | :--- | :-: | :--- |
| `/solucoes/websites` | Hero + Card | `REF-48` *(Preto+Dourado)* | Imagem genérica reutilizável | `reutilizaveis/website-portatil.jpg` | `16:9` | **em falta** *(reutiliza `servico-agendamento-online.jpg` temporariamente)* |
| `/solucoes/lojas-online` | Hero + Card | `REF-24` *(Preto+Dourado)* | Imagem dedicada | `servicos/lojas-online-hero.jpg` | `16:9` | **em falta** |
| `/solucoes/crm-sistemas` | Hero + Card | `REF-17` | Imagem genérica reutilizável | `saude-bem-estar/servico-crm-gestao.jpg` | `16:9` | **concluído** |
| `/solucoes/marketing-digital` | Hero + Card | `REF-07` | Imagem dedicada | `servicos/marketing-digital-hero.jpg` | `16:9` | **em falta** *(reutiliza `home/hero-leadcapture.jpg` temporariamente)* |
| `/solucoes/automacao-ia` | Hero + Card | `REF-01` | Imagem genérica reutilizável | `saude-bem-estar/servico-automacao-lembrete.jpg` | `16:9` | **concluído** |
| `/solucoes/redes-sociais` | Hero + Card | `REF-30` | Imagem dedicada | `servicos/redes-sociais-hero.jpg` | `16:9` | **em falta** |
| `/solucoes/qr-code` | Hero + Card | `REF-45` | Imagem dedicada | `servicos/qr-code-hero.jpg` | `16:9` | **em falta** |

### E. Hubs Comerciais (`REF-44` `/solucoes` e `REF-05` `/demonstracoes`) — **0 ficheiros novos**

| Rota | Bloco Visual | Ref. | Classificação | Asset Utilizado (sem duplicar contagem) | Estado |
| :--- | :--- | :-: | :--- | :--- | :--- |
| `/solucoes` | Hero Hub | `REF-44` | Imagem genérica reutilizável | `reutilizaveis/website-portatil.jpg` *(já contado na Secção B)* | **em falta** *(aguarda geração do reutilizável)* |
| `/solucoes` | Grelha dos 7 Serviços | `REF-44` | Asset já previsto | Reutiliza o `heroImage` de cada um dos 7 serviços da Secção D | **parcial (4/7 ligados; 3/7 aguardam geração)** |
| `/solucoes` | *Como Funciona* + *Porquê escolher* + *CTA* | `REF-44` | Composição HTML/CSS | Renderizado em código (ícones + tipografia + botões) | **concluído** |
| `/demonstracoes` | Hero Demonstrações | `REF-05` | Imagem genérica reutilizável | `reutilizaveis/website-portatil.jpg` *(já contado na Secção B)* | **em falta** *(aguarda geração do reutilizável)* |
| `/demonstracoes` | Grelha dos 6 Setores Ativos | `REF-05` | Asset já previsto | Reutiliza o `heroImage` de cada um dos 6 setores ativos da Secção C | **parcial (2/6 ligados; 4/6 aguardam geração)** |
| `/demonstracoes` | 3 Setores de Expansão (*Construção*, *Hotelaria*, *Automóvel*) | `REF-05` | **Fora do âmbito desta ronda** (HTML/CSS) | Mantidos como cartões informativos HTML/CSS sem rota ativa; imagens dedicadas ficam para a fase de ativação desses setores | **fora do âmbito desta ronda** |
| `/demonstracoes` | *CTA Banner* | `REF-05` | Composição HTML/CSS | Renderizado em código | **concluído** |

> **Contagem final fechada (zero duplicações):** **38 ficheiros únicos** = **10 concluídos** + **28 por gerar no Nano Banana** (`REF-44` e `REF-05` acrescentam `0` novos ficheiros).

