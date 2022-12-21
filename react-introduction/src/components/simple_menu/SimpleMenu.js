import React from 'react';

class SimpleMenu extends React.Component {
    render() {
        return (
            <menu>
                <li><a href="https://www.google.es">Buscador principal</a></li>
                <li><a href="https://www.search.yahoo.com">Buscador alternativo</a></li>
            </menu>
        );
    }

}

export default SimpleMenu;
