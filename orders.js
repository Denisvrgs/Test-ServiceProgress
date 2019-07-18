context('CUSTOMER TESTS', () => {
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


 it('Visit Orders', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.contains('Configuration').click()
    cy.contains('Orders').click()
 })

 it('Create Order', () => {
   //cy.setCookie('ORA_WWV_APP_108', app_cookie)
   const Order = Math.random().toString(36).substring(2, 8)

   cy.get('#B29350502084203275').click()

   cy.get('iframe')
    .wait(1000)
    .then($iframe => {
      const iframe = $iframe.contents()
      const myInput0 = iframe.find('#P21_PROJECT')
      const myInput1 = iframe.find('#P21_CONTACT')
      const myInput2 = iframe.find('#P21_ORDERNUMBER')
      const myInput3 = iframe.find('#P21_DESCRIPTION')
      const myInput4 = iframe.find('#P21_STARTDATE')
      const myInput5 = iframe.find('#P21_DELIVERYDATE')
      const myButton = iframe.find('#B29352685797203277')

      cy
        .wrap(myInput0)
        .select('20')
        .should('have.value', '20')

      cy
        .wrap(myInput1)
        .select('3')
        .should('have.value', '3')

      cy
        .wrap(myInput2)
        .type(Order)
        .should('have.value', Order)

      cy
        .wrap(myInput3)
        .type('This is a test', { force: true })
        .should('have.value', 'This is a test')

      cy
        .wrap(myInput4)
        .type('01-Jul-19')
        .should('have.value', '01-Jul-19')

      cy
        .wrap(myInput5)
        .type('30-Sep-19')
        .should('have.value', '30-Sep-19')

      cy.wrap(myButton).click()

     })

   })

})
