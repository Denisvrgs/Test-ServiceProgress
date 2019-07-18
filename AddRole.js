context('Method 1: Unit testing APEX', () => {
 const loginPage  = 'https://dev4.novoshore.com/ords/f?p=108:LOGIN_DESKTOP:7368708962492:::::'
 const pUsername   = 'JORGE'
 const pPassword   = '1234'
 var   loggedInPage
 var   app_cookie
 var app_cookie_rem
 var id

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
   cy.contains('Configuration').click()
      //My projects & Project Stats//
   cy.contains('Roles').click()
   //id of create button
   cy.get("#B29250334980203142").click()

   //INSERCION

   cy.get('iframe')
      .wait(2000)
      .then($iframe => {
        const iframe = $iframe.contents()
        const name = iframe.find('#P9_NAME')
        const admin = iframe.find('#P9_ISADMIN')
        const manager = iframe.find('#P9_ISMANAGER')
        const myButton = iframe.find('#B29252400802203144')

        cy
          .wrap(name)
          .type("Role")
          .should('have.value', 'Role')


        cy
          .wrap(admin)
          .select('Yes')
          .should('have.value', 'Y')

        cy
          .wrap(manager)
          .select('No')
          .should('have.value', 'N')








        cy.wrap(myButton).click()
      })







 })





})
