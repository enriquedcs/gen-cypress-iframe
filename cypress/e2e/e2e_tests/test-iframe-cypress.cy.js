import config from './config.json'
import MainPage from '../../page-objects/components/MainPage'

describe('iFrame Testing Cypress', () => {
    before(function(){
        cy.visit(`${config.URL3}`)
    })
   
    it('Verify iframe working', () =>{
         
        //let's test iframe
        MainPage.iframeInput("#iframe-window",`input[name='s']`)
    })


    it('Verify Nested iframes', () => {

        cy.origin(`${config.URL5}`, () => {
            cy.visit('/nested-iframes-example')
            cy.get("#parent_iframe").then(function($iFrame1){
                const iframe2 = $iFrame1.contents().find('#iframe1')
                cy.wrap(iframe2).as('iframe2Ind')
                cy.get('@iframe2Ind').then(function($iFrame2){
                    const iFrame2Element = $iFrame2.contents().find('body')
                    cy.wrap(iFrame2Element).find(`[onclick='myFunction\(\)']`).click()
                })
            })
        })
    })


    it.skip("Using 'contentDocument' - Nested iFrames", () => {

        cy.origin(`${config.URL4}`, () => {
            cy.visit('/frames.html')
            cy.get("#frame1")
                .its('0.contentDocument')
                .its('body')
                .find('#frame3')
                .its('0.contentDocument')
                .its('body')
                .find('#frame4')
                .its('0.contentDocument')
                .its('body')
                .find("#click_me_4").click()
            //
        })    
    })

})