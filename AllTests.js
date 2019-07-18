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


//CUSTOMER_TEST---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


   it('Visit Customers', () => {
     //cy.setCookie('ORA_WWV_APP_108', app_cookie)
     cy.contains('Configuration').click()
     cy.contains('Customers').click()
    })

   it('Create Customer', () => {
     //cy.setCookie('ORA_WWV_APP_108', app_cookie)
     cy.get('#B29235450742203107').click()

     cy.get('iframe')
      .wait(1000)
      .then($iframe => {
        const iframe = $iframe.contents()
        const myInput0 = iframe.find('#P7_NAME')
        const myInput1 = iframe.find('#P7_CIF')
        const myInput2 = iframe.find('#P7_BILLINGADDRESS')
        const myButton = iframe.find('#B29237592569203110')

        cy
          .wrap(myInput0)
          .type('Customer1')
          .should('have.value', 'Customer1')
        cy
          .wrap(myInput1)
          .type('1234')
          .should('have.value', '1234')

        cy
          .wrap(myInput2)
          .select('178')
          .should('have.value', '178')

        cy.wrap(myButton).click()
      })

      cy.get('.t-Alert-title')  //simply check the modal has been closed
    })


    it('Activate/deactivate Customer', () => {
      //cy.setCookie('ORA_WWV_APP_108', app_cookie)
      cy.get('.apex-item-grid-row > :nth-child(1) > label').click()       //Push Active
      cy.get(':nth-child(2) > [headers="LINK"] > a > .fa').click()       //Edit element

      cy.get('iframe')
       .wait(1000)
       .then($iframe => {
         const iframe = $iframe.contents()
         const myButton = iframe.find('#B29237779529203110')

         cy.wrap(myButton).click()                                       //Deactivate
       })

      cy.get('.t-Alert-title')  //simply check the modal has been closed

      cy.get(':nth-child(2) > label').click()                            //Push Inactive

      cy.url().should('contain', ':6:')
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
         const myButton = iframe.find('#B34893775638025510')

         cy.wrap(myButton).click()                                       //Activate
       })

       cy.get('.t-Alert-title')  //simply check the modal has been closed

       cy.get('.apex-item-grid-row > :nth-child(1) > label').click()      //Push Active

       cy.url().should('contain', ':6:')
               .then(($url) => {
                  loggedInPage = $url
                  loggedInPage = loggedInPage.replace('/__/','/ords/')
                  cy.visit(loggedInPage)
              })

    })
})


//CONTACT_TEST---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
context('CONTACT TESTS', () => {

  var   loggedInPage

  beforeEach(function () {
      Cypress.Cookies.preserveOnce('ORA_WWV_APP_108')
  })


    it('Visit Contacts', () => {
      //cy.setCookie('ORA_WWV_APP_108', app_cookie)
      cy.contains('Configuration').click()
      cy.contains('Contacts').click()
    })


    it('Create Contact', () => {
      //cy.setCookie('ORA_WWV_APP_108', app_cookie)
      cy.get('#B29218276591203085').click()

      cy.get('iframe')
       .wait(1000)
       .then($iframe => {
         const iframe = $iframe.contents()
         const myInput0 = iframe.find('#P5_NAME')
         const myInput1 = iframe.find('#P5_LASTNAME')
         const myInput2 = iframe.find('#P5_PHONENUMBER1')
         const myInput3 = iframe.find('#P5_CUSTOMER')
         const myInput4 = iframe.find('#P5_ADDRESS')
         const myButton = iframe.find('#B29220250384203087')

         cy
           .wrap(myInput0)
           .type('Contact1')
           .should('have.value', 'Contact1')
         cy
           .wrap(myInput1)
           .type('Last2')
           .should('have.value', 'Last2')

         cy
           .wrap(myInput2)
           .type('666789')
           .should('have.value', '666789')

         cy
           .wrap(myInput3)
           .select('77')
           .should('have.value', '77')

         cy
           .wrap(myInput4)
           .select('178')
           .should('have.value', '178')

         cy.wrap(myButton).click()
       })

       cy.get('.t-Alert-title')  //simply check the modal has been closed
    })


    it('Activate/deactivate Contact', () => {
       //cy.setCookie('ORA_WWV_APP_108', app_cookie)
       cy.get('.apex-item-grid-row > :nth-child(1) > label').click()       //Push Active
       cy.get(':nth-child(2) > [headers="LINK"] > a > .fa').click()       //Edit element

       cy.get('iframe')
        .wait(1000)
        .then($iframe => {
          const iframe = $iframe.contents()
          const myButton = iframe.find('#B29220416985203087')

          cy.wrap(myButton).click()                                       //Deactivate
        })

       cy.get('.t-Alert-title')  //simply check the modal has been closed

       cy.get(':nth-child(2) > label').click()                            //Push Inactive

       cy.url().should('contain', ':4:')
               .then(($url) => {
                  loggedInPage = $url
                  loggedInPage = loggedInPage.replace('/__/','/ords/')
                  cy.visit(loggedInPage)
              })

       cy.get(':nth-child(3) > [headers="LINK"] > a > .fa').click()        //Edit element

       cy.get('iframe')
        .wait(1000)
        .then($iframe => {
          const iframe = $iframe.contents()
          const myButton = iframe.find('#B34894322015025516')

          cy.wrap(myButton).click()                                       //Activate
        })

        cy.get('.t-Alert-title')  //simply check the modal has been closed

        cy.get('.apex-item-grid-row > :nth-child(1) > label').click()      //Push Active

        cy.url().should('contain', ':4:')
                .then(($url) => {
                   loggedInPage = $url
                   loggedInPage = loggedInPage.replace('/__/','/ords/')
                   cy.visit(loggedInPage)
               })

    })
})


