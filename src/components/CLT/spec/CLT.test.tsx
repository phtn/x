import { fireEvent, render, screen } from '@testing-library/react'
import CLT from '../CLT'

it('should render component with correct title', () => {
    render(<CLT setComp={()=> {}}  screen={{width: 0, height: 0}}/>)
    const headingElement = screen.getByRole("heading", {name: "Central Limit Theorem"})
    expect(headingElement).toBeInTheDocument()
})
it('testid', ()=> {
    render(<CLT setComp={()=> {}}  screen={{width: 0, height: 0}}/>)
    const header = screen.getByTestId("clt screen={{width: 0, height: 0}}-main-container")
    expect(header).toBeInTheDocument()
})
it('should be able to type in text-area', ()=> {
    render(<CLT setComp={()=> {}}  screen={{width: 0, height: 0}}/>)
    const textArea = screen.getByTestId("text-area")
    fireEvent.change(textArea, {target: {value: "test"}})
    // expect(typeof(textArea) == ).toBe("test")
    // console.log(typeof(textArea))
})
