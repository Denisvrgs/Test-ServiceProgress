context('Method 1: Unit testing APEX', () => {
 const loginPage  = 'https://dev4.novoshore.com/ords/f?p=108:LOGIN_DESKTOP:7368708962492:::::'
 const pUsername   = 'JORGE'
 const pPassword   = '1234'
 var   loggedInPage
 var   app_cookie
 var app_cookie_rem

before(function() {
   cy.server()
   cy.route('POST', 'ords/wwv_flow.accept').as('login')
   cy.visit(loginPage)
   cy.clearCookie('LOGIN_USERNAME_COOKIE')

   cy.get('#P9999_USERNAME')
       .type(pUsername)
       .should('have.value',pUsername)

   cy.get('#P9999_PASSWORD')
       .type(pPassword)
       .should('have.value',pPassword)

   cy.get('#B29188865120202919').click()
   cy.wait(['@login'])
   cy.url().should('contain', '/__/')
           .then(($url) => {
              loggedInPage = $url
              loggedInPage = loggedInPage.replace('/__/','/ords/')
              cy.visit(loggedInPage)
          })
    /* cy.getCookie('ORA_WWV_APP_108').then(($Cookie) => {
           app_cookie = $Cookie.value

       }) */


 })






 it('Visit App', () => {
   ///REPORTS PAGE//
   cy.contains('Reports').click()
      //My projects & Project Stats//
   cy.contains('My projects & Projects stats').click()
   cy.contains('Reports').click()

       //My effort per month//
    cy.contains('My effort per month').click()
    const searchMonth = '01-JUL-19'
    cy.get('#P35_MONTH').select(searchMonth)
    cy.contains('Reports').click()


      //My effort per project & time period//
    cy.contains('My effort per project & time period').click()
    const searchProject36 = '110 kV-Ltg. Grohnde-Stumpenhagen'
    const startDate36 = '01-MAR-19'
    const endDate36 = '01-SEP-19'
    cy.get('#P36_PROJECT')
    //  .clear()
      .select(searchProject36)
      .should('have.value', '15')

    cy.get('#P36_INDATE')
      .clear()
      .type(startDate36)
      .should('have.value', '01-MAR-19')

    cy.get('#P36_ENDATE')
      .clear()
      .type(endDate36)
      .should('have.value', '01-SEP-19')

    cy.contains('Reports').click()

      //Projects list//
    cy.contains('Projects list').click()
    cy.contains('Reports').click()


      //Order Lines & Order Line statuses//
    cy.contains('Order Lines & Order Line statuses').click()
    cy.contains('Reports').click()

              //

    //Projects & Staff//
 cy.contains('Projects & Staff').click()
 cy.contains('Reports').click()

     //Staff effort per month//
  cy.contains('Staff effort per month').click()
  cy.get('#P40_MONTH')
    .select('May      , 2019')
    .should('have.value', '01-MAY-19' )

  cy.contains('Reports').click()

    //Staff effort per project & time period//
  cy.contains('Staff effort per project & time period').click()
  const searchProject41 = 'RAMALIKIAN - Nuevo Disco: ROYAL GARAGE'
  const startDate41 = '01-MAR-19'
  const endDate41 = '01-SEP-19'
  cy.get('#P41_PROJECT')
  //  .clear()
    .select(searchProject41)
    .should('have.value', '48')

  cy.get('#P41_INDATE')
    .clear()
    .type(startDate41)
    .should('have.value', '01-MAR-19')

  cy.get('#P41_ENDATE')
    .clear()
    .type(endDate41)
    .should('have.value', '01-SEP-19')

  cy.contains('Reports').click()

    //Month invoice//
  cy.contains('Month invoice').click()
  cy.get('#P45_MONTH')
    .select('May      , 2019')
    .should('have.value', '01-MAY-19' )

  cy.contains('Reports').click()

    //Full invoice//
  cy.contains('Full Invoice').click()
  const searchProject53 = '67-110 kV-Ltg. Grohnde-Stumpenhagen'
  const searchOrder53 = '114-4500923097'

  cy.get('#P53_PROJECT')
    .select(searchProject53)
    .should('have.value', '15' )

  cy.get('#P53_ORDER')
    .select(searchOrder53)
    .should('have.value', '6' )


  cy.contains('Reports').click()





 })





})
