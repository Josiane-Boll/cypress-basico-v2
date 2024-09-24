/// <reference types="cypress" />
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    //Teste 01
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })    

    //Teste 02
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Josi')
        cy.get('#lastName').type('Boll')
        cy.get('#email').type('josiboll@exemplo.com')
        cy.get('#open-text-area').type(''+ longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

    })

    //Teste 03
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválido', function() {
        cy.get('#firstName').type('Josi')
        cy.get('#lastName').type('Boll')
        cy.get('#email').type('josiboll@exemplo,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    }) 

    //Teste 04
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '') 
    })

    //Teste 05
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Josi')
        cy.get('#lastName').type('Boll')
        cy.get('#email').type('josiboll@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    //Teste 06
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Josi')
            .should('have.value', 'Josi')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Boll')
            .should('have.value', 'Boll')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('josiboll@exemplo.com')
            .should('have.value', 'josiboll@exemplo.com')
            .clear()
            .should('have.value', '') 
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })

    //Teste 07
    it('mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })


     //Teste 08
     it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
     })

     //Teste 09
     it('seleciona um produto (Youtube) por seu texto', function() {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')   
     })

     //Teste 10
     it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('Mentoria')
          .should('have.value', 'mentoria')   
       })

       //Teste 11
       it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')   
       })

       //Teste 12
       it('marca um tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
       })

       //Teste 13
       it('marca tipo de atendimento', function() {
           cy.get('input[type="radio"]')
           .should('have.length', 3)
           .each(function($radio) {
               cy.wrap($radio).check()
               cy.wrap($radio).should('be.checked')
           })
       })

       //Teste 14
       it('marca ambos checkboxes, depois demarcar o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    //Teste 15

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Josi')
        cy.get('#lastName').type('Boll')
        cy.get('#email').type('josiboll@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    //Teste 16
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.eq('example.json')
        })
    })

    //Teste 17
    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.eq('example.json')
        })
    })

    //Teste 18
    it('seleciona um arquivo da pasta fixtures utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('samplefile')
        cy.get('input[type="file"]')
            .selectFile('@samplefile')
            .should(function($input) {
                expect($input[0].files[0].name).to.eq('example.json')   
            })
        })

    //Teste 19
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target')
    })    

    //Teste 20
    it('acessa a página de política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing').should('be.visible')    
    })

    //Teste 21
    it('testa a página da política de privacidadade de forma independente', function() {
        cy.visit('./src/privacy.html')
        
        cy.contains('Talking About Testing').should('be.visible')      
    })  

})
