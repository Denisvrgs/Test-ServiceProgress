context('TEMPLATE TESTS', () => {
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


 it('Visit Order Line Templates', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.contains('Configuration').click()
    cy.contains('Order Line Templates').click()
 })

 it('Create Template', () => {
   //cy.setCookie('ORA_WWV_APP_108', app_cookie)
   cy.get('#B29332487170203250').click()

   cy.get('iframe')
    .wait(1000)
    .then($iframe => {
      const iframe = $iframe.contents()
      const myInput0 = iframe.find('#P19_ITEM')
      const myInput1 = iframe.find('#P19_TASKGROUP')
      const myInput2 = iframe.find('#P19_TASKNAME')
      const myInput3 = iframe.find('#P19_DESCRIPTION')
      const myInput4 = iframe.find('#P19_UNIT')
      const myButton = iframe.find('#B29334583745203252')

      cy
        .wrap(myInput0)
        .type('Item1')
        .should('have.value', 'Item1')

      cy
        .wrap(myInput1)
        .type('Group1')
        .should('have.value', 'Group1')

      cy
        .wrap(myInput2)
        .type('Name1')
        .should('have.value', 'Name1')

      cy
        .wrap(myInput3)
        .type('This is a test', { force: true })
        .should('have.value', 'This is a test')

      cy
        .wrap(myInput4)
        .select('1')
        .should('have.value', '1')

      cy.wrap(myButton).click()
    })

    cy.get('.t-Alert-title')  //simply check the modal has been closed
  })


  it('Enable/disable Template', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.get('.apex-item-grid-row > :nth-child(1) > label').click()       //Push Enabled
    cy.get(':nth-child(3) > [headers="LINK"] > a > .fa').click()       //Edit element

    cy.get('iframe')
     .wait(1000)
     .then($iframe => {
       const iframe = $iframe.contents()
       const myButton = iframe.find('#B29334740950203252')

       cy.wrap(myButton).click()                                       //Disable
     })

    cy.get('.t-Alert-title')  //simply check the modal has been closed

    cy.get(':nth-child(2) > label').click()                            //Push Disabled

    cy.url().should('contain', ':18:')
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
       const myButton = iframe.find('#B34897141517025544')

       cy.wrap(myButton).click()                                       //Enable
     })

     cy.get('.t-Alert-title')  //simply check the modal has been closed

     cy.get('.apex-item-grid-row > :nth-child(1) > label').click()      //Push Enabled

     cy.url().should('contain', ':18:')
             .then(($url) => {
                loggedInPage = $url
                loggedInPage = loggedInPage.replace('/__/','/ords/')
                cy.visit(loggedInPage)
            })
  })

})
