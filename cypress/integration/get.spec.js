describe('GET /characters', function () {

    const characters = [
        {
            name: 'Bruce Banner',
            alias: 'Hulk',
            team: ['vingadores'],
            active: true
        },
        {
            name: 'Tony Stark',
            alias: 'Homem de Ferro',
            team: ['vingadores, illuminati'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['novos vingadores'],
            active: true
        }
    ]

    before(function () {
        //cy.setToken()
        //cy.back2ThePast()
        cy.populateCharacters(characters)
    })

    it('Deve obter a lista de personagens cadastrados', function () {
        cy.getCharacters()
            .then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body).to.be.a('array')
                expect(response.body.length).greaterThan(0)
            })
    })

    it('Deve obter um personagem pelo nome', function(){
        cy.searchCharactersByName('Peter Parker')
            .then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.length).to.eql(1)
                expect(response.body[0].alias).to.eql('Homem Aranha')
                expect(response.body[0].team).to.eql(['novos vingadores'])
                expect(response.body[0].active).to.eql(true)
            })
    })

})

describe('GET /characters/id', function(){

    const character = {
        name: 'Logan',
        alias: 'Wolverine',
        team: ['x-men'],
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

        it('deve consultar o personagem pelo ID', function(){
            cy.searchCharacterByID(Cypress.env('characterId'))
                .then(function(response){
                    expect(response.status).to.eql(200)
                    expect(response.body.name).to.eql('Logan')
                    expect(response.body.alias).to.eql('Wolverine')
                    expect(response.body.team).to.eql(['x-men'])
                    expect(response.body.active).to.eql(true)
                })
        })

        it('deve retornar 404 ao buscar por ID inexistente', function(){
            const idInexistente = '62b78425014c3819e30f7940';
            cy.searchCharacterByID(idInexistente)
                .then(function(response){
                    expect(response.status).to.eql(404)
                })
        })
    })

})