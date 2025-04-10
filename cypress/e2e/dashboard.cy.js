describe('Usuário logado na página de dashboard', () => {
    beforeEach(() => {
        cy.fixture('especialistas.json').as('especialistas')
        cy.login(Cypress.env('email'), Cypress.env('senha'))
    })
    context('Redirecionamento na página de dashboard', ()=> {
        it('Verifica página de redirecionamento no login com sucesso', () => {
            cy.visit('/dashboard')
            cy.url().should('eq', 'http://localhost:3000/dashboard')
        })
        it('Com o usuário logado, cadastra um especialista', {browser:'edge'}, () => {
            cy.visit('/dashboard')
            cy.url().should('eq', 'http://localhost:3000/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
        })
    context('Modal de cadastro de especialista', () => {
        // it('Verifica se o checkbox "atende por plano?" está desmarcado', () => {
        //     cy.visit('/dashboard')
        //     cy.contains('Cadastrar especialista').should('be.visible').click()
        //     cy.get('[type="checkbox"]').should('have.attr', 'ariel-label', 'Atende pelo plano?').and('not.be.checked')
        // })
        it('Selecioa o botão checkbox "atende por plano?" para visualizar os planos de saúde', () => {
            cy.contains('Cadastrar especialista').should('be.visible').click()
            cy.get('[type="checkbox"]').check()
            cy.get('form').find('input[type="checkbox"]').should('be.checked').and('not.be.disabled')
        })
        it.only('Selecioa o botão checkbox "atende por plano?" após o preenchimento do formulário para visualizar o planos de saúde', () => {
            cy.visit('/dashboard')
            cy.get('@especialistas').then((dados) => {
                const especialista = dados.especialistas[0];
                cy.cadastraEspecialista(
                    especialista.nome,
                    especialista.email,
                    especialista.senha,
                    especialista.especialidade,
                    especialista.crm,
                    especialista.imagem,
                    especialista.cep,
                    especialista.rua,
                    especialista.numero,
                    especialista.complemento,
                    especialista.estado
                )
                cy.get('[type="checkbox"]').check()
                cy.get('[type="checkbox"]').last().scrollIntoView({ easing: 'linear' })
        
                cy.get('.MuiFormGroup-root').each(($checkbox) => {
                    cy.wrap($checkbox).should('be.visible')
                })
            })
        })
    })
    })
    })
// })
 