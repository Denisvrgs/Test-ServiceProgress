context('TEAM TESTS', () => {
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


 it('Visit Teams', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.contains('Configuration').click()
    cy.contains('Teams').click()
 })

 it('Create Team', () => {
   //cy.setCookie('ORA_WWV_APP_108', app_cookie)
   cy.get('#B29397955162203337').click()

   cy.get('iframe')
    .wait(1000)
    .then($iframe => {
      const iframe = $iframe.contents()
      const myInput0 = iframe.find('#P27_NAME')
      const myButton = iframe.find('#B29400064075203339')

      cy
        .wrap(myInput0)
        .type('Team1')
        .should('have.value', 'Team1')

      cy.wrap(myButton).click()
    })

    cy.get('.t-Alert-title')  //simply check the modal has been closed
  })


  it('Active/inactive Template', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.get('.apex-item-grid-row > :nth-child(1) > label').click()       //Push Active
    cy.get(':nth-child(2) > [headers="LINK"] > a > .fa').click()       //Edit element

    cy.get('iframe')
     .wait(1000)
     .then($iframe => {
       const iframe = $iframe.contents()
       const myButton = iframe.find('#B29400253563203339')

       cy.wrap(myButton).click()                                       //Desactivate
     })

    cy.get('.t-Alert-title')  //simply check the modal has been closed

    cy.get(':nth-child(2) > label').click()                            //Push Inactive

    cy.url().should('contain', ':26:')
            .then(($url) => {
               loggedInPage = $url
               loggedInPage = loggedInPage.replace('/__/','/ords/')
               cy.visit(loggedInPage)
           })

    cy.get(':nth-child(2) > [headers="LINK"] > a > .fa').click()        //Edit element

    cy.get('iframe')
     .wait(1000)
     .then($iframe => {
       const iframe = $iframe.contents()
       const myButton = iframe.find('#B34895487148025527')

       cy.wrap(myButton).click()                                       //Activate
     })

     cy.get('.t-Alert-title')  //simply check the modal has been closed

     cy.get('.apex-item-grid-row > :nth-child(1) > label').click()      //Push Enabled

     cy.url().should('contain', ':26:')
             .then(($url) => {
                loggedInPage = $url
                loggedInPage = loggedInPage.replace('/__/','/ords/')
                cy.visit(loggedInPage)
            })
  })
})
