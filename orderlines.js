context('ORDER LINE TESTS', () => {
 const loginPage  = 'https://dev4.novoshore.com/ords/f?p=108:LOGIN_DESKTOP:9070950415987:::::'
 const pUsername   = 'DENIS'
 const pPassword   = '1234'
 var   loggedInPage
 var   app_cookie

//LOGIN AND COOKIE SETTING

before(function() {
   cy.server()
   cy.route('POST', 'ords/wwv_flow.accept').as('login')
   cy.visit(loginPage)
   cy.clearCookie('LOGIN_USERNAME_COOKIE')
   cy.get('#P9999_USERNAME')
       .clear()
       .should('be.empty')
       .type(pUsername)
       .should('have.value',pUsername)
   cy.get('#P9999_PASSWORD')
       .should('be.empty')
       .type(pPassword)
       .should('have.value',pPassword)
   cy.contains('Sign In').click()
   cy.wait(['@login'])
   cy.url().should('contain', ':1:')
           .then(($url) => {
              loggedInPage = $url
              loggedInPage = loggedInPage.replace('/__/','/ords/')
              cy.visit(loggedInPage)
          })
   cy.getCookie('ORA_WWV_APP_108').then(($Cookie) => {
           app_cookie = $Cookie.value
       })
 })

 beforeEach(function () {
     Cypress.Cookies.preserveOnce('ORA_WWV_APP_108')
 })


 it('Visit Order Lines', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.contains('Configuration').click()
    cy.contains('Order Lines').click()
 })

 it('Create Order Line', () => {
   //cy.setCookie('ORA_WWV_APP_108', app_cookie)

   cy.get('#B29313990720203225').click()

   cy.get('iframe')
    .wait(1000)
    .then($iframe => {
      const iframe = $iframe.contents()
      const myInput0 = iframe.find('#P17_ORDERNO')
      const myInput1 = iframe.find('#P17_TEMPLATE')
      const myInput2 = iframe.find('#P17_QUANTITY')
      const myInput3 = iframe.find('#P17_UNITPRICE')
      const myButton = iframe.find('#B29316074552203227')

      cy
        .wrap(myInput0)
        .select('67')
        .should('have.value', '67')

      cy
        .wrap(myInput1)
        .select('1')
        .should('have.value', '1')

      cy
        .wrap(myInput2)
        .type('100')
        .should('have.value', '100')

      cy
        .wrap(myInput3)
        .type('1000')
        .should('have.value', '1000')


      cy.wrap(myButton).click()

     })

   })

})
