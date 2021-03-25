import React from 'react';
import { AtlassianNavigation, ProductHome, generateTheme } from '@atlaskit/atlassian-navigation';

import WebFragments from 'websight-fragments-esm';
import { errorNotification } from 'websight-rest-atlaskit-client/Notification';

import Logo from './Logo.js';
import { colors } from './theme.js';
import NavigationItemsController from './components/navigation/NavigationItemsController.js';

const theme = generateTheme({
    name: 'high-contrast',
    backgroundColor: colors.darkBlue,
    highlightColor: colors.white // color of outline when using keyboard to navigate
});

const ProfileFragment = () => (
    <WebFragments fragmentsKey='websight.administration.global-navigation.profile' errorNotification={errorNotification} />
);

export default class GlobalNavigation extends React.Component {
    render() {
        return (
            <AtlassianNavigation
                theme={theme}
                primaryItems={<NavigationItemsController />}
                renderProductHome={() => <ProductHome icon={Logo} logo={Logo} href='/'/>}
                renderProfile={ProfileFragment}
            />
        )
    }
}