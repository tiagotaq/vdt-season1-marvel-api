describe('DELETE /characters/id', function(){

    const character = {
        name: 'Jhonny Storm',
        alias: 'Tocha Humana',
        team: ['Quarteto Fantástico'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function(){

        before(function(){
            //cy.setToken()
            //cy.back2ThePast()
            cy.postCharacter(character)
                .then(function(response){
                    Cypress.env('characterId', response.body.character_id)
                })
        })

        it('deve deletar o personagem pelo ID', function(){
            cy.deleteCharacterByID(Cypress.env('characterId'))
                .then(function(response){
                    expect(response.status).to.eql(204)
                })
        })

        after(function(){
            cy.deleteCharacterByID(Cypress.env('characterId'))
                .then(function(response){
                    expect(response.status).to.eql(404)
                })    
        })

        it('deve retornar 404 ao tentar deletar personagem por ID inexistente', function(){
            const idInexistente = '62b78425014c3819e30f7940';
            cy.deleteCharacterByID(idInexistente)
                .then(function(response){
                    expect(response.status).to.eql(404)
                })
        })
    })

})