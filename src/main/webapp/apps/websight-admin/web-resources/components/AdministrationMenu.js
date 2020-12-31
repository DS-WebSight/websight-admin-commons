import React from 'react';
import {
    LayoutManager,
    NavigationProvider
} from '@atlaskit/navigation-next';
import styled from 'styled-components';

import { getWebFragments } from 'websight-fragments-esm';
import { errorNotification } from 'websight-rest-atlaskit-client/Notification';

import GlobalNavigation from '../GlobalNavigation.js';
import MenuItem from './MenuItem.js';
import { colors } from '../theme.js';
import Footer from '../Footer.js';

const PageContent = styled.div`
    display: block;
    max-width: 980px;
    margin: 0 auto;
    justify-content: center;
    padding: 70px 0;
    background-color: ${colors.veryLightGrey}
`;

const ButtonsContainer = styled.div`
    display: flex;
`;

const Description = styled.div`
    margin: 24px auto 70px auto;
    text-align: center;
    font-size: 22px;
    width: 650px;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 48px;
`;

export default class AdministrationMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            components: null
        }

        getWebFragments('websight.administration.content-navigation.main', (fragments) => this.setState({ components: fragments }), errorNotification);
    }

    render() {
        const { components } = this.state;

        return <NavigationProvider>
            <LayoutManager
                globalNavigation={GlobalNavigation}
                productNavigation={() => null}
                showContextualNavigation={false}
                experimental_horizontalGlobalNav
            >
                <PageContent>
                    <Title>WebSight.Admin</Title>
                    <Description>Apache Sling toolset brought to you by Dynamic Solutions,<br/>
                    built to perform your daily tasks in efficient way.</Description>
                    <ButtonsContainer>
                        {components && components.map((component, index) => <MenuItem key={index} {...component} />)}
                    </ButtonsContainer>
                </PageContent>
                <Footer />
            </LayoutManager>
        </NavigationProvider>;
    }
}
