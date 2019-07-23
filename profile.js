context('PROFILE TESTS', () => {
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


 it('Visit Profile', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.get('#L29735526882203814').click()
    cy.get('#menu_L29735526882203814_1i').click()
 })

 it('Rename profile', () => {
   //cy.setCookie('ORA_WWV_APP_108', app_cookie)

   cy.get('iframe')
    .wait(1000)
    .then($iframe => {
      const iframe = $iframe.contents()
      const myInput0 = iframe.find('#P30_NAME')
      const myInput1 = iframe.find('#P30_LASTNAME')
      const myButton = iframe.find('#B29919666410064411')

      cy
        .wrap(myInput0)
        .clear()
        .type('test')
        .should('have.value', 'test')

      cy
        .wrap(myInput1)
        .clear()
        .type('TEST')
        .should('have.value', 'TEST')


      cy.wrap(myButton).click()

     })

   })

   it('Reset name', () => {
     //cy.setCookie('ORA_WWV_APP_108', app_cookie)

     cy.get('#L29735526882203814').click()
     cy.get('#menu_L29735526882203814_1i').click()

     cy.get('iframe')
      .wait(1000)
      .then($iframe => {
        const iframe = $iframe.contents()
        const myInput0 = iframe.find('#P30_NAME')
        const myInput1 = iframe.find('#P30_LASTNAME')
        const myButton = iframe.find('#B29919666410064411')

        cy
          .wrap(myInput0)
          .clear()
          .type('Denis')
          .should('have.value', 'Denis')

        cy
          .wrap(myInput1)
          .clear()
          .type('Vargas')
          .should('have.value', 'Vargas')


        cy.wrap(myButton).click()

       })

     })

     it('Change password', () => {
       //cy.setCookie('ORA_WWV_APP_108', app_cookie)

       cy.get('#L29735526882203814').click()
       cy.get('#menu_L29735526882203814_1i').click()

       cy.get('iframe')
        .wait(1000)
        .then($iframe => {
          const iframe = $iframe.contents()
          const myButton = iframe.find('#B32518001784392139')


          cy.wrap(myButton).click()

         })

         cy.get('iframe')
          .wait(1000)
          .then($iframe => {
            const iframe = $iframe.contents()
            const myInput0 = iframe.find('#P29_CURRPASS')
            const myInput1 = iframe.find('#P29_NEWPASS')
            const myInput2 = iframe.find('#P29_REPPASS')
            const myButton = iframe.find('#B33169701685173911')


            //Current password wrong
            cy
              .wrap(myInput0)
              .type('WRONG')
              .should('have.value', 'WRONG')

            cy
              .wrap(myInput1)
              .type('5678')
              .should('have.value', '5678')

            cy
              .wrap(myInput2)
              .type('5678')
              .should('have.value', '5678')


            cy.wrap(myButton).click()
            cy.wait(5000)

            //New password don't match
            cy
              .wrap(myInput0)
              .clear()
              .type('1234')
              .should('have.value', '1234')

            cy
              .wrap(myInput1)
              .clear()
              .type('WRONG')
              .should('have.value', 'WRONG')

            cy
              .wrap(myInput2)
              .clear()
              .type('5678')
              .should('have.value', '5678')

            cy.wrap(myButton).click()
            cy.wait(5000)

            //Password change success
            cy
              .wrap(myInput1)
              .clear()
              .type('5678')
              .should('have.value', '5678')

            cy.wrap(myButton).click()
            cy.wait(5000)

           })

       })

       it('Reset password', () => {
         //cy.setCookie('ORA_WWV_APP_108', app_cookie)

         cy.get('iframe')
          .wait(1000)
          .then($iframe => {
            const iframe = $iframe.contents()
            const myButton = iframe.find('#B32518001784392139')


            cy.wrap(myButton).click()

           })

           cy.get('iframe')
            .wait(1000)
            .then($iframe => {
              const iframe = $iframe.contents()
              const myInput0 = iframe.find('#P29_CURRPASS')
              const myInput1 = iframe.find('#P29_NEWPASS')
              const myInput2 = iframe.find('#P29_REPPASS')
              const myButton = iframe.find('#B33169701685173911')

              cy
                .wrap(myInput0)
                .type('5678')
                .should('have.value', '5678')

              cy
                .wrap(myInput1)
                .type('1234')
                .should('have.value', '1234')

              cy
                .wrap(myInput2)
                .type('1234')
                .should('have.value', '1234')

              cy.wrap(myButton).click()

             })

         })

})
