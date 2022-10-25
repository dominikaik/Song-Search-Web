/// <reference types="cypress" />

describe('Spotify explorer, list test', () => {
  beforeEach(() => {
    // Visit page before each test
    cy.visit('http://localhost:3000/')
  })

  it('Song list displays 10 table elements', () => {
    // Get all songs in table
    cy.get('.MuiTableBody-root').find('tr').should('have.length', 10)

    // The first song with the default sorting should have the name Como Llora
    cy.get('.MuiTableBody-root td').first().should('have.text', 'Como Llora')
  })

  it('Can filter on danceability', () => {

    cy.get('#select-search-filter').click() 
    cy.get('li').each(($elem) => {
    if ($elem.text() == "Danceability") {
        cy.wrap($elem).click()
      }
    })
    // The first song with the default sorting should have the name Como Llora
    cy.get('.MuiTableBody-root td').first().should('have.text', 'Funky Cold Medina')
  })

  it('Search for songs by Kygo', () => {
    const search = 'Kygo'
    cy.get('#search-text-field').type(`${search}`)
    cy.get('.MuiButtonBase-root').contains('Search').click()
    // The second song with the default sorting should have the name Not Ok
    cy.get('.MuiTableBody-root td').eq(4).should('have.text', 'Not Ok')
    // The next table/td cell is the song year
    cy.get('.MuiTableBody-root td').eq(5).should('have.text', '2019')
  })

  it('Page 2 contains 10 new elements', () => {
    cy.get(`[aria-label="Go to page 2"]`).click()

    cy.get('.MuiTableBody-root').find('tr').should('have.length', 10)
    // The first song with the default sorting should now have the name 327
    cy.get('.MuiTableBody-root td').first().should('have.text', '327')
    cy.get('.MuiTableBody-root td').first().should('not.have.text', 'Funky Cold Medina')
  })
 })