//ROLE_TEST--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
context('ROLE TESTS', () => {

  var   loggedInPage

  beforeEach(function () {
      Cypress.Cookies.preserveOnce('ORA_WWV_APP_108')
  })


    it('Visit Roles', () => {
       //cy.setCookie('ORA_WWV_APP_108', app_cookie)
       cy.contains('Configuration').click()
       cy.contains('Roles').click()
    })

    it('Create Role', () => {
      //cy.setCookie('ORA_WWV_APP_108', app_cookie)
      cy.get('#B29250334980203142').click()

      cy.get('iframe')
       .wait(1000)
       .then($iframe => {
         const iframe = $iframe.contents()
         const myInput0 = iframe.find('#P9_NAME')
         const myInput1 = iframe.find('#P9_ISADMIN')
         const myInput2 = iframe.find('#P9_ISMANAGER')
         const myButton = iframe.find('#B29252400802203144')

         cy
           .wrap(myInput0)
           .type('Role1')
           .should('have.value', 'Role1')

         cy
           .wrap(myInput1)
           .select('N')
           .should('have.value', 'N')

         cy
           .wrap(myInput2)
           .select('N')
           .should('have.value', 'N')

         cy.wrap(myButton).click()
       })

       cy.get('.t-Alert-title')  //simply check the modal has been closed
     })


     it('Activate/deactivate Role', () => {
       //cy.setCookie('ORA_WWV_APP_108', app_cookie)
       cy.get('.apex-item-grid-row > :nth-child(1) > label').click()       //Push Active
       cy.get(':nth-child(2) > [headers="LINK"] > a > .fa').click()       //Edit element

       cy.get('iframe')
        .wait(1000)
        .then($iframe => {
          const iframe = $iframe.contents()
          const myButton = iframe.find('#B29252605141203144')

          cy.wrap(myButton).click()                                       //Deactivate
        })

       cy.get('.t-Alert-title')  //simply check the modal has been closed

       cy.get(':nth-child(2) > label').click()                            //Push Inactive

       cy.url().should('contain', ':8:')
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
          const myButton = iframe.find('#B34896680933025539')

          cy.wrap(myButton).click()                                       //Activate
        })

        cy.get('.t-Alert-title')  //simply check the modal has been closed

        cy.get('.apex-item-grid-row > :nth-child(1) > label').click()      //Push Active

        cy.url().should('contain', ':8:')
                .then(($url) => {
                   loggedInPage = $url
                   loggedInPage = loggedInPage.replace('/__/','/ords/')
                   cy.visit(loggedInPage)
               })
     })
})


