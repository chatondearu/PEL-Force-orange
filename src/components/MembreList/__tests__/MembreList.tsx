/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import MembreList from "../index"

describe("<MembreList />", () => {
    it("renders", () => {
        const tree = render(
            <MemoryRouter>
                <MembreList
                    items={[
                        {
                            id: 1,
                            nom: "Aupeix",
                            prenom: "Amélie",
                            mail: "pakouille.lakouille@yahoo.fr",
                            telephone: "0675650392",
                            photo: "images/membres/$taille/amélie_aupeix.jpg",
                            alimentation: "Végétarien",
                            majeur: 1,
                            privilege: 0,
                            actif: 0,
                            commentaire: "",
                            horodatage: "0000-00-00",
                            passe: "$2y$10$fSxY9AIuxSiEjwF.J3eXGubIxUPlobkyRrNIal8ASimSjNj4SR.9O",
                        },
                    ]}
                />
            </MemoryRouter>
        ).container.firstChild

        expect(tree).toMatchSnapshot()
    })
})
