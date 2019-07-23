context('ORDER LINES PROGRESS TESTS', () => {
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


 it('Visit Order Lines Progress', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.contains('Configuration').click()
    cy.contains('Order Lines Progress').click()
 })

 it('Create Order Line Progress', () => {
   //cy.setCookie('ORA_WWV_APP_108', app_cookie)

   cy.get('#B29299471477203209').click()

   cy.get('iframe')
    .wait(1000)
    .then($iframe => {
      const iframe = $iframe.contents()
      const myInput0 = iframe.find('#P15_ORDER')
      const myInput1 = iframe.find('#P15_PURCHASEORDERLINE')
      const myInput2 = iframe.find('#P15_QUANTITY')
      const myButton = iframe.find('#B29301517334203211')

      cy
        .wrap(myInput0)
        .select('6')
        .should('have.value', '6')

      cy
        .wrap(myInput1)
        .select('64')
        .should('have.value', '64')

      cy
        .wrap(myInput2)
        .type('0.1')
        .should('have.value', '0.1')


      cy.wrap(myButton).click()

     })

   })

})
