# Gestão de Pacientes e Exames Médicos

## Descrição Geral

O projeto **Gestão de Pacientes e Exames Médicos** foi desenvolvido utilizando **Angular 17** com **TypeScript**, com o objetivo de permitir o cadastro, listagem e gerenciamento de pacientes e seus respectivos exames. O sistema busca oferecer uma interface simples e funcional, voltada à organização de informações clínicas, com regras de negócio que garantem integridade e consistência dos dados.

## Tecnologias Utilizadas

- **Angular 17** – Framework principal para desenvolvimento do frontend
- **TypeScript** – Linguagem utilizada para garantir tipagem e maior confiabilidade no código
- **HTML5 e SCSS** – Estrutura e estilização avançada das interfaces
- **Bootstrap** – Auxílio na responsividade e layout
- **RxJS** – Programação reativa para gestão de estados
- **Angular Router** - Sistema de navegação entre páginas -**Angular Forms** - Formulários reativos com validações
- **Node.js e Express** – Utilizados no backend para fornecer os endpoints consumidos pela aplicação

## Como Executar o Projeto

Para executar o projeto localmente:

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Execute `ng serve` e acesse `http://localhost:4200` no navegador

A versão hospedada também está disponível através do GitHub Pages, o que permite testar a interface sem necessidade de instalação local.

Acesse o sistema através do [site](https://juliardiniz.github.io/gestao-pacientes-exames-frontend/)

## Estrutura do Projeto e Componentes

### Módulo de Pacientes

- **Cadastro de Pacientes**: Formulário reativo para incluir novos pacientes informando nome, documento e data de nascimento
- **Listagem de Pacientes**: Tabela responsiva com todos os pacientes cadastrados, incluindo paginação
- **Detalhes do Paciente**: Visualização completa dos dados cadastrais do paciente
- **Edição de Pacientes**: Funcionalidade para atualizar dados do paciente através do formulário de cadastro
- **Exclusão de Pacientes**: Remoção de pacientes do sistema
- **Validações**: Impede cadastro de documentos duplicados e valida campos obrigatórios

### Módulo de Exames

- **Cadastro de Exames**: Formulário para registrar exames médicos vinculados a pacientes existentes
- **Listagem de Exames**: Visualização completa de exames cadastrados com informações do paciente relacionado
- **Detalhes do Exame**: Visualização das informações completas do exame
- **Exclusão de Exames**: Remoção de exames do sistema
- **Modalidades DICOM**: Suporte às modalidades médicas padrão (CR, CT, DX, MG, MR, NM, OT, CP, ES, EEG, BMD, US, XA)

## Fluxo de Navegação

### Para Pacientes:

1. **Lista de Pacientes** → Visualiza todos os pacientes cadastrados em uma tabela com paginação, incluindo opções para criar novo paciente, editar ou visualizar exames
2. **Detalhes do Paciente** → Ao clicar no botão Exames, o sistema mostra os detalhes completos do paciente e a lista de exames vinculados. É possível adicionar novos exames, visualizar os detalhes de cada exame ou excluir exames existentes.
3. **Editar Paciente** → Botão que redireciona para o formulário de cadastro em modo edição com adição dos botões Excluir e Salvar
4. **Formulário de Paciente** → Usado tanto para criar um novo paciente quanto para editar um existente.

### Para Exames:

1. **Lista de Exames** → Exibe todos os exames cadastrados em uma tabela com paginação, incluindo opções para criar novo exame e visualizar detalhes de exames existentes
2. **Detalhes do Exame** → Mostra todas as informações do exame selecionado, com opções para voltar à lista de pacientes ou excluir o exame.
3. **Exclusão** → Permite remover exames diretamente

## Integração com o Backend

A comunicação entre o frontend e o backend é feita por meio de requisições HTTP, consumindo endpoints RESTful. O tratamento de respostas e erros é centralizado nos serviços Angular, garantindo uma interação consistente e previsível entre as telas.

## Estrutura Geral

O projeto segue a arquitetura modular do Angular com componentes standalone, organizados em pastas por funcionalidade. A estilização com **SCSS** permite maior flexibilidade e manutenibilidade do código CSS.

## Regras de Negócio Implementadas

- **Documento único** – Não é permitido cadastrar dois pacientes com o mesmo documento
- **Documento imutável** – Após o cadastro, o CPF/documento não pode ser alterado, apenas nome e data de nascimento podem ser editados.
- **Campos obrigatórios** – Todos os dados essenciais são validados no frontend e backend
- **Vínculo obrigatório** – Todo exame deve estar obrigatoriamente associado a um paciente existente.
- **Restrição de exclusão** – Pacientes com exames vinculados não podem ser excluídos até que os exames sejam removidos.

## Funcionalidades Implementadas com Sucesso

- Cadastro, listagem, edição e exclusão de pacientes
- Cadastro, listagem e exclusão de exames
- Interface responsiva com Angular 17 e SCSS
- Integração completa com API REST
- Validações de dados e feedback visual ao usuário
- Paginação nas listagens
- Estados de loading durante operações
- Visualização de detalhes para pacientes e exames

### Próximas Evoluções

- Implementação de testes automatizados
- Controle de idempotência para evitar duplicidade
- Edição de exames (atualmente apenas visualização e exclusão)
- Melhor tratamento de cenários de erro específicos

## Evolução e Próximos Passos

Durante o desenvolvimento, foi possível consolidar conhecimentos sobre **componentização com Angular 17**, **formulários reativos**, **serviços** e **integração com API**. Destaque para a implementação de um formulário reutilizável para criação e edição de pacientes. Como próximos passos, estão previstos:

- Implementação de testes automatizados
- Expansão da funcionalidade de edição para exames
- Aperfeiçoamento visual utilizando os recursos do SCSS
- Melhor tratamento de estados de loading e erro
