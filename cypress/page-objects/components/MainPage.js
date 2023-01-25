export default class MainPage {

    static iframeInput(iframe_el,ele1){
        cy.get(iframe_el, { timeout: 20000})
            .should('be.visible')
            .should('not.be.empty')
            .then(($iframe) => {
                const $body = $iframe.contents().find('body')
        //
        cy.wrap($body)
            .find(ele1)
            .type('Cypress{enter}')
        })
    }

}