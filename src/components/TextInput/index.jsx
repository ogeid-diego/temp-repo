import { Component } from "react";

import './styles.css'

export class TextInput extends Component{
    render(){
        const { inputValue, actionFn } = this.props

        return(
            <input className="text-input" 
                type="search"
                value={inputValue}
                onChange={actionFn}
                placeholder="Buscar" 
            />
        )
    }
}