import react from 'react';
import {Menu, MenuMenu} from 'semantic-ui-react';

export default() =>{
    return (
        <Menu style={{marginTop:'10px'}}>
            <Menu.Item>
                Ethevents
            </Menu.Item>

            <Menu.Menu position="right">
            <Menu.Item>
                Events
            </Menu.Item>
            <Menu.Item>
                +
            </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};
