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
   cy.contains('Employees').click()
   //id of create button
   cy.get("#B29266024830203163").click()

   //INSERCION

   cy.get('iframe')
      .wait(2000)
      .then($iframe => {
        const iframe = $iframe.contents()
        const name = iframe.find('#P11_NAME')
        const lastname = iframe.find('#P11_LASTNAME')
        const role = iframe.find('#P11_ROLE')
        const username = iframe.find('#P11_USERNAME')
        const password = iframe.find('#P11_PASSWORD')
        const myButton = iframe.find('#B29268193902203166')

        cy
          .wrap(name)
          .type("Name")
          .should('have.value', 'Name')
        cy
          .wrap(lastname)
          .type("lastname")
          .should('have.value', 'lastname')

        cy
          .wrap(role)
          .select('Employee')
          .should('have.value', '3')

          cy
            .wrap(username)
            .type("USERNAME")
            .should('have.value', 'USERNAME')

          cy
            .wrap(password)
            .type("1234")
            .should('have.value', '1234')


        cy.wrap(myButton).click()
      })







 })





})
