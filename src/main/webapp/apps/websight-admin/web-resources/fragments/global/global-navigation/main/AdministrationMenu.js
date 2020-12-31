import React from 'react';
import { MenuGroup, Section } from '@atlaskit/menu';

import WebFragments from 'websight-fragments-esm';

import { errorNotification } from 'websight-rest-atlaskit-client/Notification';

const AdministrationMenu = () => (
    <MenuGroup>
        <Section>
            <WebFragments fragmentsKey='websight.global.global-navigation.administration' errorNotification={errorNotification}/>
        </Section>
    </MenuGroup>
);

export default AdministrationMenu;
