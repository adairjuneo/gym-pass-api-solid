# GymPass Api 🏋️💪 - Software Design

GymPass api with SOLID principles.

## RFs (Requisitos Funcionais)

Oque o usuário pode ou não fazer na aplicação ou funcionalidades da aplicação. Esses requisitos podem
ser facilmente definidos quando ocorre a conversa com o cliente ou equipe que idealiza o produto caso
software nasça dentro de uma empresa. **Deve ser possível...**

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-ins em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

Caminhos que cada requisito funcional pode seguir, determinando sobre quais condições aquele
requisito funcional pode ou não ser executado. **O usuário não pode/deve...** ou **A "entidade" não pode/deve...**

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-ins se não estiver perto(100m) da academia;
- [ ] O check-in só pode ser validado até 20minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] Academias só podem ser cadastradas por administradores;

## RNFs (Requisitos não-funcionais)

São "regras" mais técnicas do que a nível de funcionalidades, determinando mais patters e métodos
para serem aplicados no desenvolvimento.

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT(JSON Web Token);

_This repository is part of my practical studies about software engineering and development._
[dev-juneo](https://github.com/adairjuneoaf)
