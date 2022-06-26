describe('POST /characters', function () {

    // before(function () {
    //     cy.setToken()
    //     cy.back2ThePast()
    // })

    it('Deve cadastrar um personagem', function () {
        {
            const character = {
                name: 'Steve Rogers',
                alias: 'Capitão America',
                team: ['vingadores'],
                active: true
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body.character_id.length).to.eql(24)
                })
        }
    })

    context('quando o personagem já existe', function () {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: ['vingadores da costa oeste', 'irmandade dos mutantes'],
            active: true
        }

        before(function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                })
        })

        it('não deve cadastrar duplicado', function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                })
        })

    })

    context('quando tento cadastrar um personagem com alguma informação faltante', function () {

        const characterIncomplete = [
            {
                age: 40,
                alias: 'Doutor Estranho',
                team: ['illuminati'],
                active: true
            },
            {
                age: 40,
                name: 'Stephen Strange',
                team: ['illuminati'],
                active: true
            },
            {
                age: 40,
                name: 'Stephen Strange',
                alias: 'Doutor Estranho',
                active: true
            },
            {
                age: 40,
                name: 'Stephen Strange',
                alias: 'Doutor Estranho',
                team: ['illuminati']
            },
            {
                name: 'Stephen Strange',
                alias: 'Doutor Estranho',
                team: ['illuminati'],
                active: true
            }

        ]

        it('não deve permitir cadastrar personagem sem name', function () {
               cy.postCharacter(characterIncomplete[0])
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"name\" is required')
                })
        })

        it('não deve permitir cadastrar um personagem sem alias', function () {
            cy.postCharacter(characterIncomplete[1])
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"alias\" is required')
                })
        })

        it('não deve permitir cadastrar um personagem sem team', function () {
            cy.postCharacter(characterIncomplete[2])
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"team\" is required')
                })
        })

        it('não deve permitir cadastrar um personagem sem active', function () {
            cy.postCharacter(characterIncomplete[3])
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"active\" is required')
                })
        })

        it('deve permitir cadastrar um personagem sem age', function () {
            cy.postCharacter(characterIncomplete[4])
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body.character_id.length).to.eql(24)
                })
        })
    })
})