//TEMPLATE_TEST--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
context('TEMPLATE TESTS', () => {

  var   loggedInPage

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


//TEAM_TEST--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
context('TEAM TESTS', () => {

  var   loggedInPage

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


//PROJECT_TEST--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
context('PROJECT NAVIGATION TESTS', () => {

  var   loggedInPage

  beforeEach(function () {
      Cypress.Cookies.preserveOnce('ORA_WWV_APP_108')
  })


    it('Visit Projects', () => {
       //cy.setCookie('ORA_WWV_APP_108', app_cookie)
       cy.contains('Configuration').click()
       cy.contains('Projects').click()
    })

    it('Create Project', () => {
      //cy.setCookie('ORA_WWV_APP_108', app_cookie)
      cy.get('#B29368102051203299').click()

      cy.get('iframe')
       .wait(2000)
       .then($iframe => {
         const iframe = $iframe.contents()
         const myInput0 = iframe.find('#P46_PREVIOUSCUSTOMER')
         const myButton = iframe.find('#B32331518099676987')

         cy
           .wrap(myInput0)
           .select('53', {force: true})
           .should('have.value', '53')

         cy.wrap(myButton).click()

        })

        cy.get('iframe')
          .wait(2000)
          .then($iframe => {
            const iframe = $iframe.contents()
            const myInput0 = iframe.find('#P47_NAME')
            const myInput1 = iframe.find('#P47_PROJECTNUMBER')
            const myInput2 = iframe.find('#P47_DESCRIPTION')
            const myInput3 = iframe.find('#P47_STARTDATE')
            const myInput4 = iframe.find('#P47_ENDDATE')
            const myButton = iframe.find('#B32338633683676992')

            cy
              .wrap(myInput0)
              .type('Project', {force: true})
              .should('have.value', 'Project')

            cy
              .wrap(myInput1)
              .type('1', {force: true})
              .should('have.value', '1')

            cy
             .wrap(myInput2)
             .type('This is a test', { force: true })
             .should('have.value', 'This is a test')

            cy
             .wrap(myInput3)
             .type('01-Jul-19', {force: true})
             .should('have.value', '01-Jul-19')

            cy
             .wrap(myInput4)
             .type('30-Sep-19', {force: true})
             .should('have.value', '30-Sep-19')

            cy.wrap(myButton).click()

            })

            cy.get('iframe')
             .wait(2000)
             .then($iframe => {
               const iframe = $iframe.contents()
               const myButton = iframe.find('#B32343922860676995')

               cy.wrap(myButton).click()

            })

            cy.get('.t-Alert-title')  //simply check the modal has been closed

      })

      it('Create Order inside Project', () => {
        //cy.setCookie('ORA_WWV_APP_108', app_cookie)
        const Order = Math.random().toString(36).substring(2, 8)

        cy.get('#B31960122872238115').click()

        cy.get('iframe')
         .wait(2000)
         .then($iframe => {
           const iframe = $iframe.contents()
           const myInput0 = iframe.find('#P60_PREVIOUSCONTACT')
           const myButton = iframe.find('#B32713429350066123')

           cy
             .wrap(myInput0)
             .select('56', {force: true})
             .should('have.value', '56')

           cy.wrap(myButton).click()

          })

          cy.get('iframe')
            .wait(2000)
            .then($iframe => {
              const iframe = $iframe.contents()
              const myInput0 = iframe.find('#P62_ORDERNUMBER')
              const myInput1 = iframe.find('#P62_STARTDATE')
              const myInput2 = iframe.find('#P62_DELIVERYDATE')
              const myButton = iframe.find('#B32723715648066129')

              cy
                .wrap(myInput0)
                .type(Order, {force: true})
                .should('have.value', Order)

              cy
               .wrap(myInput1)
               .type('01-Jul-19', {force: true})
               .should('have.value', '01-Jul-19')

              cy
               .wrap(myInput2)
               .type('30-Sep-19', {force: true})
               .should('have.value', '30-Sep-19')

              cy.wrap(myButton).click()

              })

              cy.get('iframe')
               .wait(2000)
               .then($iframe => {
                 const iframe = $iframe.contents()
                 const myButton = iframe.find('#B32729038425066133')

                 cy.wrap(myButton).click()

              })

              cy.get('.t-Alert-title')  //simply check the modal has been closed

        })

        it('Create Order Line inside Project', () => {
          //cy.setCookie('ORA_WWV_APP_108', app_cookie)
          const Quantity = Math.floor(Math.random()*100)
          const UnitPrice = Math.floor(Math.random()*1000)

          cy.get('#B32076287681864020').click()

          cy.get('iframe')
           .wait(2000)
           .then($iframe => {
             const iframe = $iframe.contents()
             const myInput0 = iframe.find('#P17_TEMPLATE')
             const myInput1 = iframe.find('#P17_QUANTITY')
             const myInput2 = iframe.find('#P17_UNITPRICE')
             const myButton = iframe.find('#B29316074552203227')

             cy
               .wrap(myInput0)
               .select('19')
               .should('have.value', '19')

             cy
               .wrap(myInput1)
               .type('100')
               .should('have.value', '100')

             cy
               .wrap(myInput2)
               .type('1000')
               .should('have.value', '1000')

             cy.wrap(myButton).click()

            })

          })

})



//ORDER_TEST--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
context('ORDER TESTS', () => {

  var   loggedInPage
  //const Order = Math.floor(Math.random()*10000)
  const Order = Math.random().toString(36).substring(2, 8)

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
